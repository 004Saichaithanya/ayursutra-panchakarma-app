"""
AyurvedaBot API Router - AI-powered Ayurvedic chatbot integration
Uses Mistral AI via OpenAI API wrapper with a comprehensive Ayurvedic knowledge base
"""
import os
import re
import datetime
from collections import Counter
from typing import List, Dict, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# --- Configure OpenAI client to use Mistral API ---
MISTRAL_API_KEY = os.environ.get("MISTRAL_API_KEY")
if MISTRAL_API_KEY:
    client = OpenAI(api_key=MISTRAL_API_KEY, base_url="https://api.mistral.ai/v1")
else:
    client = None
    print("WARNING: MISTRAL_API_KEY environment variable not found.")

# --- FastAPI router ---
router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

# --- Pydantic models ---
class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[Dict[str, str]]] = []

class ChatResponse(BaseModel):
    response: str
    sources: List[str] = []
    formatted_html: Optional[str] = None
    plain_text: Optional[str] = None

# --- Ayurvedic Knowledge Base ---
AYURVEDIC_KNOWLEDGE = [
    {
        "id": "vata-dosha-1",
        "content": "Vata dosha governs movement in the body, including blood circulation, breathing, blinking, and heartbeat. It is composed of air and space elements. Characteristics include dryness, coldness, lightness, roughness, and irregularity. When balanced, Vata promotes creativity, flexibility, and vitality. Imbalance often manifests as anxiety, insomnia, dry skin, constipation, joint pain, and irregular digestion. Balancing Vata involves warmth, routine, grounding activities, oil massages, and nourishing foods like cooked grains, warm milk, and ghee.",
        "metadata": {"source": "Classical Ayurveda", "category": "Doshas"}
    },
    {
        "id": "pitta-dosha-1",
        "content": "Pitta dosha controls digestion, metabolism, and energy production. It is composed of fire and water elements. Its qualities are hot, sharp, light, oily, and penetrating. Pitta individuals often have strong digestion, good intellect, and natural leadership qualities but can be prone to anger, criticism, and perfectionism when imbalanced. Physical symptoms of Pitta imbalance include inflammation, heartburn, acid reflux, skin rashes, excessive sweating, and loose stools. Cooling foods, moderation, avoiding excess heat and spicy foods help balance Pitta.",
        "metadata": {"source": "Classical Ayurveda", "category": "Doshas"}
    },
    {
        "id": "kapha-dosha-1",
        "content": "Kapha dosha provides structure, lubrication, and stability to the body. It is composed of earth and water elements. It is characterized by heaviness, coldness, slowness, oiliness, and stability. Balanced Kapha brings strength, immunity, calmness, and compassion. Imbalanced Kapha can lead to lethargy, weight gain, congestion, excessive sleep, attachment, and depression. Stimulation, regular exercise, warmth, light and spicy foods, and avoiding overeating are key to balancing Kapha dosha.",
        "metadata": {"source": "Classical Ayurveda", "category": "Doshas"}
    }
]

# --- Helper Functions ---
def preprocess_text(text: str) -> List[str]:
    stop_words = {'the', 'a', 'an', 'is', 'in', 'on', 'of', 'for', 'to', 'and', 'with', 'was', 'are'}
    return [w for w in re.findall(r'\b\w+\b', text.lower()) if w not in stop_words and len(w) > 2]

def find_relevant_knowledge(query: str, top_k: int = 3) -> List[Dict]:
    query_vector = Counter(preprocess_text(query))
    scored = []
    for entry in AYURVEDIC_KNOWLEDGE:
        text_vector = Counter(preprocess_text(entry["content"]))
        score = sum((query_vector & text_vector).values())
        scored.append((score, entry))
    scored.sort(reverse=True, key=lambda x: x[0])
    return [entry for score, entry in scored[:top_k] if score > 0] or AYURVEDIC_KNOWLEDGE[:top_k]

def format_ayurvedic_response_html(response_text: str, user_query: str, sources: Optional[List[Dict]] = None) -> str:
    """Generate Ayurvedic-themed HTML response safely"""
    safe_text = response_text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    safe_query = user_query.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    paragraphs = [f"<p style='margin-bottom:10px;'>{p}</p>" for p in safe_text.split('\n') if p.strip()]
    sources_html = ""
    if sources:
        sources_html = "<div style='background:#fdf0f5;padding:15px;border-left:5px solid #C48B5F;border-radius:10px;'>"
        sources_html += "<h4>📚 Sources:</h4>"
        for src in sources:
            name = src.get("metadata", {}).get("source", "Ayurvedic Knowledge")
            cat = src.get("metadata", {}).get("category", "General")
            sources_html += f"<p>📖 <strong>{name}</strong> - {cat}</p>"
        sources_html += "</div>"
    current_date = datetime.date.today().strftime("%B %d, %Y")
    html = f"""
    <div style="font-family:Georgia, serif;padding:20px;background:#fff9f0;border-left:8px solid #8B5E3C;border-radius:15px;">
        <h3 style="color:#6B4226;">🌿 Ayurvedic Guidance 🌿</h3>
        <div style="padding:15px;background:#fffaf0;border-left:5px solid #C48B5F;border-radius:10px;">
            <strong>💡 Your Question:</strong> {safe_query}
            {''.join(paragraphs)}
        </div>
        {sources_html}
        <p style="font-size:0.8em;color:#6B4226;text-align:center;margin-top:15px;">
            🤖 AyurSutra AI | 📅 {current_date} | ❤️ Made in India
        </p>
    </div>
    """
    return html

# --- Core AI Generation using Mistral ---
def generate_ai_response(query: str, relevant_knowledge: List[Dict], conversation_history: Optional[List[Dict[str,str]]] = None) -> Dict[str,str]:
    if not client:
        return {"formatted_html":"API key not configured.","plain_text":"API key not configured."}

    messages = [{"role":"system","content":"You are an expert Ayurvedic practitioner. Answer precisely using the provided context. Mention diet, lifestyle, herbs, and dosha balance. Highlight when medical advice is needed."}]
    if conversation_history:
        for msg in conversation_history:
            role = "assistant" if msg.get("role")=="model" else "user"
            messages.append({"role":role,"content":msg.get("content","")})
    context_text = "\n\n".join([f"**{k['metadata']['category']}**: {k['content']}" for k in relevant_knowledge])
    messages.append({"role":"user","content":f"CONTEXT:\n{context_text}\n\nQUESTION: {query}"})

    try:
        resp = client.chat.completions.create(
            model="mistral-small",
            messages=messages,
            temperature=0.6,
            max_tokens=500
        )
        text = resp.choices[0].message.content.strip()
        html = format_ayurvedic_response_html(text, query, relevant_knowledge)
        return {"formatted_html":html,"plain_text":text}
    except Exception as e:
        print(f"[ERROR] AI generation failed: {e}")
        fallback = "Sorry, could not process your request. Please try again."
        return {"formatted_html":format_ayurvedic_response_html(fallback, query, []),"plain_text":fallback}

# --- API Routes ---
@router.post("/chat", response_model=ChatResponse)
async def chat_with_ayurbot(request: ChatRequest):
    if not client:
        raise HTTPException(status_code=503, detail="AI service unavailable. API key not configured.")
    relevant = find_relevant_knowledge(request.message)
    ai_resp = generate_ai_response(request.message, relevant, request.conversation_history)
    sources = list({entry["metadata"]["source"] for entry in relevant})
    return ChatResponse(
        response=ai_resp["plain_text"],
        sources=sources,
        formatted_html=ai_resp["formatted_html"],
        plain_text=ai_resp["plain_text"]
    )

@router.get("/health")
async def chatbot_health():
    return {"status":"healthy","knowledge_base_entries":len(AYURVEDIC_KNOWLEDGE),"api_key_configured":bool(client)}
