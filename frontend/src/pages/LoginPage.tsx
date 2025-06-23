import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/users?email=${email}`);
      if (!res.ok) {
        setError("Błąd połączenia z serwerem.");
        return;
      }

      const users = await res.json();
      const user = users.find((u: any) => u.password === password);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/meetings");
      } else {
        setError("Nieprawidłowy email lub hasło.");
      }
    } catch (err) {
      console.error("Błąd logowania:", err);
      setError("Wystąpił błąd podczas logowania.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-100 p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Logowanie</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Zaloguj się
        </button>
      </form>
      {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
    </div>
  );
}
