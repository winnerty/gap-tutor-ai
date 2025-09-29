import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

function History() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  const loadData = async () => {
    if (!token) return;
    const email = JSON.parse(atob(token.split(".")[1])).sub;

    try {
      const resHistory = await fetch(
        `http://localhost:8000/history/?email=${email}`
      );
      const dataHistory = await resHistory.json();
      setHistory(dataHistory);

      const resStats = await fetch(
        `http://localhost:8000/history/stats?email=${email}`
      );
      const dataStats = await resStats.json();
      setStats(dataStats);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("historyUpdated", loadData);
    return () => window.removeEventListener("historyUpdated", loadData);
  }, [token]);

  if (!token) {
    return (
      <div style={{ padding: 20, flex: 1 }}>
        <h2>History</h2>
        <p style={{ color: "gray" }}>⚠️ Please sign in to see your history.</p>
      </div>
    );
  }

  const quizzesPerDay = stats ? stats.quizzes_per_day : {};
  const today = new Date();
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0]; 
    days.push({
      date: key,
      count: quizzesPerDay[key] || 0,
    });
  }

  const getColor = (count) => {
    if (count === 0) return "#eee";
    if (count === 1) return "#c6f6d5";
    if (count === 2) return "#68d391";
    if (count === 3) return "#38a169";
    return "#22543d";
  };

  const subjectStats = stats
    ? Object.entries(stats.avg_scores).map(([s, avg]) => ({
        subject: s,
        avg,
      }))
    : [];

  return (
    <div style={{ padding: 20, flex: 1 }}>
      <h2>History</h2>

      {history.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ) : (
        <ul>
          {history.map((h, i) => (
            <li key={i}>
              {new Date(h.date).toLocaleString()} <strong>{h.subject}</strong>: {h.score}/5
            </li>
          ))}
        </ul>
      )}

      {stats && (
        <div style={{ marginTop: 40 }}>
          <h3>📊 Quiz activity (last 30 days)</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(30, 1fr)",
              gap: "3px",
              marginTop: "10px",
            }}
          >
            {days.map((d, i) => (
              <div
                key={i}
                title={`${d.date}: ${d.count}`}
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: getColor(d.count),
                  borderRadius: "3px",
                }}
              />
            ))}
          </div>

          <h3 style={{ marginTop: 30 }}>📚 Average score per subject</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 5]} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg" fill="#16a34a">
                <LabelList
                  dataKey="avg"
                  position="top"
                  formatter={(val) => `${val.toFixed(1)}/5`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default History;