import "./eventsCalendar.css";

import Event from "../event/Event";
import EventInformationModal from "../eventModals/EventInformationModal";
import CreateEventModal from "../eventModals/CreateEventModal";
import EditEventModal from "../eventModals/EditEventModal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { openModal } from "../../redux/modalsSlice";

import {
  formatDateToYMD,
  generateTimeOptions,
  generateTimesForEventCalendar,
} from "../../utils/helpers";

const times = generateTimesForEventCalendar();
const timeOptions = generateTimeOptions();

export default function EventsCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const currentDate = new Date();

  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals);
  const calendars = useSelector((state) => state.calendars.calendars);
  const eventCalendar = useSelector((state) => state.eventCalendar);

  const calendarsOption = calendars.map((calendar) => ({
    id: calendar.id,
    title: calendar.title,
    color: calendar.color,
  }));

  const [eventsToRender, setEventsToRender] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    date: formatDateToYMD(currentDate),
    start: timeOptions[0],
    end: timeOptions[0],
    allDay: false,
    repeat: "Does not repeat",
    calendar: calendarsOption[0] || {},
    description: "",
  });

  function resetFormFields() {
    setEventData((prev) => ({
      ...prev,
      title: "",
      date: formatDateToYMD(currentDate),
      start: timeOptions[0],
      end: timeOptions[0],
      allDay: false,
      repeat: "Does not repeat",
      calendar: calendarsOption[0] || {},
      description: "",
    }));
  }

  useEffect(() => {
    const newEvent = [];

    calendars.forEach((calendar) => {
      if (calendar.isActive) {
        calendar.events.forEach((event) => {
          if (
            event.date === formatDateToYMD(new Date(eventCalendar.currentDate))
          ) {
            newEvent.push(event);
          }
        });
      }
    });
    setEventsToRender(newEvent);
  }, [calendars, eventCalendar.currentDate]);

  useEffect(() => {
    if (isEditing && selectedEvent) {
      const findedCalendar = calendarsOption.find(
        (calendar) => calendar.id === selectedEvent.calendarId
      );

      setEventData((prev) => ({
        ...prev,
        title: selectedEvent.title,
        date: formatDateToYMD(new Date(selectedEvent.date)),
        start: selectedEvent.start,
        end: selectedEvent.end,
        allDay: selectedEvent.allDay,
        repeat: selectedEvent.repeat,
        calendar: findedCalendar || calendarsOption[0],
        description: selectedEvent.description,
      }));
    }
  }, [isEditing, selectedEvent]);

  return (
    <div
      className="events-calendar"
      style={{ height: window.innerHeight - 112 }}
    >
      <div className="event-calendar-header">
        <div className="calendar-day-container">
          <div className="calendar-day">
            <p className="numberOfMonth">
              {new Date(eventCalendar.currentDate).getDate()}
            </p>
            <p className="dayOfWeek">
              {String(
                new Date(eventCalendar.currentDate)
                  .toLocaleDateString("en-US", {
                    weekday: "long",
                  })
                  .toUpperCase()
              ).slice(0, 3)}
            </p>
          </div>
          {calendars.map((calendar) =>
            calendar.isActive
              ? calendar.events
                  .filter((event) => {
                    return (
                      event.allDay &&
                      event.date ===
                        formatDateToYMD(new Date(eventCalendar.currentDate))
                    );
                  })
                  .map((event) => (
                    <Event
                      {...event}
                      key={event.eventId || event.id}
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEditing(false);
                        dispatch(openModal({ modalName: "eventModal" }));
                      }}
                    />
                  ))
              : []
          )}
        </div>
      </div>
      <div className="event-calendar-hour-body-container">
        <div className="time-container">
          {times.map((time) => {
            return (
              <div key={time} className="calendar-hour">
                {time}
              </div>
            );
          })}
        </div>
        <div className="event-calendar-body">
          {times.map((time) => {
            return <div key={time} className="event-calendar-row"></div>;
          })}
          {eventsToRender.map(
            (event) =>
              !event.allDay && (
                <Event
                  key={event.eventId}
                  {...event}
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsEditing(false);
                    dispatch(openModal({ modalName: "eventModal" }));
                  }}
                />
              )
          )}
        </div>
      </div>
      {/* Create event modal */}
      {modals.eventModal.isOpen && selectedEvent === null && !isEditing && (
        <CreateEventModal
          eventData={eventData}
          setEventData={setEventData}
          resetFormFields={resetFormFields}
        />
      )}
      {/* Event information modal */}
      {modals.eventModal.isOpen && selectedEvent !== null && !isEditing && (
        <EventInformationModal
          selectedEvent={selectedEvent}
          setIsEditing={setIsEditing}
          setSelectedEvent={setSelectedEvent}
        />
      )}
      {/* Edit event modal */}
      {modals.eventModal.isOpen && selectedEvent !== null && isEditing && (
        <EditEventModal
          eventData={eventData}
          setEventData={setEventData}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          setIsEditing={setIsEditing}
          resetFormFields={resetFormFields}
        />
      )}
    </div>
  );
}
