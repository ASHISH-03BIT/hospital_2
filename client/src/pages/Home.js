import { useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <main className="main-content">
        {!token ? (
          <div className="hero-section">
            <h1 className="hero-title">Hospital Management System</h1>
            <p className="hero-subtitle">
              A modern, secure, and efficient platform to manage patient records,
              appointments, and hospital operations seamlessly.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                className="btn-primary"
                onClick={() => navigate("/login")}
                style={{ width: "auto", padding: "1rem 2rem" }}
              >
                Login to Portal
              </button>
              <button
                className="btn-primary"
                onClick={() => navigate("/signup")}
                style={{
                  width: "auto",
                  padding: "1rem 2rem",
                  background: "transparent",
                  border: "1px solid var(--primary-color)",
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card dashboard-card">
            <div className="dashboard-header">
              <h2>Dashboard Overview</h2>
              <span className="user-badge">
                <span style={{ marginRight: "0.5rem" }}>●</span> Authenticated
              </span>
            </div>
            
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Welcome back to the Hospital Management System. You now have secure access
                to manage patient records, view appointments, and handle hospital administration.
              </p>
            </div>

            <button className="btn-primary" onClick={handleLogout}>
              Secure Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
