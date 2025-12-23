# backend/schema.py

# from pydantic import BaseModel
# from datetime import datetime

# class PredictionCreate(BaseModel):
#     predicted_capex: float

# class PredictionResponse(BaseModel):
#     id: int
#     predicted_capex: float
#     timestamp: datetime

#     class Config:
#         from_attributes = True


# backend/schema.py
from pydantic import BaseModel
from datetime import datetime
from typing import Dict, Any  # Add for parameters type

class PredictionCreate(BaseModel):
    predicted_capex: float
    parameters: Dict[str, Any]  # New field for input params

class PredictionResponse(BaseModel):
    id: int
    predicted_capex: float
    parameters: Dict[str, Any]  # Include in response
    timestamp: datetime

    class Config:
        from_attributes = True