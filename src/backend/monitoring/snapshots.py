# backend/monitoring/snapshots.py

from backend.database import engine
from sqlalchemy import text

def feature_importance_history(days: int):
    query = text("""
        SELECT
            feature,
            AVG(importance) as avg_importance
        FROM feature_importance_snapshot
        WHERE created_at >= DATEADD(day, -:days, GETUTCDATE())
        GROUP BY feature
        ORDER BY avg_importance DESC
    """)

    with engine.connect() as conn:
        return [dict(r) for r in conn.execute(query, {"days": days})]
