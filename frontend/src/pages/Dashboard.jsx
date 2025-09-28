import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { generateQuizOnServer } from "../services/aiService";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("subjects");
    return saved
      ? JSON.parse(saved)
      : [
          { name: "Mathematics — Algebra", level: "Medium" },
          { name: "Python — Basics", level: "Low" },
        ];
  });

  const [newSubject, setNewSubject] = useState("");
  const [newTopic, setNewTopic] = useState("");

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!newSubject.trim() || !newTopic.trim()) return;
    const fullName = `${newSubject} — ${newTopic}`;
    setSubjects([...subjects, { name: fullName, level: "Unknown" }]);
    setNewSubject("");
    setNewTopic("");
  };

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const startQuiz = async (subject) => {
    try {
      const ai = await generateQuizOnServer(subject);
      navigate("/quiz", { state: { quiz: ai.questions, subject } });
    } catch (e) {
      console.error("AI generation failed:", e);
      alert("⚠️ Failed to generate quiz. Try again.");
    }
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
          placeholder="Subject (e.g. Mathematics)"
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
          placeholder="Topic (e.g. Trigonometry)"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {subjects.map((s, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "white",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{s.name}</h3>
            <p style={{ marginBottom: "16px" }}>
              Knowledge Level: {s.level}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => startQuiz(s.name)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
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
                  flex: 1,
                  padding: "8px 12px",
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
    </div>
  );
}

export default Dashboard;