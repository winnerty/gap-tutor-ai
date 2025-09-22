import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/account" element={<Account />} />
            <Route path="/history" element={<History />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;