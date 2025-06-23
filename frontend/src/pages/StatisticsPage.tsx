import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Meeting {
  id: number;
  date: string;
  status: 'scheduled' | 'canceled';
}

export default function StatisticsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/meetings')
      .then((res) => res.json())
      .then(setMeetings);
  }, []);

  const total = meetings.length;
  const scheduled = meetings.filter((m) => m.status === 'scheduled').length;
  const canceled = meetings.filter((m) => m.status === 'canceled').length;

  const grouped = meetings.reduce<Record<string, number>>((acc, m) => {
    if (m.status === 'canceled') return acc;
    acc[m.date] = (acc[m.date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([date, count]) => ({ date, count }));

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Statystyki Spotkań</h1>

      <p>🟢 Łącznie spotkań: {total}</p>
      <p>📅 Zaplanowane: {scheduled}</p>
      <p>❌ Anulowane: {canceled}</p>

      <h2 className="text-xl font-bold mt-6 mb-2">Liczba spotkań dziennie</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
