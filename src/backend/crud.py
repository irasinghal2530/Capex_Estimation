# backend/crud.py

# from sqlalchemy.orm import Session
# from backend.models import Prediction

# def save_prediction(db: Session, value: float) -> Prediction:
#     record = Prediction(predicted_capex=value)
#     db.add(record)
#     db.commit()
#     db.refresh(record)
#     return record

# backend/crud.py

from sqlalchemy.orm import Session
from backend.models import Prediction
from typing import Dict, Any  # Add for type hint

def save_prediction(db: Session, value: float, params: Dict[str, Any]) -> Prediction:
    record = Prediction(predicted_capex=value, parameters=params)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record