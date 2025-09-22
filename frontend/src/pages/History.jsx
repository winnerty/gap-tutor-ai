function History() {
  const quizHistory = [
    { subject: "Biology", score: 60, date: "2025-09-21" },
    { subject: "Python", score: 85, date: "2025-09-20" }
  ];

  return (
    <div style={{ padding: "20px", flex: 1 }}>
      <h2>Quiz History</h2>
      {quizHistory.map((q, index) => (
        <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <p>Subject: {q.subject}</p>
          <p>Date: {q.date}</p>
          <p>Score: {q.score}%</p>
        </div>
      ))}
    </div>
  );
}

export default History;