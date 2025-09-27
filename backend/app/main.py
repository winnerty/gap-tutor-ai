from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import auth, history, ai
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(history.router, prefix="/history", tags=["history"])
app.include_router(ai.router, prefix="/ai", tags=["ai"])

@app.get("/")
def root():
    return {"msg": "Backend is working"}