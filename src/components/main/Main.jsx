import "./main.css";

import Aside from "../aside/Aside";
import EventsCalendar from "../eventsCalendar/EventsCalendar";

export default function Main() {
  return (
    <main className="main" style={{ height: "100%" }}>
      <div className="container">
        <Aside />
        <EventsCalendar />
      </div>
    </main>
  );
}
