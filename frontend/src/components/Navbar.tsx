// frontend/src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="font-bold text-lg">
        <Link to="/" className="hover:underline">
          Meeting App
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/meetings" className="hover:underline">
          Spotkania
        </Link>
        <Link to="/calendar" className="hover:underline">
          Kalendarz
        </Link>
        <Link to="/statistics" className="hover:underline">
          Statystyki
        </Link>
        {user.role === "admin" && (
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
        >
          Wyloguj się
        </button>
      </div>
    </nav>
  );
}
