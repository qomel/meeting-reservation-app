import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import MeetingsPage from "./pages/MeetingsPage";
import RequireAuth from "./components/RequireAuth";
import CalendarView from "./components/CalendarView";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect, useState } from "react";
import StatisticsPage from "./pages/StatisticsPage";
import ThemeToggle from "./components/ThemeToggle";
import MeetingDetailsPage from "./pages/MeetingDetailsPage";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);
  return (
    <>
      <ThemeToggle />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <Routes>
          {/* Publiczne */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Chronione */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meetings" element={<MeetingsPage />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/meetings/:id" element={<MeetingDetailsPage />} />
          </Route>

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/stats" element={<StatisticsPage />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
