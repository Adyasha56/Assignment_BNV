import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const Navbar = ({ isDashboard }) => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#15173D] text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">
        User Management
      </Link>

      <div className="flex gap-3">
        {!token && (
          <Link to="/login">
            <Button variant="outline">Admin Login</Button>
          </Link>
        )}

        {token && isDashboard && (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;