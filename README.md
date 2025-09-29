AyurSutra - Panchakarma Patient Management System
Welcome to AyurSutra, a full-stack web application designed to help patients manage their Panchakarma therapy sessions with ease. Patients can view upcoming and past appointments, schedule new sessions, modify existing ones, and cancel them as needed. The platform is powered by a modern tech stack featuring a React frontend and a FastAPI backend, with Firebase Firestore for real-time data storage.

✨ Key Features
Patient Authentication: Secure user login and registration.

Session Management: Full CRUD (Create, Read, Update, Delete) functionality for therapy sessions.

Dynamic Dashboard: View upcoming and previous sessions in a clean, tabbed interface.

Interactive Booking: Schedule new sessions through an intuitive pop-up form.

Real-time Updates: Utilizes Firebase Firestore for instant data synchronization.

Dummy Data Seeding: Automatically populates the dashboard with sample sessions for new users for a better first-time experience.

🛠️ Tech Stack
Frontend

Backend

React 18 (with Vite)

Python 3.8+

Tailwind CSS

FastAPI

Shadcn/UI & Radix UI

Uvicorn (ASGI Server)

react-router-dom

Firebase Admin SDK

firebase (Client SDK)

Firebase Firestore (Database)

📂 Project Structure
This project is a monorepo containing both the frontend and backend codebases.

/ayursutra-panchakarma-app
|
|-- 📂 backend/
|   |-- 📂 routers/
|   |   |-- __init__.py
|   |   |-- practitioners.py
|   |   |-- sessions.py
|   |-- venv/               # (Ignored by Git)
|   |-- .env                # (Ignored by Git - Local secrets)
|   |-- firebase_config.py
|   |-- firebase-credentials.json # (Ignored by Git - CRITICAL secret)
|   |-- main.py
|   |-- models.py
|   |-- requirements.txt      # (List of Python packages)
|
|-- 📂 frontend/
|   |-- 📂 src/
|   |   |-- 📂 components/
|   |   |-- 📂 contexts/
|   |   |   |-- AuthContext.jsx
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |-- node_modules/       # (Ignored by Git)
|   |-- .env.local          # (Ignored by Git - Local secrets)
|   |-- index.html
|   |-- package.json
|   |-- vite.config.js
|
|-- .gitignore              # (Top-level gitignore)
|-- README.md               # (You are here!)


🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18 or newer)

Python (v3.8 or newer) and pip

A Firebase Project with Firestore enabled.

Installation & Setup
1. Clone the Repository

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

2. Backend Setup

Navigate to the backend directory and set up a virtual environment.

cd backend

# Create and activate a virtual environment
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install required Python packages
pip install fastapi "uvicorn[standard]" firebase-admin pydantic python-dotenv

Firebase Admin Credentials (CRITICAL):

Go to your Firebase Project Settings > Service accounts.

Click "Generate new private key" and download the JSON file.

Place this file inside the backend/ folder and rename it to firebase-credentials.json. This file is listed in .gitignore and must never be committed.

Environment Variables:

Create a new file named .env inside the backend/ folder.

Add the following line, pointing to your credentials file:

FIREBASE_CREDENTIALS_PATH="firebase-credentials.json"

3. Frontend Setup

Navigate to the frontend directory in a new terminal.

cd frontend

# Install all the npm packages listed in package.json
npm install

Firebase Client Configuration:

Your frontend code connects to Firebase via a configuration object (usually in a firebase.js or similar file). Ensure your Firebase project's web app configuration keys (apiKey, authDomain, etc.) are correctly set up, likely using local environment variables (.env.local).

4. Running the Application

You need to run both the backend and frontend servers simultaneously.

Terminal 1: Start the Backend (FastAPI)
(Ensure you are in the backend/ directory with the virtual environment active)

uvicorn main:app --reload

The backend API will be running on http://127.0.0.1:8000.

Terminal 2: Start the Frontend (React)
(Ensure you are in the frontend/ directory)

npm run dev

The frontend application will be available at http://localhost:5000 (or another port specified by Vite).

You can now open your browser and navigate to the frontend URL to use the application!
