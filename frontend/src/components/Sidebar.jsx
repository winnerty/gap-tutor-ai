import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "200px", minHeight: "100vh", borderRight: "1px solid #ddd", padding: "20px" }}>
      <h2>GapTutor</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;