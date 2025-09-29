import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get Firebase credentials from environment variables
firebase_project_id = os.getenv("FIREBASE_PROJECT_ID")
firebase_private_key = os.getenv("FIREBASE_PRIVATE_KEY")
firebase_client_email = os.getenv("FIREBASE_CLIENT_EMAIL")
firebase_client_id = os.getenv("FIREBASE_CLIENT_ID")

# Get the path to the credentials file from the environment variable (fallback)
cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")

# Initialize Firebase
try:
    if firebase_project_id and firebase_private_key and firebase_client_email:
        # Use environment variables to create credentials
        print("🔧 Initializing Firebase with environment variables...")
        
        # Create credentials dict from environment variables
        firebase_config = {
            "type": "service_account",
            "project_id": firebase_project_id,
            "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID", ""),
            "private_key": firebase_private_key.replace('\\n', '\n'),  # Fix newline encoding
            "client_email": firebase_client_email,
            "client_id": firebase_client_id or "",
            "auth_uri": os.getenv("FIREBASE_AUTH_URI", "https://accounts.google.com/o/oauth2/auth"),
            "token_uri": os.getenv("FIREBASE_TOKEN_URI", "https://oauth2.googleapis.com/token"),
            "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL", "https://www.googleapis.com/oauth2/v1/certs"),
            "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL", f"https://www.googleapis.com/robot/v1/metadata/x509/{firebase_client_email}")
        }
        
        cred = credentials.Certificate(firebase_config)
        firebase_admin.initialize_app(cred, {
            'projectId': firebase_project_id
        })
        print("✅ Firebase initialized with environment credentials successfully.")
        
    elif cred_path and os.path.exists(cred_path):
        # Use real Firebase credentials file if available
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("✅ Firebase initialized with credentials file successfully.")
    else:
        raise Exception("Firebase credentials are required. Please provide either environment variables (FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL) or set FIREBASE_CREDENTIALS_PATH to a valid credentials file.")
    
    # Get a client to the Firestore database
    db = firestore.client()
    
    # Create a reference to the 'sessions' collection
    sessions_collection = db.collection('sessions')
    
except Exception as e:
    print(f"❌ Firebase initialization failed: {e}")
    raise e