# AyurSutra Patient Management System

## Overview
AyurSutra is a comprehensive patient management system for Panchakarma therapy, featuring AI-powered insights, progress tracking, and seamless practitioner collaboration. This is a full-stack application with a React frontend and FastAPI backend.

## Architecture
- **Frontend**: React with Vite, Tailwind CSS, and Radix UI components (Port 5000)
- **Backend**: FastAPI with Python (Port 8000 in development, Port 5000 in production)
- **Database**: Firebase Firestore (with mock implementation for development)
- **Authentication**: Firebase Authentication

## Current State
The application is successfully set up and running in the Replit environment:
- ✅ Frontend: Modern React application with beautiful UI components
- ✅ Backend: FastAPI server with session and practitioner management APIs
- ✅ Development mode: Both services running and communicating properly
- ✅ Mock Firebase: Development mode with dummy data for testing

## Recent Changes (2025-09-29)
- Imported GitHub project and configured for Replit environment
- Set up development dependencies for both frontend and backend
- Configured workflows for concurrent frontend/backend development
- Implemented mock Firebase for development without credentials
- Fixed CORS settings to allow frontend-backend communication
- Set up deployment configuration for production

## Project Structure
```
/
├── frontend/          # React/Vite application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── contexts/      # React contexts
│   │   └── services/      # API services
│   ├── package.json
│   └── vite.config.js
└── backend/           # FastAPI application
    ├── routers/       # API route handlers
    ├── main.py        # FastAPI app configuration
    ├── models.py      # Pydantic models
    ├── firebase_config.py  # Firebase setup
    ├── run.py         # Development server entry point
    └── requirements.txt

```

## Development Setup
1. Frontend runs on port 5000 with Vite dev server
2. Backend runs on port 8000 with uvicorn and auto-reload
3. Mock Firebase provides API functionality without external dependencies
4. CORS configured for cross-origin requests

## Production Deployment
- Frontend builds to static files
- Backend serves on port 5000 in production
- Autoscale deployment target for optimal resource usage

## User Preferences
- Clean, professional medical application design
- Focus on usability and accessibility
- Development mode prioritized for rapid iteration