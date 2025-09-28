import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuizCard from "../components/QuizCard";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizQuestions = location.state?.quiz || [];
  const subject = location.state?.subject || "Unknown";

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const addToHistory = async (result) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const email = JSON.parse(atob(token.split(".")[1])).sub;

      await fetch("http://localhost:8000/history/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject,
          score: result,
        }),
      });
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  };

  const handleAnswer = (option) => {
    setSelected(option);
    setShowAnswer(true);

    const isCorrect = option === quizQuestions[current]?.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      setSelected(null);
      setShowAnswer(false);
      if (current + 1 < quizQuestions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        addToHistory(finalScore);
      }
    }, 1500);
  };

  const handleExit = () => {
    addToHistory(score);
    navigate("/dashboard");
  };

  if (quizQuestions.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>No quiz data available</h2>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

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

  const progress = ((current + 1) / quizQuestions.length) * 100;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px", textAlign: "center" }}>
        <div style={{ marginBottom: "20px" }}>
          <p>
            Question {current + 1} out of {quizQuestions.length}
          </p>
          <div
            style={{
              height: "10px",
              width: "100%",
              background: "#eee",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#2563eb",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        <QuizCard
          question={quizQuestions[current]?.question || ""}
          options={quizQuestions[current]?.options || []}
          answer={quizQuestions[current]?.answer}
          selected={selected}
          showAnswer={showAnswer}
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