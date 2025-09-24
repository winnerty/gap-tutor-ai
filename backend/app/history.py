from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

from .database import SessionLocal
from .models import QuizHistory
from .schemas import HistoryCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_history(entry: HistoryCreate, db: Session = Depends(get_db)):
    new_entry = QuizHistory(
        email=entry.email,
        subject=entry.subject,
        score=entry.score,
        date=datetime.utcnow(),
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

@router.get("/")
def get_history(email: str, db: Session = Depends(get_db)):
    items = db.query(QuizHistory).filter(QuizHistory.email == email).all()
    if not items:
        return []
    return items

@router.get("/stats")
def get_stats(email: str = Query(...), db: Session = Depends(get_db)):
    avg_scores = (
        db.query(QuizHistory.subject, func.avg(QuizHistory.score))
        .filter(QuizHistory.email == email)
        .group_by(QuizHistory.subject)
        .all()
    )

    quizzes_per_day = (
        db.query(func.date(QuizHistory.date), func.count(QuizHistory.id))
        .filter(QuizHistory.email == email)
        .group_by(func.date(QuizHistory.date))
        .all()
    )

    return {
        "avg_scores": {s: round(avg, 2) for s, avg in avg_scores},
        "quizzes_per_day": {str(d): c for d, c in quizzes_per_day},
    }