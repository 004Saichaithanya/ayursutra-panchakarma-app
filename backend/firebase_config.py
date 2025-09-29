import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the path to the credentials file from the environment variable
cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")

# Initialize Firebase or use emulator for development
try:
    if cred_path and os.path.exists(cred_path):
        # Use real Firebase credentials if available
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("✅ Firebase initialized with credentials successfully.")
    else:
        # Use development mode with emulator or dummy config
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