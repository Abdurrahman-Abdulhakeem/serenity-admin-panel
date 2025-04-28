import { useEffect, useState } from "react";
import { useGetAppointmentsQuery } from "@/redux/features/appointmentApi";
import {
  Calendar,
  dateFnsLocalizer,
  View as BigCalendarView,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Appointment } from "@/types/appointment";
import { colors } from "./StatusBadge";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  status: "approved" | "pending" | "cancelled" | "completed" | string;
}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { data, isLoading } = useGetAppointmentsQuery({});
  const [view, setView] = useState<"month" | "week" | "agenda">("month");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    if (data) {
      const mappedEvents = data.docs.map((appointment: Appointment) => ({
        title: appointment.patientName,
        start: new Date(appointment.date),
        end: new Date(new Date(appointment.date).getTime() + 30 * 60 * 1000), // 30 minutes duration
        status: appointment.status,
      }));
      setEvents(mappedEvents);
    }
  }, [data]);

  const handleViewChange = (newView: BigCalendarView) => {
    const validViews: ("month" | "week" | "agenda")[] = [
      "month",
      "week",
      "agenda",
    ];

    // Ensure the view is a valid one, otherwise fall back to default (month)
    if (validViews.includes(newView as "month" | "week" | "agenda")) {
      setView(newView as "month" | "week" | "agenda"); // Set the new view
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Appointments Calendar</h1>
      <div className="mt-6">
        {isLoading ? (
          <p>Loading calendar...</p>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            view={view} // Controlled view
            onView={handleViewChange} // Update the view when a button is clicked
            date={date} // Pass the current date
            onNavigate={(newDate) => setDate(newDate)} // Handle navigation
            toolbar={true}
            views={["month", "week", "agenda"]}
            eventPropGetter={(event: CalendarEvent) => {
              const statusClass = colors[event.status as keyof typeof colors];

              return {
                className: `rounded p-2`,
                style: {
                  ...statusClass,
                },
              };
            }}
          />
        )}
      </div>
    </div>
  );
}
