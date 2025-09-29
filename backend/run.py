#!/usr/bin/env python3
"""
Entry point to run the FastAPI backend server
"""
import uvicorn
import os

if __name__ == "__main__":
    # Use environment port or default to 5000 for production, 8000 for dev
    port = int(os.getenv("PORT", 8000))
    # Bind to all interfaces for Replit accessibility
    host = "0.0.0.0"
    # Only use reload in development
    reload = os.getenv("ENVIRONMENT", "development") == "development"
    
    uvicorn.run(
        "main:app",  # Import string for reload to work
        host=host,
        port=port,
        reload=reload,
        log_level="info"
    )