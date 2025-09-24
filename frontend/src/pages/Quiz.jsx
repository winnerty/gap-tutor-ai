import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";

function Quiz() {
  const navigate = useNavigate();

  const quizQuestions = [
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome"],
      answer: "Mitochondria",
    },
    {
      question: "Which macromolecule stores genetic info?",
      options: ["Carbohydrates", "DNA", "Lipids"],
      answer: "DNA",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const addToHistory = async (result) => {
    const email = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).sub; 
    
    await fetch("http://localhost:8000/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject: "Python",
        score: result,
      }),
    });
  };

  const handleAnswer = (selected) => {
    if (selected === quizQuestions[current].answer) {
      setScore((prev) => prev + 1);
    }
    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      addToHistory(score + (selected === quizQuestions[current].answer ? 1 : 0));
    }
  };

  const handleExit = () => {
    addToHistory(score);
    navigate("/dashboard");
  };

  if (finished) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <h2>Quiz Finished</h2>
        <p>
          Your score: {score}/{quizQuestions.length}
        </p>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <QuizCard
          question={quizQuestions[current].question}
          options={quizQuestions[current].options}
          onAnswer={handleAnswer}
        />
        <button
          onClick={handleExit}
          style={{
            marginTop: "20px",
            background: "red",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Exit Quiz
        </button>
      </div>
    </div>
  );
}

export default Quiz;