import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Meeting {
  id: number;
  title: string;
  date: string;
  status: string;
  participants: string[];
}

export default function Dashboard() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/meetings')
      .then((res) => res.json())
      .then(setMeetings);
  }, []);

  const total = meetings.length;
  const scheduled = meetings.filter((m) => m.status === 'scheduled').length;
  const canceled = meetings.filter((m) => m.status === 'canceled').length;

  const uniqueParticipants = new Set(
    meetings.flatMap((m) => m.participants.map((p) => p.toLowerCase())),
  );

  const chartData = Object.values(
    meetings.reduce(
      (acc, m) => {
        const day = m.date;
        acc[day] = acc[day] || { date: day, count: 0 };
        acc[day].count += 1;
        return acc;
      },
      {} as Record<string, { date: string; count: number }>,
    ),
  ).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Panel Administratora</h1>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Wszystkich spotkań</h2>
          <p className="text-3xl">{total}</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Zaplanowane / Anulowane</h2>
          <p className="text-3xl">
            {scheduled} / {canceled}
          </p>
        </div>
        <div className="p-6 bg-white rounded shadow col-span-2">
          <h2 className="text-xl font-semibold">Unikalni uczestnicy</h2>
          <p className="text-2xl">{uniqueParticipants.size}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Spotkania wg daty</h2>
      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
