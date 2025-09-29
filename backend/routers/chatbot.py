"""
AyurvedaBot API Router - AI-powered Ayurvedic chatbot integration
Uses Google Gemini AI with comprehensive Ayurvedic knowledge base
"""
import json
import os
import re
import math
from collections import Counter
from typing import List, Dict, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types

# Initialize Gemini client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

# Create router
router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"]
)

# Request/Response models
class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[Dict[str, str]]] = []

class ChatResponse(BaseModel):
    response: str
    sources: List[str] = []
    formatted_html: Optional[str] = None

# Comprehensive Ayurvedic Knowledge Base
AYURVEDIC_KNOWLEDGE = [
    {
        "id": "vata-dosha-1",
        "content": "Vata dosha governs movement in the body, including blood circulation, breathing, blinking, and heartbeat. It is composed of air and space elements. Characteristics include dryness, coldness, lightness, roughness, and irregularity. When balanced, Vata promotes creativity, flexibility, and vitality. Imbalance often manifests as anxiety, insomnia, dry skin, constipation, joint pain, and irregular digestion. Balancing Vata involves warmth, routine, grounding activities, oil massages, and nourishing foods like cooked grains, warm milk, and ghee.",
        "metadata": {
            "source": "Classical Ayurveda",
            "category": "Doshas",
            "keywords": ["vata", "movement", "air", "space", "anxiety", "dryness"]
        }
    },
    {
        "id": "pitta-dosha-1", 
        "content": "Pitta dosha controls digestion, metabolism, and energy production. It is composed of fire and water elements. Its qualities are hot, sharp, light, oily, and penetrating. Pitta individuals often have strong digestion, good intellect, and natural leadership qualities but can be prone to anger, criticism, and perfectionism when imbalanced. Physical symptoms of Pitta imbalance include inflammation, heartburn, acid reflux, skin rashes, excessive sweating, and loose stools. Cooling foods, moderation, avoiding excess heat and spicy foods help balance Pitta.",
        "metadata": {
            "source": "Classical Ayurveda",
            "category": "Doshas", 
            "keywords": ["pitta", "fire", "digestion", "metabolism", "anger", "heat"]
        }
    },
    {
        "id": "kapha-dosha-1",
        "content": "Kapha dosha provides structure, lubrication, and stability to the body. It is composed of earth and water elements. It is characterized by heaviness, coldness, slowness, oiliness, and stability. Balanced Kapha brings strength, immunity, calmness, and compassion. Imbalanced Kapha can lead to lethargy, weight gain, congestion, excessive sleep, attachment, and depression. Stimulation, regular exercise, warmth, light and spicy foods, and avoiding overeating are key to balancing Kapha dosha.",
        "metadata": {
            "source": "Classical Ayurveda",
            "category": "Doshas",
            "keywords": ["kapha", "earth", "water", "structure", "lethargy", "weight"]
        }
    },
    {
        "id": "abhyanga-treatment-1",
        "content": "Abhyanga is a traditional Ayurvedic oil massage therapy involving warm, medicated oils applied to the entire body in specific rhythmic strokes. This treatment nourishes the skin, improves circulation, calms the nervous system, and helps eliminate toxins. Benefits include stress reduction, improved sleep, joint flexibility, and enhanced immunity. Pre-treatment preparation involves light meals and proper hydration. Post-treatment care includes rest, warm bath, and avoiding cold environments.",
        "metadata": {
            "source": "Panchakarma Texts",
            "category": "Treatments",
            "keywords": ["abhyanga", "massage", "oil", "circulation", "relaxation"]
        }
    },
    {
        "id": "panchakarma-1",
        "content": "Panchakarma is Ayurveda's premier detoxification and rejuvenation therapy consisting of five main procedures: Vamana (therapeutic vomiting), Virechana (purgation), Basti (medicated enemas), Nasya (nasal administration), and Raktamokshana (bloodletting). These treatments systematically eliminate accumulated toxins (ama) and restore doshic balance. The therapy includes three phases: Purva Karma (preparation), Pradhan Karma (main treatment), and Paschat Karma (post-treatment care).",
        "metadata": {
            "source": "Classical Panchakarma",
            "category": "Treatments", 
            "keywords": ["panchakarma", "detox", "purification", "toxins", "cleansing"]
        }
    },
    {
        "id": "ayurvedic-diet-1",
        "content": "Ayurvedic nutrition emphasizes eating according to your dosha, season, and digestive fire (agni). Six tastes (sweet, sour, salty, pungent, bitter, astringent) should be included in each meal for balance. Eat your largest meal at midday when digestive fire is strongest. Foods should be fresh, warm, and properly combined. Avoid incompatible food combinations like milk with citrus, honey when heated, or fruits with meals. Mindful eating in a peaceful environment enhances digestion and absorption.",
        "metadata": {
            "source": "Ayurvedic Nutrition",
            "category": "Diet",
            "keywords": ["diet", "nutrition", "agni", "digestion", "tastes", "food"]
        }
    }
]

def create_word_vector(text: str, vocabulary: set) -> List[float]:
    """Create a simple word frequency vector for semantic similarity"""
    words = re.findall(r'\b\w+\b', text.lower())
    word_count = Counter(words)
    vector = []
    
    for word in sorted(vocabulary):
        vector.append(word_count.get(word, 0))
    
    return vector

def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """Calculate cosine similarity between two vectors"""
    if not vec1 or not vec2:
        return 0.0
    
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    magnitude1 = math.sqrt(sum(a * a for a in vec1))
    magnitude2 = math.sqrt(sum(a * a for a in vec2))
    
    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0
    
    return dot_product / (magnitude1 * magnitude2)

def find_relevant_knowledge(query: str, top_k: int = 3) -> List[Dict]:
    """Find most relevant knowledge base entries for the query"""
    # Build vocabulary from all knowledge entries
    vocabulary = set()
    for entry in AYURVEDIC_KNOWLEDGE:
        words = re.findall(r'\b\w+\b', entry["content"].lower())
        vocabulary.update(words)
        vocabulary.update(entry["metadata"]["keywords"])
    
    # Create query vector
    query_vector = create_word_vector(query, vocabulary)
    
    # Calculate similarities
    similarities = []
    for entry in AYURVEDIC_KNOWLEDGE:
        entry_text = entry["content"] + " " + " ".join(entry["metadata"]["keywords"])
        entry_vector = create_word_vector(entry_text, vocabulary)
        similarity = cosine_similarity(query_vector, entry_vector)
        similarities.append((similarity, entry))
    
    # Sort by similarity and return top results
    similarities.sort(key=lambda x: x[0], reverse=True)
    return [entry for _, entry in similarities[:top_k] if _ > 0.1]

def generate_ai_response(query: str, relevant_knowledge: List[Dict], conversation_history: List[Dict[str, str]]) -> str:
    """Generate AI response using Gemini with relevant knowledge context"""
    
    # Prepare context from relevant knowledge
    context = ""
    if relevant_knowledge:
        context = "Relevant Ayurvedic Knowledge:\n"
        for i, entry in enumerate(relevant_knowledge, 1):
            context += f"{i}. {entry['content']}\n\n"
    
    # Prepare conversation history
    history_text = ""
    if conversation_history:
        history_text = "Previous conversation:\n"
        for msg in conversation_history[-4:]:  # Last 4 messages for context
            role = msg.get("role", "user")
            content = msg.get("content", "")
            history_text += f"{role}: {content}\n"
        history_text += "\n"
    
    # Comprehensive system prompt
    system_prompt = """You are AyurBot, an expert Ayurvedic wellness assistant for the AyurSutra Panchakarma Patient Management System. You provide authentic, helpful guidance based on classical Ayurvedic principles.

CORE PRINCIPLES:
- Always ground responses in traditional Ayurvedic wisdom
- Focus on the three doshas (Vata, Pitta, Kapha) and their balance
- Emphasize prevention, natural healing, and holistic wellness
- Be warm, compassionate, and supportive in your communication
- Use appropriate Sanskrit terms when relevant, with explanations

RESPONSE GUIDELINES:
- Provide practical, actionable advice
- Include relevant dosha considerations when applicable  
- Suggest lifestyle modifications, dietary guidance, or treatment recommendations
- Always remind users to consult their practitioner for personalized care
- Use emojis sparingly and appropriately (🌿 🧘 ☀️ 🌙 etc.)

SAFETY:
- Never diagnose medical conditions
- Always recommend consulting healthcare practitioners for serious concerns
- Clarify that your guidance is educational, not medical advice
- Be clear about limitations of general advice vs. personalized treatment

Use the provided Ayurvedic knowledge and conversation history to give contextually relevant, authentic responses."""

    # Construct the full prompt
    full_prompt = f"{system_prompt}\n\n{context}{history_text}User question: {query}\n\nPlease provide a helpful, authentic Ayurvedic response:"

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt
        )
        
        return response.text or "I apologize, but I'm having trouble processing your question right now. Please try rephrasing or ask about a specific Ayurvedic topic."
        
    except Exception as e:
        return f"I'm experiencing some technical difficulties. Please try again or contact support if the issue persists. (Error: {str(e)})"

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ayurbot(request: ChatRequest):
    """
    Chat with AyurBot - AI-powered Ayurvedic wellness assistant
    """
    try:
        # Check if API key is available
        if not os.environ.get("GEMINI_API_KEY"):
            raise HTTPException(
                status_code=503, 
                detail="AI service temporarily unavailable. Please contact support."
            )
        
        # Find relevant knowledge for the query
        relevant_knowledge = find_relevant_knowledge(request.message)
        
        # Generate AI response
        ai_response = generate_ai_response(
            request.message, 
            relevant_knowledge, 
            request.conversation_history
        )
        
        # Extract sources
        sources = [entry["metadata"]["source"] for entry in relevant_knowledge]
        
        return ChatResponse(
            response=ai_response,
            sources=list(set(sources)),  # Remove duplicates
            formatted_html=None  # Could add HTML formatting later if needed
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")

@router.get("/health")
async def chatbot_health():
    """Check chatbot service health"""
    return {
        "status": "healthy",
        "knowledge_base_entries": len(AYURVEDIC_KNOWLEDGE),
        "api_key_configured": bool(os.environ.get("GEMINI_API_KEY"))
    }