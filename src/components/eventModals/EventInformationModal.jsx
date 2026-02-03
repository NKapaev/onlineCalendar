import "./eventModal.css";

import Modal from "../ui/modal/Modal";
import Button from "../ui/button/Button";

import { getCalendarById } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../redux/modalsSlice";

export default function EventInformationModal({
  selectedEvent,
  setIsEditing,
  setSelectedEvent,
}) {
  const dispatch = useDispatch();
  const calendars = useSelector((state) => state.calendars.calendars);

  return (
    <Modal
      className="event-modal"
      modalTitle={"Event Information"}
      onClose={() => {
        dispatch(closeModal({ modalName: "eventModal" }));
        setSelectedEvent(null);
        setIsEditing(false);
      }}
    >
      <div className="additional-buttons-container">
        <Button
          onClick={() => setIsEditing(true)}
          className="additional-button"
          variant="transparent"
          icon="./icons/edit.svg#edit"
          iconStroke="transparent"
        />
        <Button
          onClick={() => {
            dispatch(
              openModal({
                modalName: "confirmModal",
                id: selectedEvent.eventId,
                entityType: "event",
              })
            );
            dispatch(closeModal({ modalName: "eventModal" }));
            setSelectedEvent(null);
            setIsEditing(false);
          }}
          className="additional-button"
          variant="transparent"
          icon="./icons/trash.svg#trash"
          iconFill="#323749"
          iconStroke="#323749"
        />
      </div>

      <div className="event-details">
        <div className="modal-field-container">
          <img className="field-icon" src="./icons/title.svg" alt="Title icon" />
          <p>{selectedEvent.title}</p>
        </div>
        <div className="modal-field-container">
          <img className="field-icon" src="./icons/clock.svg" alt="Title icon" />
          <p>
            {`${new Date(selectedEvent.date).toLocaleDateString("en-Us", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })},
                ${!selectedEvent.allDay
                ? `${selectedEvent.start} - ${selectedEvent.end},`
                : ""
              }
                 ${selectedEvent.allDay === true ? "All day," : ""} ${selectedEvent.repeat
              }`}
          </p>
        </div>
        <div className="modal-field-container">
          <img
            className="field-icon"
            src="./icons/calendar.svg"
            alt="Title icon"
          />
          <div className="event-calendar-information">
            <div
              className="event-calendar-icon"
              style={{
                backgroundColor: getCalendarById(
                  calendars,
                  selectedEvent.calendarId
                ).color,
              }}
            ></div>
            <p>{getCalendarById(calendars, selectedEvent.calendarId).title}</p>
          </div>
        </div>
        <div className="modal-field-container">
          <img
            className="field-icon"
            src="./icons/description.svg"
            alt="Title icon"
          />
          <p>{selectedEvent.description}</p>
        </div>
      </div>
    </Modal>
  );
}
