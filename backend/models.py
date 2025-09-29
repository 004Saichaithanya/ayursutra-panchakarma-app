from pydantic import BaseModel
from typing import Optional, List

# This is the base model with fields common to both creation and retrieval
class SessionBase(BaseModel):
    therapy: str
    date: str
    time: str
    duration: str
    practitioner: str
    location: str
    status: str # e.g., 'confirmed', 'pending', 'completed'
    sessionId: str
    preparation: Optional[List[str]] = None
    notes: Optional[str] = None
    patientId: str # To associate the session with a patient

# Model for creating a new session (all fields required)
class SessionCreate(SessionBase):
    pass

# Model for updating a session (all fields are optional)
class SessionUpdate(BaseModel):
    therapy: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    duration: Optional[str] = None
    practitioner: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    preparation: Optional[List[str]] = None
    notes: Optional[str] = None

# This model is for data retrieved from Firestore, which includes the document ID
class Session(SessionBase):
    id: str # The unique ID from Firestore

class Practitioner(BaseModel):
    id: str
    name: str
    userType: str