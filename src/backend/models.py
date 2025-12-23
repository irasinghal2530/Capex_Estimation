# backend/models.py

# from sqlalchemy import Column, Integer, Float, DateTime
# from sqlalchemy.sql import func
# from backend.database import Base

# class Prediction(Base):
#     __tablename__ = "predictions"

#     id = Column(Integer, primary_key=True, index=True)
#     predicted_capex = Column(Float, nullable=False)
#     timestamp = Column(DateTime, server_default=func.now())


# backend/models/prediction.py

from sqlalchemy import Column, Integer, Float, DateTime, JSON
from sqlalchemy.sql import func
from backend.database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    predicted_capex = Column(Float, nullable=False)
    parameters = Column(JSON, nullable=True)  # nullable for backward compatibility
    timestamp = Column(DateTime, server_default=func.now(), nullable=False)
