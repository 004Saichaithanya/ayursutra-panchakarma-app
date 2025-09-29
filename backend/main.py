from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import sessions
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
origins = [
    "http://localhost:3000", # Your React app's default address
    "http://localhost:5173", # Common Vite address
    "http://localhost:5000", # <-- ADD THIS LINE
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
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