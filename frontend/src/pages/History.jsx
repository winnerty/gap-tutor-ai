import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
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

  return (
    <div style={{ padding: 20, flex: 1 }}>
      <h2>History</h2>

      {history.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ) : (
        <ul>
          {history.map((h, i) => (
            <li key={i}>
              {new Date(h.date).toLocaleString()} — {h.subject}: {h.score}
            </li>
          ))}
        </ul>
      )}

      {stats && (
        <div style={{ marginTop: 40 }}>
          <h3>📊 Quiz activity per day</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={Object.entries(stats.quizzes_per_day).map(([d, c]) => ({
                date: d,
                count: c,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>

          <h3 style={{ marginTop: 30 }}>📚 Average score per subject</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={Object.entries(stats.avg_scores).map(([s, avg]) => ({
                subject: s,
                avg,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default History;