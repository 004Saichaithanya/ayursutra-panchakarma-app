from fastapi import APIRouter, HTTPException, status
from typing import List

# --- CORRECTED IMPORTS ---
# Use .. to go up one directory to find the files
from models import Session, SessionCreate, SessionUpdate
from firebase_config import sessions_collection

# Create a router object
router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"]
)

# --- Endpoint to Create a New Session ---
@router.post("/", response_model=Session, status_code=status.HTTP_201_CREATED)
def create_session(session_data: SessionCreate):
    try:
        data = session_data.dict()
        update_time, doc_ref = sessions_collection.add(data)
        return Session(id=doc_ref.id, **data)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

# --- Endpoint to Get All Sessions for a Patient ---
@router.get("/{patient_id}", response_model=List[Session])
def get_all_sessions(patient_id: str):
    try:
        sessions = []
        docs = sessions_collection.where('patientId', '==', patient_id).stream()
        for doc in docs:
            session_data = doc.to_dict()
            sessions.append(Session(id=doc.id, **session_data))
        return sessions
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# --- Endpoint to Update (Reschedule) a Session ---
@router.put("/{session_id}", response_model=Session)
def update_session(session_id: str, session_update: SessionUpdate):
    try:
        doc_ref = sessions_collection.document(session_id)
        if not doc_ref.get().exists:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
        
        update_data = session_update.dict(exclude_unset=True)
        if not update_data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No update data provided")
            
        doc_ref.update(update_data)
        updated_doc = doc_ref.get()
        return Session(id=updated_doc.id, **updated_doc.to_dict())
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# --- Endpoint to Delete (Cancel) a Session ---
@router.delete("/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_session(session_id: str):
    try:
        doc_ref = sessions_collection.document(session_id)
        if not doc_ref.get().exists:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
            
        doc_ref.delete()
        return
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))