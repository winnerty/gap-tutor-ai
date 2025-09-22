function Account() {
  const subjects = ["Biology", "Geometry", "Python"];
  return (
    <div style={{ padding: "20px", flex: 1 }}>
      <h2>Account</h2>
      <div>
        <h3>Personal Info</h3>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </div>
      <div>
        <h3>Your Subjects</h3>
        <ul>
          {subjects.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default Account;