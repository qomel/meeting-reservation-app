// src/pages/MeetingDetailsPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Meeting {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  createdBy: string;
  createdAt: string;
  status: 'scheduled' | 'canceled';
}

export default function MeetingDetailsPage() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/meetings/${id}`)
      .then((res) => res.json())
      .then(setMeeting);
  }, [id]);

  if (!meeting) return <p>Ładowanie danych spotkania...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{meeting.title}</h1>
      <p className="text-sm mb-2">{meeting.description}</p>
      <p>📅 {meeting.date}</p>
      <p>
        ⏰ {meeting.startTime} - {meeting.endTime}
      </p>
      <p>👥 Uczestnicy: {meeting.participants.join(', ') || 'Brak'}</p>
      <p>🧑‍💻 Twórca: {meeting.createdBy}</p>
      <p>📌 Status: {meeting.status}</p>
    </div>
  );
}
