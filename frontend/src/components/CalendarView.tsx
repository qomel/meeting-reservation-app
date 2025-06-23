import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';

interface Meeting {
  id: number;
  title: string;
  date: string;
  status: 'scheduled' | 'canceled';
}

export default function CalendarView() {
  const [events, setEvents] = useState<{ title: string; date: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/meetings')
      .then((res) => res.json())
      .then((data: Meeting[]) => {
        const mapped = data
          .filter((m) => m.status !== 'canceled')
          .map((m) => ({
            title: m.title,
            date: m.date,
          }));
        setEvents(mapped);
      });
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Kalendarz spotkań</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale="pl"
        height="auto"
      />
    </div>
  );
}
