import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Sprawdź, czy email już istnieje
    const check = await fetch(`http://localhost:5000/users?email=${form.email}`);
    const existing = await check.json();

    if (existing.length > 0) {
      alert('Użytkownik z takim emailem już istnieje!');
      return;
    }

    // Dodaj nowego użytkownika
    const res = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role: 'user',
        createdAt: new Date().toISOString(),
      }),
    });

    if (res.ok) {
      alert('Rejestracja zakończona sukcesem!');
    } else {
      alert('Coś poszło nie tak przy rejestracji.');
    }
  } catch (error) {
    console.error('Błąd sieci:', error);
    alert('Błąd połączenia z serwerem.');
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form onSubmit={handleRegister} className="bg-gray-100 p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Rejestracja</h2>
        <div className="flex gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="Imię"
            className="w-1/2 p-2 mb-3 border rounded"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nazwisko"
            className="w-1/2 p-2 mb-3 border rounded"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          className="w-full p-2 mb-4 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
