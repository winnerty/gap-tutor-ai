import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/auth";

function Account() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ age: "", country: "", university: "" });

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        await axios.post(`${API_URL}/signup`, { email, password });
        alert("User registered! Now sign in.");
        setIsSignUp(false);
      } else {
        const res = await axios.post(
          `${API_URL}/login`,
          new URLSearchParams({ username: email, password })
        );
        localStorage.setItem("token", res.data.access_token);
        setToken(res.data.access_token);
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const handleProfileUpdate = async () => {
  try {
    const updateData = {};
    if (profile.age) updateData.age = profile.age;
    if (profile.country) updateData.country = profile.country;
    if (profile.university) updateData.university = profile.university;

    const res = await axios.put(`${API_URL}/me`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUser(res.data.user);
    alert("Profile updated");
  } catch {
    alert("Failed to update profile");
  }
};


  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data))
        .catch(() => handleLogout());
    }
  }, [token]);

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            marginBottom: 15,
            width: "100%",
            padding: "16px 18px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            marginBottom: 20,
            width: "100%",
            padding: "16px 18px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSubmit}
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
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p
          style={{ cursor: "pointer", color: "blue", marginTop: 15 }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account? Sign In" : "No account? Sign Up"}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Account</h2>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Age:</b> {user?.age || "—"}</p>
      <p><b>Country:</b> {user?.country || "—"}</p>
      <p><b>University:</b> {user?.university || "—"}</p>

      <h3 style={{ marginTop: 20 }}>Edit Profile</h3>
      <input
        placeholder="Age"
        value={profile.age}
        onChange={(e) => setProfile({ ...profile, age: e.target.value })}
        style={{
          display: "block",
          marginBottom: 15,
          width: "100%",
          padding: "16px 18px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <input
        placeholder="Country"
        value={profile.country}
        onChange={(e) => setProfile({ ...profile, country: e.target.value })}
        style={{
          display: "block",
          marginBottom: 15,
          width: "100%",
          padding: "16px 18px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <input
        placeholder="University"
        value={profile.university}
        onChange={(e) =>
          setProfile({ ...profile, university: e.target.value })
        }
        style={{
          display: "block",
          marginBottom: 15,
          width: "100%",
          padding: "16px 18px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleProfileUpdate}
        style={{
          padding: "14px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Changes
      </button>
      <button
        onClick={handleLogout}
        style={{
          marginLeft: 10,
          padding: "14px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Account;