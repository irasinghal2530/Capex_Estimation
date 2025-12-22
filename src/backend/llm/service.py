##src/backend/llm/services.py
from backend.llm.analytics import perform_analysis
def run_llm(query: str):
    return perform_analysis(query)

