import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Meeting {
  id: number;
  date: string;
  status: 'scheduled' | 'canceled';
}

export default function StatisticsPage() {
  const [data, setData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/meetings')
      .then((res) => res.json())
      .then((meetings: Meeting[]) => {
        const grouped = meetings.reduce<Record<string, number>>((acc, m) => {
          acc[m.date] = (acc[m.date] || 0) + 1;
          return acc;
        }, {});

        const result = Object.entries(grouped).map(([date, count]) => ({ date, count }));
        setData(result);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Statystyki Spotkań</h1>
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
