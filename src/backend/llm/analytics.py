# ##src/backend/llm/analytics.py

# import os
# import pandas as pd
# from datetime import datetime, timedelta
# from sqlalchemy import text
# from dotenv import load_dotenv

# import google.genai as genai

# from backend.database import engine
# from backend.llm.prompts import SYSTEM_PROMPT, build_prompt

# # --------------------------------------------------
# # Environment + Gemini setup
# # --------------------------------------------------

# load_dotenv()

# # Initialize the client (API key can also be set via GEMINI_API_KEY env variable)
# client = genai.Client(api_key="YOUR_API_KEY")

# # Configure and generate content
# response = client.models.generate_content(
#     model="gemini-2.0-flash",
#     contents="Explain quantum computing in one sentence.",
#     config=types.GenerateContentConfig(
#         system_instruction="You are a helpful science educator.",
#         temperature=0.7
#     )
# )

# # --------------------------------------------------
# # Database access
# # --------------------------------------------------

# def get_recent_predictions(days: int = 30) -> pd.DataFrame:
#     start_date = datetime.utcnow() - timedelta(days=days)

#     query = text("""
#         SELECT
#             id,
#             timestamp,
#             predicted_capex
#         FROM Cost_Estimation.dbo.predictions
#         WHERE timestamp >= :start_date
#         ORDER BY timestamp DESC
#     """)

#     with engine.connect() as conn:
#         df = pd.read_sql(
#             query,
#             conn,
#             params={"start_date": start_date}
#         )

#     return df


# # --------------------------------------------------
# # Analytics
# # --------------------------------------------------

# def compute_trend(df: pd.DataFrame):
#     if df.empty or len(df) < 5:
#         return None

#     df = df.sort_values("timestamp").reset_index(drop=True)
#     df["t"] = range(len(df))

#     slope = df["predicted_capex"].corr(df["t"])

#     return {
#         "direction": (
#             "up" if slope > 0.1
#             else "down" if slope < -0.1
#             else "flat"
#         ),
#         "strength": round(float(slope), 3)
#     }


# def detect_anomalies(df: pd.DataFrame):
#     if df.empty:
#         return []

#     mean = df["predicted_capex"].mean()
#     std = df["predicted_capex"].std()

#     if std == 0 or pd.isna(std):
#         return []

#     anomalies = df[
#         (df["predicted_capex"] > mean + 3 * std) |
#         (df["predicted_capex"] < mean - 3 * std)
#     ]

#     return [
#         {
#             "id": int(row.id),
#             "predicted_capex": float(row.predicted_capex),
#             "timestamp": row.timestamp.isoformat()
#         }
#         for _, row in anomalies.iterrows()
#     ]


# # --------------------------------------------------
# # Context builder (this is what the LLM sees)
# # --------------------------------------------------

# def build_context(days: int = 30):
#     df = get_recent_predictions(days)

#     return {
#         "count": int(len(df)),
#         "mean_prediction": (
#             round(float(df["predicted_capex"].mean()), 2)
#             if not df.empty else None
#         ),
#         "trend": compute_trend(df),
#         "anomalies": detect_anomalies(df)
#     }


# # --------------------------------------------------
# # LLM entry point
# # --------------------------------------------------

# def perform_analysis(question: str, days: int = 30) -> str:
#     context = build_context(days)
#     prompt = build_prompt(question, context)

#     try:
#         response = model.generate_content(
#             prompt,
#             generation_config={
#                 "temperature": 0.7,
#                 "max_output_tokens": 500
#             }
#         )

#         return response.text.strip()

#     except Exception as e:
#         return f"Error generating analysis: {str(e)}"



import os
import pandas as pd
from datetime import datetime, timedelta
from sqlalchemy import text
from dotenv import load_dotenv

# Updated import for the 2025 unified SDK
from google import genai
from google.genai import types

from backend.database import engine
# Ensure these imports exist in your project structure
from backend.llm.prompts import SYSTEM_PROMPT, build_prompt

# --------------------------------------------------
# Environment + Gemini setup
# --------------------------------------------------

load_dotenv()

# Initialize the client 
# (Uses GEMINI_API_KEY env variable automatically if not passed)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# --------------------------------------------------
# Database access & Analytics 
# --------------------------------------------------

def get_recent_predictions(days: int = 30) -> pd.DataFrame:
    """Fetches prediction data from SQL Server."""
    start_date = datetime.utcnow() - timedelta(days=days)
    query = text("""
        SELECT id, timestamp, predicted_capex
        FROM Cost_Estimation.dbo.predictions
        WHERE timestamp >= :start_date
        ORDER BY timestamp DESC
    """)
    with engine.connect() as conn:
        df = pd.read_sql(query, conn, params={"start_date": start_date})
    return df

def compute_trend(df: pd.DataFrame):
    """Calculates if spending is trending up, down, or flat."""
    if df.empty or len(df) < 5: return None
    df = df.sort_values("timestamp").reset_index(drop=True)
    df["t"] = range(len(df))
    # Simple correlation as a proxy for trend
    slope = df["predicted_capex"].corr(df["t"])
    return {
        "direction": "up" if slope > 0.1 else "down" if slope < -0.1 else "flat",
        "strength": round(float(slope), 3)
    }

def detect_anomalies(df: pd.DataFrame):
    """Identifies predictions outside 3 standard deviations."""
    if df.empty: return []
    mean, std = df["predicted_capex"].mean(), df["predicted_capex"].std()
    if std == 0 or pd.isna(std): return []
    
    anomalies = df[(df["predicted_capex"] > mean + 3 * std) | 
                   (df["predicted_capex"] < mean - 3 * std)]
    
    return [
        {
            "id": int(row.id), 
            "predicted_capex": float(row.predicted_capex), 
            "timestamp": row.timestamp.isoformat()
        } for _, row in anomalies.iterrows()
    ]

def build_context(days: int = 30):
    """Aggregates DB data into a context dictionary for the LLM."""
    df = get_recent_predictions(days)
    return {
        "count": int(len(df)),
        "mean_prediction": round(float(df["predicted_capex"].mean()), 2) if not df.empty else None,
        "trend": compute_trend(df),
        "anomalies": detect_anomalies(df)
    }

# --------------------------------------------------
# LLM entry point (Corrected for SDK and Model naming)
# --------------------------------------------------

def perform_analysis(question: str, days: int = 30) -> str:
    context = build_context(days)
    prompt = build_prompt(question, context)

    try:
        # Use a current 2025 model (gemini-3-flash-preview or gemini-2.5-flash)
        # Note: No leading spaces and no 'models/' prefix needed here
        response = client.models.generate_content(
            model="gemini-3-flash-preview", 
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.7,
                max_output_tokens=1000  # Increased for more detailed analysis
            )
        )
        
        if response.text:
            return response.text.strip()
        else:
            return "The model returned an empty response."

    except Exception as e:
        # Catching specific errors can help debugging
        return f"Error generating analysis: {str(e)}"

# Example usage check
if __name__ == "__main__":
    result = perform_analysis("Summarize the cost trends for the last month.")
    print(result)