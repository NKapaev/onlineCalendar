import "./calendars.css";
import Button from "../ui/button/Button";
import Modal from "../ui/modal/Modal";
import InputField from "../ui/inputField/InputField";
import ColorPicker from "../ui/colorPicker/ColorPicker";
import CalendarItem from "../calendarItem/CalendarItem";

import { useSelector, useDispatch } from "react-redux";
import { addCalendar } from "../../redux/calendarsSlice";

import { useState } from "react";

export default function Calendars({ className }) {
  const [creatingCalendar, setCreatingCalendar] = useState(false);

  const calendars = useSelector((state) => state.calendars.calendars);
  const dispatch = useDispatch();

  function handleModalClose() {
    setCreatingCalendar(false);
  }
  const [editedTitle, setEditedTitle] = useState("");
  const [pickedColor, setPickedColor] = useState("");

  return (
    <div className={`calendars-container ${className}`}>
      <div className="calendars-header">
        <h2>My calendars</h2>
        <Button
          onClick={() => {
            setCreatingCalendar(!creatingCalendar);
          }}
          variant="transparent"
          icon="./icons/plus.svg#plus"
          iconFill="none"
          iconStroke="#323749"
        ></Button>
        {creatingCalendar && (
          <Modal
            className="create-calendar-modal"
            modalTitle="Create calendar"
            onClose={handleModalClose}
          >
            <div className="create-calendar-field-container">
              <img
                className="field-icon"
                src="./icons/title.svg"
                alt="Title icon"
              />
              <InputField
                label="Title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Enter title"
              ></InputField>
            </div>
            <div className="create-calendar-field-container">
              <img
                className="field-icon"
                src="./icons/palette.svg"
                alt="Palette icon"
              />
              <ColorPicker
                colorSize={20}
                colorsPerRow={6}
                colorPickerWidth="230px"
                value={pickedColor}
                onChange={setPickedColor}
              ></ColorPicker>
            </div>
            <Button
              onClick={() => {
                dispatch(
                  addCalendar({
                    id: crypto.randomUUID(),
                    title: editedTitle,
                    color: pickedColor,
                  })
                );
                setCreatingCalendar(false);
                setEditedTitle(null);
                setPickedColor(null);
              }}
              className={"modal-save-button"}
              variant="primary"
            >
              Save
            </Button>
          </Modal>
        )}
      </div>
      <ul className="calendars-list list">
        {calendars.length > 0 &&
          calendars.map((calendar) => (
            <CalendarItem
              key={calendar.id}
              id={calendar.id}
              title={calendar.title}
              color={calendar.color}
              isActive={calendar.isActive}
            />
          ))}
      </ul>
    </div>
  );
}
