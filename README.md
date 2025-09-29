# GapTutor

## Requirements
- Python 3.10+
- Node.js 18+
- npm

## AI model setup
- add your AI model to the ```backend/models``` folder
- Update ```MODEL_PATH``` variable in the ```backend/app/ai.py``` file

## Backend setup
```cd backend```   
```pip install -r requirements.txt```   
```uvicorn app.main:app --reload --port 8000```

## Frontend setup (separate terminal)
```cd frontend```   
```npm install```  
```npm run dev```

## Result
Go to ```localhost:5173```

---

## Idea
GapTutor is an AI-powered chatbot designed to identify knowledge gaps in students' understanding and provide personalized learning strategies to address them.

Most AI tutors only answer questions when prompted. GapTutor goes further:
1. Diagnoses weak areas through dialogue or quick tests.  
2. Builds a personalized study plan with priorities.  
3. Adapts explanations and exercises to the student's level.

## Why it matters
Students often struggle to see what they do not know.  
GapTutor makes these "blind spots" visible and helps focus learning efforts where they are most needed.  
The result is more efficient and effective studying.

## Features
- User authentication with securely hashed passwords.  
- Create subjects and generate quizzes on any chosen topic.  
- Take quizzes and receive instant feedback on correct/incorrect answers.  
- Quiz history stored in a database with detailed statistics (per subject averages, daily activity).