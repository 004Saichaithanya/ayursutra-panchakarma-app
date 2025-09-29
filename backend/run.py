#!/usr/bin/env python3
"""
Entry point to run the FastAPI backend server
"""
import uvicorn

if __name__ == "__main__":
    # Run the backend on port 8000 (frontend runs on 5000)
    uvicorn.run(
        "main:app",  # Import string for reload to work
        host="127.0.0.1",  # Backend uses localhost
        port=8000,
        reload=True,
        log_level="info"
    )