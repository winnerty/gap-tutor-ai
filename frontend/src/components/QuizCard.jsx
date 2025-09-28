function QuizCard({ question, options, answer, selected, showAnswer, onAnswer }) {
  return (
    <div>
      <h3>{question}</h3>
      {options.map((o, i) => {
        let bg = "#eee";
        if (showAnswer) {
          if (o === answer) bg = "green";
          else if (o === selected) bg = "red";
        }
        return (
          <button
            key={i}
            onClick={() => !showAnswer && onAnswer(o)}
            style={{
              display: "block",
              width: "100%",
              margin: "8px 0",
              padding: "10px",
              background: bg,
              color:
                showAnswer && (o === answer || o === selected)
                  ? "white"
                  : "black",
              border: "none",
              borderRadius: "6px",
              cursor: showAnswer ? "default" : "pointer",
            }}
          >
            {o}
          </button>
        );
      })}
      {showAnswer}
    </div>
  );
}

export default QuizCard;