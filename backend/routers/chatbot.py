"""
AyurvedaBot API Router - AI-powered Ayurvedic chatbot integration
Uses Google Gemini AI with comprehensive Ayurvedic knowledge base
"""
import json
import os
import re
import math
import datetime
from collections import Counter
from typing import List, Dict, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types

# Initialize Gemini client - will be set up when needed
client = None

def get_gemini_client():
    """Get or initialize Gemini client"""
    global client
    if client is None:
        api_key = os.environ.get("GOOGLE_API_KEY")
        if not api_key:
            raise HTTPException(
                status_code=503, 
                detail="AI service temporarily unavailable. API key not configured."
            )
        client = genai.Client(api_key=api_key)
    return client

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
    plain_text: Optional[str] = None


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
        "content": "Abhyanga, or self-massage with warm oil, is highly recommended for Vata imbalance. It pacifies dryness, improves circulation, calms the nervous system, and promotes better sleep. Sesame oil is traditionally used for Vata, coconut oil for Pitta, and mustard or sunflower oil for Kapha. The massage should be performed before bathing, using long strokes on limbs and circular motions on joints. Swedana (steam therapy) often follows Abhyanga to help the oil penetrate deeper into tissues.",
        "metadata": {
            "source": "Panchakarma Treatments",
            "category": "Treatments",
            "keywords": ["abhyanga", "massage", "oil", "vata", "circulation"]
        }
    },
    {
        "id": "triphala-herbs-1",
        "content": "Triphala is a classical Ayurvedic formula consisting of three fruits: Amalaki (Emblica officinalis), Bibhitaki (Terminalia bellirica), and Haritaki (Terminalia chebula). It is considered a rasayana (rejuvenative) and is excellent for detoxification, digestion, and overall health. Triphala balances all three doshas, supports healthy elimination, improves digestion, and acts as a gentle laxative. It is rich in vitamin C and antioxidants. Typically taken as powder with warm water before sleep or as tablets.",
        "metadata": {
            "source": "Herbal Medicine",
            "category": "Herbs",
            "keywords": ["triphala", "amalaki", "bibhitaki", "haritaki", "digestion", "detox"]
        }
    },
    {
        "id": "pranayama-breathing-1",
        "content": "Pranayama, or breathing exercises, are fundamental in Ayurveda for balancing doshas and promoting health. Nadi Shodhana (alternate nostril breathing) balances Vata and calms the mind. Bhastrika (bellows breath) increases Pitta and generates heat. Ujjayi breath (victorious breath) is cooling and balances Pitta. Kapalbhati (skull shining breath) reduces Kapha and energizes the body. Regular pranayama practice improves lung capacity, reduces stress, and enhances overall vitality.",
        "metadata": {
            "source": "Yoga and Ayurveda",
            "category": "Practices",
            "keywords": ["pranayama", "breathing", "nadi shodhana", "ujjayi", "kapalbhati"]
        }
    },
    {
        "id": "ayurvedic-diet-1",
        "content": "Ayurvedic diet principles emphasize eating according to your constitution (prakriti) and current imbalance (vikriti). Six tastes should be included in each meal: sweet, sour, salty, pungent, bitter, and astringent. Vata benefits from warm, moist, grounding foods. Pitta requires cooling, moderate foods avoiding excess spice. Kapha needs light, warm, spicy foods to stimulate digestion. Eating mindfully, chewing thoroughly, and avoiding incompatible food combinations (viruddha ahara) are essential principles.",
        "metadata": {
            "source": "Ayurvedic Nutrition",
            "category": "Diet",
            "keywords": ["diet", "six tastes", "prakriti", "vikriti", "food combinations"]
        }
    },
    {
        "id": "meditation-ayurveda-1",
        "content": "Meditation in Ayurveda is considered essential for mental health and spiritual development. Different types suit different constitutions: Vata benefits from guided meditations and mantra repetition for grounding. Pitta responds well to cooling visualizations and moderate practices. Kapha needs more active forms like walking meditation or energizing techniques. Regular meditation balances the mind, reduces stress, improves concentration, and supports overall well-being according to Ayurvedic principles.",
        "metadata": {
            "source": "Mental Health",
            "category": "Practices",
            "keywords": ["meditation", "mental health", "mantra", "visualization", "stress"]
        }
    },
    {
        "id": "seasonal-routine-1",
        "content": "Ritucharya (seasonal routine) is fundamental in Ayurveda for maintaining health throughout the year. Spring requires detoxification to reduce accumulated Kapha. Summer needs cooling practices to balance Pitta. Monsoon season requires digestive support and Vata pacification. Autumn focuses on nourishing and grounding to prepare for winter. Winter emphasizes building strength and immunity. Adjusting diet, lifestyle, and practices according to seasons prevents disease and promotes longevity.",
        "metadata": {
            "source": "Seasonal Living",
            "category": "Lifestyle",
            "keywords": ["ritucharya", "seasons", "detox", "immunity", "longevity"]
        }
    },
    {
        "id": "ayurvedic-pulse-1",
        "content": "Nadi Pariksha (pulse diagnosis) is a sophisticated diagnostic method in Ayurveda. The pulse is felt at the radial artery using three fingers representing Vata, Pitta, and Kapha. Vata pulse feels like a snake's movement - thin, fast, and irregular. Pitta pulse resembles a frog's jump - moderate speed with strong, regular beats. Kapha pulse moves like a swan - slow, deep, and steady. Experienced practitioners can determine constitution, current imbalances, and disease tendencies through pulse diagnosis.",
        "metadata": {
            "source": "Diagnosis",
            "category": "Assessment",
            "keywords": ["nadi pariksha", "pulse", "diagnosis", "vata pulse", "pitta pulse", "kapha pulse"]
        }
    }
]

def format_ayurvedic_response_html(response_text: str, user_query: str, sources: Optional[List[Dict]] = None) -> str:
    """
    Format Gemini's Ayurvedic response in beautiful HTML with emojis and professional styling
    """
    try:
        current_date = datetime.date.today().strftime("%B %d, %Y")
    except Exception:
        current_date = "N/A"
    
    def escape_html(text: str) -> str:
        """Escape HTML characters to prevent XSS"""
        return (text.replace('&', '&amp;')
                    .replace('<', '&lt;')
                    .replace('>', '&gt;')
                    .replace('"', '&quot;')
                    .replace("'", '&#x27;'))
    
    # Sanitize inputs to prevent XSS
    safe_response_text = escape_html(response_text.strip())
    safe_user_query = escape_html(user_query.strip())
    
    # Split response into paragraphs for better formatting
    paragraphs = [p.strip() for p in safe_response_text.split('\n') if p.strip()]
    
    # Categorize content based on keywords
    dietary_keywords = ['diet', 'food', 'eat', 'nutrition', 'taste', 'cooking', 'meal']
    herbal_keywords = ['herb', 'plant', 'medicine', 'remedy', 'treatment', 'formulation']
    lifestyle_keywords = ['lifestyle', 'routine', 'sleep', 'exercise', 'meditation', 'yoga']
    dosha_keywords = ['vata', 'pitta', 'kapha', 'dosha', 'constitution']
    
    # Organize content into sections
    main_content = []
    dietary_advice = []
    herbal_suggestions = []
    lifestyle_tips = []
    dosha_insights = []
    
    for para in paragraphs:
        para_lower = para.lower()
        if any(keyword in para_lower for keyword in dietary_keywords):
            dietary_advice.append(para)
        elif any(keyword in para_lower for keyword in herbal_keywords):
            herbal_suggestions.append(para)
        elif any(keyword in para_lower for keyword in lifestyle_keywords):
            lifestyle_tips.append(para)
        elif any(keyword in para_lower for keyword in dosha_keywords):
            dosha_insights.append(para)
        else:
            main_content.append(para)
    
    # If no categorization worked, put everything in main content
    if not any([dietary_advice, herbal_suggestions, lifestyle_tips, dosha_insights]):
        main_content = paragraphs
    
    # Start building HTML with escaped content
    html = f"""
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 10px auto; padding: 25px; border: 1px solid #ccc; border-radius: 10px; background-color: #fdfdfd; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
        <h2 style="color: #3a5a40; border-bottom: 2px solid #588157; padding-bottom: 10px; text-align: center; margin-bottom: 25px;">🌿 Ayurvedic Guidance 🌿</h2>
        
        <!-- Main Response Section -->
        <div style="margin-bottom: 25px; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-left: 5px solid #588157;">
            <h3 style="color: #4a6b51; margin-top: 0; margin-bottom: 15px;">💡 Your Question: {safe_user_query}</h3>
    """
    
    if main_content:
        html += "<div style='margin-bottom: 15px;'>"
        for para in main_content:
            html += f"<p style='margin-bottom: 10px; line-height: 1.6;'>{para}</p>"
        html += "</div>"
    
    html += "</div>"
    
    # Dosha Insights Section
    if dosha_insights:
        html += """
        <div style="margin-bottom: 25px; background-color: #e8f5e9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-left: 5px solid #a5d6a7;">
            <h3 style="color: #2e7d32; margin-top: 0; margin-bottom: 15px;">⚖️ Dosha Insights</h3>
        """
        for insight in dosha_insights:
            html += f"<p style='margin-bottom: 10px; line-height: 1.6;'><span style='color: #2e7d32;'>🔸</span> {insight}</p>"
        html += "</div>"
    
    # Dietary Advice Section
    if dietary_advice:
        html += """
        <div style="margin-bottom: 25px; background-color: #fff3e0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-left: 5px solid #ffb74d;">
            <h3 style="color: #f57c00; margin-top: 0; margin-bottom: 15px;">🍴 Dietary Recommendations</h3>
        """
        for advice in dietary_advice:
            html += f"<p style='margin-bottom: 10px; line-height: 1.6;'><span style='color: #f57c00;'>🥗</span> {advice}</p>"
        html += "</div>"
    
    # Herbal Suggestions Section
    if herbal_suggestions:
        html += """
        <div style="margin-bottom: 25px; background-color: #f1f8e9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-left: 5px solid #8bc34a;">
            <h3 style="color: #4caf50; margin-top: 0; margin-bottom: 15px;">🌿 Herbal Recommendations</h3>
        """
        for herb in herbal_suggestions:
            html += f"<p style='margin-bottom: 10px; line-height: 1.6;'><span style='color: #4caf50;'>🌱</span> {herb}</p>"
        html += "</div>"
    
    # Lifestyle Tips Section
    if lifestyle_tips:
        html += """
        <div style="margin-bottom: 25px; background-color: #fce4ec; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-left: 5px solid #e91e63;">
            <h3 style="color: #c2185b; margin-top: 0; margin-bottom: 15px;">❤️ Lifestyle Guidance</h3>
        """
        for tip in lifestyle_tips:
            html += f"<p style='margin-bottom: 10px; line-height: 1.6;'><span style='color: #c2185b;'>🚶</span> {tip}</p>"
        html += "</div>"
    
    # Sources Section
    if sources:
        html += """
        <div style="margin-bottom: 25px; background-color: #f3e5f5; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-left: 5px solid #9c27b0;">
            <h3 style="color: #7b1fa2; margin-top: 0; margin-bottom: 15px;">📚 Knowledge Sources</h3>
        """
        for source in sources:
            source_name = escape_html(source.get('metadata', {}).get('source', 'Ayurvedic Knowledge'))
            category = escape_html(source.get('metadata', {}).get('category', 'General'))
            html += f"<p style='margin-bottom: 8px; line-height: 1.6;'><span style='color: #7b1fa2;'>📖</span> <strong>{source_name}</strong> - {category}</p>"
        html += "</div>"
    
    # Footer
    html += f"""
        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; font-size: 0.9em; color: #888; border-top: 1px solid #eee; padding-top: 15px;">
            <p style="margin-bottom: 5px;">🤖 Generated by AyurSutra AI Assistant</p>
            <p style="margin-bottom: 5px;">Made with ❤️ in India 🇮🇳</p>
            <p>📅 Date: {current_date}</p>
            <p style="margin-top: 10px; font-size: 0.85em; font-style: italic;">Reminder: This is an AI-generated analysis for informational purposes. Always consult a qualified Ayurvedic practitioner for professional medical advice.</p>
        </div>
    </div>
    """
    
    return html

def preprocess_text(text: str) -> List[str]:
    """Simple text preprocessing"""
    # Convert to lowercase and extract words
    words = re.findall(r'\b\w+\b', text.lower())
    # Filter out common stop words
    stop_words = {
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have',
        'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
        'may', 'might', 'can', 'this', 'that', 'these', 'those'
    }
    return [word for word in words if word not in stop_words and len(word) > 2]

def create_tf_vector(words: List[str], vocabulary: set) -> Dict[str, float]:
    """Create term frequency vector"""
    word_count = Counter(words)
    total_words = len(words)
    tf_vector = {}
    for word in vocabulary:
        tf = word_count.get(word, 0) / total_words if total_words > 0 else 0
        tf_vector[word] = tf
    return tf_vector

def cosine_similarity_simple(vec1: Dict[str, float], vec2: Dict[str, float]) -> float:
    """Calculate cosine similarity between two vectors"""
    dot_product = sum(
        vec1.get(word, 0) * vec2.get(word, 0)
        for word in vec1.keys() | vec2.keys())
    magnitude1 = math.sqrt(sum(val**2 for val in vec1.values()))
    magnitude2 = math.sqrt(sum(val**2 for val in vec2.values()))

    if magnitude1 == 0 or magnitude2 == 0:
        return 0

    return dot_product / (magnitude1 * magnitude2)

def find_relevant_knowledge(query: str, top_k: int = 3) -> List[Dict]:
    """Find most relevant knowledge base entries for the query using enhanced vector search"""
    # Build vocabulary from all texts
    all_words = set()
    all_processed_texts = []

    for text in AYURVEDIC_KNOWLEDGE:
        processed_words = preprocess_text(text['content'])
        all_processed_texts.append(processed_words)
        all_words.update(processed_words)

    vocabulary = all_words

    # Create TF vectors for each text
    text_word_vectors = []
    for processed_words in all_processed_texts:
        vector = create_tf_vector(processed_words, vocabulary)
        text_word_vectors.append(vector)

    # Preprocess query
    query_words = preprocess_text(query)
    query_vector = create_tf_vector(query_words, vocabulary)

    # Calculate similarities
    similarities = []
    for i, text_vector in enumerate(text_word_vectors):
        similarity = cosine_similarity_simple(query_vector, text_vector)
        similarities.append((i, similarity))

    # Sort by similarity and get top results
    similarities.sort(key=lambda x: x[1], reverse=True)

    # Filter out very low similarities and get relevant texts
    relevant_texts = []
    for idx, sim in similarities[:top_k]:
        if sim > 0.05:  # Lower threshold for simple TF
            relevant_texts.append(AYURVEDIC_KNOWLEDGE[idx])

    # If no relevant texts found, use keyword fallback
    if not relevant_texts:
        query_lower = query.lower()
        for text in AYURVEDIC_KNOWLEDGE:
            keywords = text['metadata'].get('keywords', [])
            if any(kw in query_lower for kw in keywords):
                relevant_texts.append(text)
                if len(relevant_texts) >= top_k:
                    break

        # Last resort: return first few texts
        if not relevant_texts:
            relevant_texts = AYURVEDIC_KNOWLEDGE[:top_k]

    return relevant_texts

def generate_ai_response(query: str, relevant_knowledge: List[Dict], conversation_history: Optional[List[Dict[str, str]]] = None) -> Dict[str, str]:
    """Generate response using Gemini with Ayurvedic context and format as beautiful HTML"""

    # Prepare context from relevant texts
    context = "\n\n".join([
        f"**{text['metadata']['category']}**: {text['content']}"
        for text in relevant_knowledge
    ])

    # Create system prompt for Ayurvedic consultation
    system_prompt = """You are an experienced Ayurvedic practitioner and health consultant. Your responses should be:

1. Based on traditional Ayurvedic principles and knowledge
2. Focused on the three doshas (Vata, Pitta, Kapha) and their balance
3. Holistic, considering physical, mental, and spiritual well-being  
4. Practical, offering actionable advice on diet, lifestyle, herbs, and practices
5. Culturally respectful of the ancient wisdom of Ayurveda
6. Clear about when to seek professional medical advice

Structure your response with clear paragraphs. When discussing different aspects, use separate paragraphs for:
- Dosha-related insights
- Dietary recommendations  
- Herbal or treatment suggestions
- Lifestyle guidance

Always ground your responses in the provided Ayurvedic knowledge context. If the question is outside your expertise or requires medical diagnosis, advise consulting qualified practitioners."""

    # Include conversation history for context
    history_context = ""
    if conversation_history:
        recent_history = conversation_history[-4:]  # Last 4 exchanges
        history_context = "\n\nCONVERSATION HISTORY:\n" + "\n".join([
            f"{msg['role'].upper()}: {msg['content'][:200]}{'...' if len(msg['content']) > 200 else ''}"
            for msg in recent_history
        ])

    prompt = f"""
Based on the following Ayurvedic knowledge context, please provide a comprehensive and helpful response to the user's question.

CONTEXT:
{context}{history_context}

USER QUESTION: {query}

Please provide a detailed Ayurvedic perspective addressing their question, including relevant dosha considerations, practical recommendations, and any important precautions. Structure your response clearly with separate paragraphs for different aspects."""

    try:
        # Get the Gemini client
        gemini_client = get_gemini_client()
        
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Content(role="user", parts=[types.Part(text=prompt)])
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                temperature=0.7,
                max_output_tokens=2500))

        if response.text:
            # Format the response as beautiful HTML
            formatted_html = format_ayurvedic_response_html(response.text, query, relevant_knowledge)
            return {"formatted_html": formatted_html, "plain_text": response.text}
        else:
            fallback_text = "I apologize, but I'm having difficulty generating a response. Please try rephrasing your question."
            fallback_html = format_ayurvedic_response_html(fallback_text, query, relevant_knowledge)
            return {"formatted_html": fallback_html, "plain_text": fallback_text}

    except Exception as e:
        error_text = f"I apologize, but I encountered an error while processing your request. Please try again or contact support if the issue persists."
        error_html = format_ayurvedic_response_html(error_text, query, relevant_knowledge)
        return {"formatted_html": error_html, "plain_text": error_text}

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ayurbot(request: ChatRequest):
    """
    Chat with AyurBot - AI-powered Ayurvedic wellness assistant
    """
    try:
        # Check if API key is available
        if not os.environ.get("GOOGLE_API_KEY"):
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
            response=ai_response.get("plain_text", ""),
            sources=list(set(sources)),  # Remove duplicates
            formatted_html=ai_response.get("formatted_html"),
            plain_text=ai_response.get("plain_text")
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")

@router.get("/health")
async def chatbot_health():
    """Check chatbot service health"""
    return {
        "status": "healthy",
        "knowledge_base_entries": len(AYURVEDIC_KNOWLEDGE),
        "api_key_configured": bool(os.environ.get("GOOGLE_API_KEY"))
    }

