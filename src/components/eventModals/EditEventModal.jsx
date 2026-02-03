import "./eventModal.css";

import Modal from "../ui/modal/Modal";
import InputField from "../ui/inputField/InputField";
import DatePicker from "../ui/datePicker/DatePicker";
import Select from "../ui/select/Select";
import Checkbox from "../ui/checkbox/Checkbox";
import Dropdown from "../ui/dropdown/Dropdown";
import TextArea from "../ui/textArea/TextArea";
import Button from "../ui/button/Button";

import { addEvent, deleteEvent } from "../../redux/calendarsSlice";
import { closeModal } from "../../redux/modalsSlice";
import {
  getEvent,
  formatDateToYMD,
  eventTimeValidation,
  generateTimeOptions,
} from "../../utils/helpers";

import { useDispatch, useSelector } from "react-redux";

export default function EditEventModal({
  eventData,
  setEventData,
  selectedEvent,
  setSelectedEvent,
  setIsEditing,
  resetFormFields,
}) {
  const dispatch = useDispatch();
  const calendars = useSelector((state) => state.calendars.calendars);

  const timeOptions = generateTimeOptions();

  const calendarsOption = calendars.map((calendar) => ({
    id: calendar.id,
    title: calendar.title,
    color: calendar.color,
  }));

  return (
    <Modal
      className="event-modal"
      modalTitle="Edit event"
      onClose={() => {
        dispatch(closeModal({ modalName: "eventModal" }));
        resetFormFields();
        setSelectedEvent(null);
        setIsEditing(false);
      }}
    >
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (
            eventData.allDay ||
            eventTimeValidation(eventData.start, eventData.end)
          ) {
            dispatch(closeModal({ modalName: "eventModal" }));
            const findedEvent = getEvent(selectedEvent.eventId, calendars);
            dispatch(deleteEvent({ findedEvent }));
            dispatch(addEvent(eventData));
            resetFormFields();
            setSelectedEvent(null);
            setIsEditing(false);
          } else {
            dispatch(showToast("Invalid event time"));
            return;
          }
        }}
      >
        <div className="modal-field-container">
          <img className="field-icon" src="./icons/title.svg" alt="Title icon" />
          <InputField
            label="Title"
            value={eventData.title}
            onChange={(e) =>
              setEventData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter title"
          ></InputField>
        </div>
        <div className="modal-field-container">
          <img className="field-icon" src="./icons/clock.svg" alt="Clock icon" />

          <DatePicker
            withInput
            onChange={(date) => {
              const normalized = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
              setEventData((prev) => ({
                ...prev,
                date: formatDateToYMD(normalized),
              }));
            }}
            value={eventData.date}
          />
          <div className="event-select-container">
            <Select
              title="Time"
              width={"90px"}
              className="event-start"
              value={eventData.start}
              onChange={(newValue) => {
                setEventData((prev) => ({
                  ...prev,
                  start: newValue,
                }));
              }}
              options={timeOptions}
            ></Select>
            <Select
              width={"90px"}
              className="event-end"
              value={eventData.end}
              onChange={(newValue) => {
                setEventData((prev) => ({
                  ...prev,
                  end: newValue,
                }));
              }}
              options={timeOptions}
            ></Select>
          </div>
        </div>
        <div className="modal-field-container displaced-event-field-container">
          <Checkbox
            className={"create-event-checkbox"}
            text={"All day"}
            checked={eventData.allDay}
            onChange={() =>
              setEventData((prev) => ({
                ...prev,
                allDay: !prev.allDay,
              }))
            }
          ></Checkbox>
          <Dropdown
            width={"190px"}
            value={eventData.repeat}
            onChange={(newValue) => {
              setEventData((prev) => ({
                ...prev,
                repeat: newValue,
              }));
            }}
            options={[
              "Does not repeat",
              "Daily",
              "Weekly on Thursday",
              "Monthly",
              "Annually on November 2",
            ]}
          ></Dropdown>
        </div>
        <div className="modal-field-container">
          <img
            className="field-icon"
            src="./icons/calendar.svg"
            alt="Calendar icon"
          />

          <Dropdown
            title={"Calendar"}
            width={"100%"}
            value={eventData.calendar}
            onChange={(newValue) => {
              setEventData((prev) => ({
                ...prev,
                calendar: newValue,
              }));
            }}
            options={calendarsOption}
          ></Dropdown>
        </div>
        <div className="modal-field-container">
          <img
            className="field-icon"
            src="./icons/description.svg"
            alt="Description icon"
          />
          <TextArea
            height="40px"
            textareaTitle="Description"
            value={eventData.description}
            onChange={(newValue) => {
              setEventData((prev) => ({
                ...prev,
                description: newValue,
              }));
            }}
          ></TextArea>
        </div>
        <Button className="create-event-button" type="submit" variant="primary">
          Save
        </Button>
      </form>
    </Modal>
  );
}
