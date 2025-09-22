function QuizCard({ question, options, onAnswer }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", marginBottom: "20px" }}>
      <h3>{question}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {options.map((opt, index) => (
          <button key={index} onClick={() => onAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizCard;