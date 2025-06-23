import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Meeting {
  id?: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  createdBy: string;
  status: "scheduled" | "canceled";
  createdAt: string;
}

export default function MeetingsPage() {
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [newMeeting, setNewMeeting] = useState<Omit<Meeting, "id">>({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: [],
    createdBy: "",
    status: "scheduled",
    createdAt: new Date().toISOString(),
  });

  const [filterTitle, setFilterTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "scheduled" | "canceled"
  >("all");
  const [sortBy, setSortBy] = useState<"date" | "createdAt">("date");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    fetch("http://localhost:5000/meetings")
      .then((res) => res.json())
      .then((data: Meeting[]) => {
        if (currentUser.role !== "admin") {
          data = data.filter((m) => m.createdBy === currentUser.email);
        }
        setMeetings(data);
      });
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const meetingToSend = {
      ...newMeeting,
      createdBy: user.email,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:5000/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetingToSend),
    });

    if (res.ok) {
      const created = await res.json();
      setMeetings((prev) => [...prev, created]);
      setNewMeeting({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        participants: [],
        createdBy: "",
        status: "scheduled",
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMeeting) return;

    const res = await fetch(
      `http://localhost:5000/meetings/${editingMeeting.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMeeting),
      }
    );

    if (res.ok) {
      const updated = await res.json();
      setMeetings((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m))
      );
      setEditingMeeting(null);
    }
  };

  const cancelMeeting = async (id: number) => {
    const res = await fetch(`http://localhost:5000/meetings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "canceled" }),
    });

    if (res.ok) {
      const updated = await res.json();
      setMeetings((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m))
      );
    }
  };

  const filteredMeetings = meetings
    .filter(
      (m) =>
        m.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        (!filterDate || m.date === filterDate)
    )
    .filter((m) => filterStatus === "all" || m.status === filterStatus)
    .sort((a, b) => {
      const aVal = sortBy === "date" ? new Date(a.date) : new Date(a.createdAt);
      const bVal = sortBy === "date" ? new Date(b.date) : new Date(b.createdAt);
      return sortOrder === "asc"
        ? aVal.getTime() - bVal.getTime()
        : bVal.getTime() - aVal.getTime();
    });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Spotkania</h1>

      <form onSubmit={handleCreate} className="grid gap-2 mb-6 max-w-md">
        <input
          className="p-2 border rounded"
          placeholder="Tytuł"
          value={newMeeting.title}
          onChange={(e) =>
            setNewMeeting({ ...newMeeting, title: e.target.value })
          }
          required
        />
        <input
          className="p-2 border rounded"
          placeholder="Opis"
          value={newMeeting.description}
          onChange={(e) =>
            setNewMeeting({ ...newMeeting, description: e.target.value })
          }
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={newMeeting.date}
          onChange={(e) =>
            setNewMeeting({ ...newMeeting, date: e.target.value })
          }
          required
        />
        <input
          type="time"
          className="p-2 border rounded"
          value={newMeeting.startTime}
          onChange={(e) =>
            setNewMeeting({ ...newMeeting, startTime: e.target.value })
          }
          required
        />
        <input
          type="time"
          className="p-2 border rounded"
          value={newMeeting.endTime}
          onChange={(e) =>
            setNewMeeting({ ...newMeeting, endTime: e.target.value })
          }
          required
        />
        <input
          className="p-2 border rounded"
          placeholder="Uczestnicy (emaile oddzielone przecinkami)"
          onChange={(e) =>
            setNewMeeting({
              ...newMeeting,
              participants: e.target.value.split(",").map((p) => p.trim()),
            })
          }
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Dodaj spotkanie
        </button>
      </form>

      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Filtruj po tytule..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sortuj: {sortOrder === "asc" ? "↑ rosnąco" : "↓ malejąco"}
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="all">Wszystkie</option>
          <option value="scheduled">Tylko zaplanowane</option>
          <option value="canceled">Tylko anulowane</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="date">Sortuj wg daty</option>
          <option value="createdAt">Sortuj wg utworzenia</option>
        </select>
      </div>

      <ul>
        {filteredMeetings.map((m) => (
          <li key={m.id} className="p-4 border rounded shadow mb-2">
            <Link
              to={`/meetings/${m.id}`}
              className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800"
            >
              {m.title}
            </Link>{" "}
            – {m.date} {m.startTime}–{m.endTime}
            <br />
            <small>Status: {m.status}</small>
            <br />
            <small>Utworzył: {m.createdBy}</small>
            <br />
            {JSON.parse(localStorage.getItem("user") || "{}")?.role ===
              "admin" && (
              <>
                <button
                  onClick={() => setEditingMeeting(m)}
                  className="text-sm text-blue-600 underline mt-1"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => cancelMeeting(m.id!)}
                  className="text-sm text-red-600 underline ml-2"
                >
                  Anuluj
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {editingMeeting && (
        <form
          onSubmit={handleUpdate}
          className="mt-6 p-4 border rounded max-w-md"
        >
          <h3 className="text-xl font-bold mb-4">Edytuj spotkanie</h3>
          <input
            className="w-full p-2 border rounded mb-2"
            value={editingMeeting.title}
            onChange={(e) =>
              setEditingMeeting({ ...editingMeeting, title: e.target.value })
            }
          />
          <input
            className="w-full p-2 border rounded mb-2"
            value={editingMeeting.description}
            onChange={(e) =>
              setEditingMeeting({
                ...editingMeeting,
                description: e.target.value,
              })
            }
          />
          <input
            type="date"
            className="w-full p-2 border rounded mb-2"
            value={editingMeeting.date}
            onChange={(e) =>
              setEditingMeeting({ ...editingMeeting, date: e.target.value })
            }
          />
          <input
            type="time"
            className="w-full p-2 border rounded mb-2"
            value={editingMeeting.startTime}
            onChange={(e) =>
              setEditingMeeting({
                ...editingMeeting,
                startTime: e.target.value,
              })
            }
          />
          <input
            type="time"
            className="w-full p-2 border rounded mb-4"
            value={editingMeeting.endTime}
            onChange={(e) =>
              setEditingMeeting({ ...editingMeeting, endTime: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Zapisz zmiany
          </button>
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setEditingMeeting(null)}
          >
            Anuluj
          </button>
        </form>
      )}
    </div>
  );
}
