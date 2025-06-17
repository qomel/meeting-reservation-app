import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MeetingsPage from './pages/MeetingsPage';
import RequireAuth from './components/RequireAuth';
import CalendarView from './components/CalendarView';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Publiczne */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Chronione */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/calendar" element={<CalendarView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
