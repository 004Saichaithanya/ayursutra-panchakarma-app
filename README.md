# 🌿 AyurSutra – Panchakarma Patient Management System

Welcome to **AyurSutra**, a full-stack web application designed to help patients manage their **Panchakarma therapy sessions** with ease.

Patients can:
✔ View upcoming and past appointments
✔ Schedule new sessions
✔ Modify or cancel existing sessions
✔ Track real-time updates through Firebase Firestore

---

## ✨ Key Features

* **Patient Authentication** – Secure login & registration
* **Session Management** – Full CRUD (Create, Read, Update, Delete) for therapy sessions
* **Dynamic Dashboard** – Clean tabbed interface for upcoming & past sessions
* **Interactive Booking** – Intuitive pop-up form for scheduling sessions
* **Real-time Updates** – Instant data sync via Firebase Firestore
* **Dummy Data Seeding** – Auto-populated sessions for new users

---

## 🛠️ Tech Stack

### **Frontend**

* React 18 (with Vite)
* Tailwind CSS
* Shadcn/UI & Radix UI
* react-router-dom
* firebase (Client SDK)

### **Backend**

* Python 3.8+
* FastAPI
* Uvicorn (ASGI Server)
* Firebase Admin SDK
* Firebase Firestore (Database)
* Pydantic
* python-dotenv

---

## 📂 Project Structure

```
/ayursutra-panchakarma-app
|
|-- 📂 backend/
|   |-- 📂 routers/
|   |   |-- __init__.py
|   |   |-- practitioners.py
|   |   |-- sessions.py
|   |-- venv/                     # (Ignored by Git)
|   |-- .env                      # (Ignored by Git - Local secrets)
|   |-- firebase_config.py
|   |-- firebase-credentials.json # (Ignored by Git - CRITICAL secret)
|   |-- main.py
|   |-- models.py
|   |-- requirements.txt
|
|-- 📂 frontend/
|   |-- 📂 src/
|   |   |-- 📂 components/
|   |   |-- 📂 contexts/
|   |   |   |-- AuthContext.jsx
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |-- node_modules/             # (Ignored by Git)
|   |-- .env.local                # (Ignored by Git - Local secrets)
|   |-- index.html
|   |-- package.json
|   |-- vite.config.js
|
|-- .gitignore
|-- README.md
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) (v18 or newer)
* [Python](https://www.python.org/) (v3.8 or newer) + `pip`
* [Firebase Project](https://firebase.google.com/) with Firestore enabled

---

### ⚙️ Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

#### 2. Backend Setup

```bash
cd backend
```

Create and activate a virtual environment:

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install fastapi "uvicorn[standard]" firebase-admin pydantic python-dotenv
```

**Firebase Admin Credentials (CRITICAL):**

1. Go to Firebase Project Settings → **Service accounts**
2. Click **Generate new private key** → Download the JSON file
3. Place it inside the `backend/` folder and rename to:

```
firebase-credentials.json
```

*(This file is already in `.gitignore`, never commit it!)*

**Environment Variables:**
Create a `.env` file in `backend/` with:

```env
FIREBASE_CREDENTIALS_PATH="firebase-credentials.json"
```

---

#### 3. Frontend Setup

```bash
cd frontend
npm install
```

**Firebase Client Configuration:**
Ensure Firebase web app configuration (`apiKey`, `authDomain`, etc.) is set up in `firebase.js` (or similar).
Use `.env.local` to store these keys securely.

---

#### 4. Running the Application

Open **two terminals**:

**Terminal 1 – Backend (FastAPI):**

```bash
cd backend
uvicorn main:app --reload
```

👉 Runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

**Terminal 2 – Frontend (React):**

```bash
cd frontend
npm run dev
```

👉 Runs at: [http://localhost:5000](http://localhost:5000) (or another Vite port)

---

## 🎯 Usage

1. Register/Login as a patient
2. View your dashboard → Upcoming & Past Sessions
3. Book, Edit, or Cancel therapy sessions
4. Watch changes reflect instantly with Firestore

---

## 🔒 Security Notes

* Never commit `.env`, `.env.local`, or `firebase-credentials.json` in production
* Always configure Firestore security rules for real-world use

---

## 📜 License

This project is licensed under the **MIT License**.
