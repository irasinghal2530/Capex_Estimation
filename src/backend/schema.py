# backend/schema.py

from pydantic import BaseModel
from datetime import datetime

class PredictionCreate(BaseModel):
    predicted_capex: float

class PredictionResponse(BaseModel):
    id: int
    predicted_capex: float
    timestamp: datetime

    class Config:
        from_attributes = True
