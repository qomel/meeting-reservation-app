import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel użytkownika</h1>
        <button onClick={handleLogout} className="text-red-600 underline">
          Wyloguj się
        </button>
      </div>

      <Link to="/meetings" className="text-blue-500 underline">
        Zarządzaj spotkaniami →
      </Link>
      <Link to="/calendar" className="text-blue-500 underline block mt-2">
        Zobacz kalendarz spotkań →
      </Link>
    </div>
  );
}
