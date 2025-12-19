# backend/crud.py

from sqlalchemy.orm import Session
from backend.models import Prediction

def save_prediction(db: Session, value: float) -> Prediction:
    record = Prediction(predicted_capex=value)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record
