import "./calendarItem.css";
import Checkbox from "../ui/checkbox/Checkbox";
import Button from "../ui/button/Button";
import Modal from "../ui/modal/Modal";
import InputField from "../ui/inputField/InputField";
import ColorPicker from "../ui/colorPicker/ColorPicker";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCalendar } from "../../redux/calendarsSlice";
import { openModal } from "../../redux/modalsSlice";

export default function CalendarItem({ id, color, title, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [pickedColor, setPickedColor] = useState(color);

  const dispatch = useDispatch();

  return (
    <li className="calendar-item" key={id} id={id}>
      <Checkbox
        color={color}
        isChecked={isActive}
        onClick={() => {
          dispatch(
            updateCalendar({
              id,
              isActive: !isActive,
              color: pickedColor,
              title: editedTitle,
            })
          );
        }}
      ></Checkbox>
      <p className="calendar-title">{title}</p>
      {id !== "defaultCalendar" && (
        <Button
          onClick={() => {
            dispatch(
              openModal({
                modalName: "confirmModal",
                id,
                entityType: "calendar",
              })
            );
          }}
          variant="transparent"
          icon={"./icons/trash.svg#trash"}
          iconStroke="#323749"
          iconFill="#323749"
        ></Button>
      )}
      <Button
        onClick={() => {
          setIsEditing(!isEditing);
        }}
        variant="transparent"
        icon={"./icons/edit.svg#edit"}
        iconStroke="#323749"
      ></Button>
      {isEditing && (
        <Modal
          className="create-calendar-modal"
          modalTitle="Edit calendar"
          onClose={() => {
            setIsEditing(!isEditing);
          }}
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
                updateCalendar({
                  id,
                  title: editedTitle,
                  color: pickedColor,
                })
              );
              setIsEditing(false);
            }}
            className={"modal-save-button"}
            variant="primary"
          >
            Save
          </Button>
        </Modal>
      )}
    </li>
  );
}
