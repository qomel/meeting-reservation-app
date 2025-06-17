import { useEffect, useState } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleDelete = async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Na pewno chcesz usunąć tego użytkownika?')) return;

    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const toggleRole = async (user: User) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';

    const res = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });

    if (res.ok) {
      const updated = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Panel Administratora</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 border rounded shadow bg-white">
            <p>
              <strong>
                {user.firstName} {user.lastName}
              </strong>{' '}
              – {user.email} ({user.role})
            </p>
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => toggleRole(user)}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Zmień rolę na {user.role === 'admin' ? 'user' : 'admin'}
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
