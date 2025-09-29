from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import sessions, practitioners, chatbot

# Initialize the FastAPI app
app = FastAPI(
    title="AyurSutra API",
    description="Backend API for managing Panchakarma therapy sessions.",
    version="1.0.0"
)

# --- CORS (Cross-Origin Resource Sharing) Middleware ---
# This allows your React frontend to make requests to this backend.
# Update 'origins' to your frontend's URL in production.
import os

# Configure CORS origins based on environment
replit_domain = os.getenv("REPLIT_DEV_DOMAIN", "")
if replit_domain:
    replit_url = f"https://{replit_domain}"
else:
    replit_url = "https://c9b910bf-f922-4822-91d5-2d0f6de2f827-00-pb7zjmom23o0.pike.replit.dev"

if os.getenv("ENVIRONMENT", "development") == "production":
    # Production: Use specific domains
    origins = [
        replit_url,
        os.getenv("FRONTEND_URL", "")
    ]
    allow_credentials = True
else:
    # Development: Allow localhost variants and current Replit domain
    origins = [
        "http://localhost:3000",
        "http://localhost:5173", 
        "http://localhost:5000",
        replit_url
    ]
    allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

# --- Include Routers ---
# This links the endpoints from routers/sessions.py to the main app
app.include_router(sessions.router)
app.include_router(practitioners.router)
app.include_router(chatbot.router)

# --- Root Endpoint ---
@app.get("/", tags=["Root"])
def read_root():
    """
    A simple root endpoint to confirm the API is running.
    """
    return {"message": "Welcome to the AyurSutra Backend API!"}