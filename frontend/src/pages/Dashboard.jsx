import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("subjects");
    return saved
      ? JSON.parse(saved)
      : [
          { name: "Biology", level: "Medium", recommendedQuiz: "Cell Structure" },
          { name: "Python", level: "Low", recommendedQuiz: "Loops Basics" },
        ];
  });

  const [newSubject, setNewSubject] = useState("");
  const [newQuiz, setNewQuiz] = useState("");

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!newSubject.trim()) return;
    setSubjects([
      ...subjects,
      { name: newSubject, level: "Low", recommendedQuiz: newQuiz || "Introduction" },
    ]);
    setNewSubject("");
    setNewQuiz("");
  };

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  if (!token) {
    return (
      <div style={{ padding: 20, flex: 1 }}>
        <h2>Dashboard</h2>
        <p style={{ color: "gray" }}>⚠️ Please sign in to see your subjects.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, flex: 1 }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Subject name"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          style={{
            marginRight: 10,
            padding: "14px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Recommended quiz"
          value={newQuiz}
          onChange={(e) => setNewQuiz(e.target.value)}
          style={{
            marginRight: 10,
            padding: "14px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addSubject}
          style={{
            padding: "14px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#16a34a",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {subjects.map((s, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
            backgroundColor: "white",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h3>{s.name}</h3>
          <p>Knowledge Level: {s.level}</p>
          <p>Recommended Quiz: {s.recommendedQuiz}</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => navigate("/quiz")}
              style={{
                padding: "10px 16px",
                borderRadius: "6px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
              }}
            >
              Start
            </button>
            <button
              onClick={() => removeSubject(index)}
              style={{
                padding: "10px 16px",
                borderRadius: "6px",
                border: "none",
                background: "red",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;