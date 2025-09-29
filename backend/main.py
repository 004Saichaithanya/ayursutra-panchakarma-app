from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import sessions, practitioners

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
if os.getenv("ENVIRONMENT", "development") == "production":
    # Production: Use specific domains
    origins = [
        "https://cafa6d14-ba1b-415c-8f58-dd050d713848-00-1uievvy1c9qtv.pike.replit.dev",
        os.getenv("FRONTEND_URL", "")
    ]
    allow_credentials = True
else:
    # Development: Allow localhost variants but not wildcard with credentials
    origins = [
        "http://localhost:3000",
        "http://localhost:5173", 
        "http://localhost:5000",
        "https://cafa6d14-ba1b-415c-8f58-dd050d713848-00-1uievvy1c9qtv.pike.replit.dev"
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

# --- Root Endpoint ---
@app.get("/", tags=["Root"])
def read_root():
    """
    A simple root endpoint to confirm the API is running.
    """
    return {"message": "Welcome to the AyurSutra Backend API!"}