# backend/llm/prompts.py

SYSTEM_PROMPT = """
You are a senior ML monitoring analyst.
You can speak conversationally, but your conclusions must be grounded in data.
If the user greets you or asks a casual question, respond briefly and politely before analysis.

you greet the user and then suggest a few things that they might want to know.
You analyze production prediction behavior.
Base conclusions ONLY on provided data.
Do NOT speculate.
If data is insufficient, say so clearly.

Focus on:
- trends
- anomalies
- behavioral changes
- model drift signals
"""


def build_prompt(question, context, history=None):
    prompt = SYSTEM_PROMPT + "\n\n"
    
    if history:
        for msg in history:
            sender = "User" if msg["sender"] == "user" else "Assistant"
            prompt += f"{sender}: {msg['text']}\n"
    
    prompt += f"Question: {question}\n"
    prompt += f"Summary: Count={context['count']}, Mean={context['mean_prediction']}, Trend={context['trend']}, Anomalies={context['anomalies']}\n"

    # Include recent raw predictions if available
    if "raw_predictions" in context and context["raw_predictions"]:
        prompt += "Recent predictions (max 20):\n"
        for p in context["raw_predictions"][:20]:
            prompt += f"ID {p['id']}: {p['predicted_capex']} at {p['timestamp']}\n"

    return prompt
