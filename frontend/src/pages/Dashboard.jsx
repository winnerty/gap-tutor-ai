import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  
  const subjects = [
    { name: "Biology", level: "Medium", recommendedQuiz: "Cell Structure" },
    { name: "Python", level: "Low", recommendedQuiz: "Loops Basics" }
  ];

  return (
    <div style={{ padding: "20px", flex: 1 }}>
      <h2>Dashboard</h2>
      {subjects.map((s, index) => (
        <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <h3>{s.name}</h3>
          <p>Knowledge Level: {s.level}</p>
          <p>Recommended Quiz: {s.recommendedQuiz}</p>
          <button onClick={() => navigate("/quiz")}>Start</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;