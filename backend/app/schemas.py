from pydantic import BaseModel, EmailStr, constr

class SignupRequest(BaseModel):
    #email: EmailStr
    #password: constr(min_length=8)
    email: str
    password: str

class HistoryCreate(BaseModel):
    email: str
    subject: str
    score: int

class UserUpdate(BaseModel):
    age: int | None = None
    country: str | None = None
    university: str | None = None