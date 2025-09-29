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
        # Use development mode with project ID if available
        if firebase_project_id:
            print(f"🔧 Initializing Firebase in development mode with project ID: {firebase_project_id}")
            firebase_admin.initialize_app(options={'projectId': firebase_project_id})
        else:
            print("⚠️ No Firebase credentials found. Using development mode.")
            firebase_admin.initialize_app()
        print("✅ Firebase initialized in development mode.")
    
    # Get a client to the Firestore database
    db = firestore.client()
    
    # Create a reference to the 'sessions' collection
    sessions_collection = db.collection('sessions')
    
except Exception as e:
    print(f"⚠️ Firebase initialization failed: {e}")
    print("Running in mock mode - API endpoints will work but data won't persist")
    
    # Create a mock collection for development
    class MockCollection:
        def add(self, data):
            # Return mock document reference
            class MockDocRef:
                def __init__(self):
                    import uuid
                    self.id = str(uuid.uuid4())
            return None, MockDocRef()
        
        def where(self, field, op, value):
            return MockQueryResult()
        
        def document(self, doc_id):
            return MockDocument()
        
        def stream(self):
            return []
    
    class MockQueryResult:
        def stream(self):
            return []
    
    class MockDocument:
        def get(self):
            class MockDocSnapshot:
                exists = False
            return MockDocSnapshot()
        
        def update(self, data):
            pass
        
        def delete(self):
            pass
    
    class MockDatabase:
        def collection(self, name):
            return MockCollection()
    
    # Set mock instances
    db = MockDatabase()
    sessions_collection = MockCollection()