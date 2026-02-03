import "./aside.css";
import Button from "../ui/button/Button";
import DatePicker from "../ui/datePicker/DatePicker";
import Calendars from "../calendars/Calendars";

import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../redux/modalsSlice";
import { setEventCalendarCurrentDate } from "../../redux/eventCalendarSlice";
import { formattingDate } from "../../utils/helpers";

export default function Aside() {
  const eventCalendar = useSelector((state) => state.eventCalendar);
  const dispatch = useDispatch();

  const currentDate = eventCalendar.currentDate
    ? new Date(eventCalendar.currentDate)
    : new Date();

  return (
    <aside className="aside">
      <Button
        onClick={() => {
          dispatch(openModal({ modalName: "eventModal" }));
        }}
        className={"aside-create-button"}
        variant="primary"
        icon="./icons/plus.svg#plus"
        iconStroke="#ffffff"
      >
        Create
      </Button>
      <DatePicker
        className={"aside-datepicker"}
        onChange={(date) => {
          dispatch(
            setEventCalendarCurrentDate({
              currentDate: formattingDate(date),
            })
          );
        }}
        value={currentDate}
      />
      <Calendars className={"aside-calendars"} />
    </aside>
  );
}
