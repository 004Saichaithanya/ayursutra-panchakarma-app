import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the path to the credentials file from the environment variable
cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")

if not os.path.exists(cred_path):
    raise FileNotFoundError(f"Firebase credentials file not found at path: {cred_path}")

# Initialize the app with a service account, granting admin privileges
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# Get a client to the Firestore database
db = firestore.client()

# Create a reference to the 'sessions' collection
sessions_collection = db.collection('sessions')

print("✅ Firebase initialized successfully.")