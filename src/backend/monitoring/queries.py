#backend/monitoring/queries.py

import pandas as pd
from sqlalchemy import text
from backend.database import engine

def fetch_predictions(days: int):
    query = text("""
        SELECT
            prediction_id,
            prediction_value,
            created_at
        FROM predictions
        WHERE created_at >= DATEADD(day, -:days, GETUTCDATE())
        ORDER BY created_at ASC
    """)

    with engine.connect() as conn:
        return pd.read_sql(query, conn, params={"days": days})
