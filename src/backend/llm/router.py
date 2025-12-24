##src/backend/llm/router.py

# from fastapi import APIRouter, Depends, HTTPException
# from backend.llm.service import run_llm
# from backend.database import SessionLocal

# router = APIRouter(prefix="/llm", tags=["LLM"])

# @router.post("/chat")
# def chat(query: str):
#     try:
#         return handle_chat(query)
#     except Exception as e:
#         import traceback
#         print("LLM ERROR:", traceback.format_exc())
#         raise HTTPException(status_code=500, detail=str(e))
# def handle_chat(query: str):
#     response = run_llm(query)
#     return {"response": response}

# src/backend/llm/router.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.llm.service import run_llm

router = APIRouter(prefix="/llm", tags=["LLM"])

class ChatRequest(BaseModel):
    query: str

@router.post("/chat")
def chat(req: ChatRequest):
    try:
        response = run_llm(req.query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {str(e)}")
