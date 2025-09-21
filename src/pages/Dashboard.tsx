import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Welcome to my dashboard 🎉</h2>
      <button onClick={handleLogout} className="btn">Logout</button>
    </div>
  );
};

export default Dashboard;
