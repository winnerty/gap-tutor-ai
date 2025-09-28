from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from gpt4all import GPT4All
import json, re, traceback

router = APIRouter()

MODEL_PATH = "C:/Users/Timofey/coding/gap-tutor-ai/frontend/models"
MODEL_NAME = "Phi-3-mini-4k-instruct.Q4_0.gguf"

try:
    print(f"Initializing GPT4All with model: {MODEL_NAME} at {MODEL_PATH}")
    model = GPT4All(MODEL_NAME, model_path=MODEL_PATH)
    print("Model initialized successfully")
except Exception as e:
    print("Failed to initialize model:", e)
    traceback.print_exc()
    model = None


class QuizRequest(BaseModel):
    subject: str


def clean_output(raw: str) -> str:
    raw = raw.strip().replace("```json", "").replace("```", "")
    m = re.search(r"\{[\s\S]*\}", raw)
    return m.group(0) if m else raw


@router.post("/generate_quiz")
def generate_quiz(req: QuizRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Model is not initialized")
    
    prompt = f"""
    Return ONLY valid JSON. ULTIMATELY AND ABSOLUTELY follow the rules and format provided.
    Generate exactly 5 multiple-choice questions for "{req.subject}".
    Rules:
    - "question": string
    - "options": array of EXACTLY 3 separate strings
    - "answer": exactly one of the strings from "options"
    Format:
    {{
    "quiz": [
        {{
        "question": "What is 2+2?",
        "options": ["2", "3", "4"],
        "answer": "4"
        }},
    ]
    }}
    """

    try:
        with model.chat_session():
            raw = model.generate(prompt, max_tokens=500, temp=0)
            print("🔹 RAW OUTPUT:\n", raw)

        cleaned = clean_output(raw)
        print("🔧 CLEANED OUTPUT:\n", cleaned)

        try:
            parsed = json.loads(cleaned)
        except json.JSONDecodeError as e:
            print("JSON parse failed:", e)
            return {"topic": req.subject, "questions": []}

        questions = parsed.get("quiz", []) if isinstance(parsed, dict) else []

        result = {
            "topic": req.subject,
            "questions": [
                {
                    "question": q.get("question", ""),
                    "options": q.get("options", [])[:3],
                    "answer": q.get("answer", ""),
                }
                for q in questions
            ],
        }

        return result

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Model error: {e}")