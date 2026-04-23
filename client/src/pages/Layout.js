import { Link, useNavigate } from "react-router-dom";
import { getStoredUser, logout } from "../services/authService";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>College Lost & Found</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/lost-items">Lost Items</Link>
          <Link to="/found-items">Found Items</Link>
          <Link to="/lost-items/new">Report Lost</Link>
          <Link to="/found-items/new">Report Found</Link>
        </nav>
        <div className="topbar-right">
          <span>{user?.name || "Student"}</span>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main className="page-content">{children}</main>
    </div>
  );
};

export default Layout;
