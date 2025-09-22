import { useState } from "react";
import QuizCard from "../components/QuizCard";

function Quiz() {
  const quizQuestions = [
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome"], answer: "Mitochondria" },
    { question: "Which macromolecule stores genetic info?", options: ["Carbohydrates", "DNA", "Lipids"], answer: "DNA" }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (selected) => {
    if (selected === quizQuestions[current].answer) setScore(score + 1);
    if (current + 1 < quizQuestions.length) setCurrent(current + 1);
    else setFinished(true);
  };

  if (finished) {
    return <div>
      <h2>Quiz Finished</h2>
      <p>Your score: {score}/{quizQuestions.length}</p>
    </div>;
  }

  return (
    <div style={{ padding: "20px", flex: 1 }}>
      <QuizCard 
        question={quizQuestions[current].question} 
        options={quizQuestions[current].options} 
        onAnswer={handleAnswer} 
      />
    </div>
  );
}

export default Quiz;