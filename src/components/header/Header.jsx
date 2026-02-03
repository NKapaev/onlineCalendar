import "./header.css";
import { Link } from "react-router-dom";
import Button from "../ui/button/Button";
import DropDown from "../ui/dropdown/Dropdown";
import { useAuth } from "../../auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEventCalendarCurrentDate } from "../../redux/eventCalendarSlice";
import { formattingDate } from "../../utils/helpers";

export default function Header() {
  const { user } = useAuth();
  const eventCalendar = useSelector((state) => state.eventCalendar);
  const dispatch = useDispatch();

  const currentDate = eventCalendar.currentDate
    ? new Date(eventCalendar.currentDate)
    : new Date();

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    dispatch(
      setEventCalendarCurrentDate({ currentDate: formattingDate(nextDay) })
    );
  };

  const goToPrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    dispatch(
      setEventCalendarCurrentDate({ currentDate: formattingDate(prevDay) })
    );
  };

  const formatDisplayDate = () => {
    try {
      return currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/mainpage">
          <img className="header-logo" src="./logo.svg" alt="Logo" />
        </Link>

        <div className="events-calendar-conrollers-container">
          <Button
            onClick={() => {
              dispatch(
                setEventCalendarCurrentDate({
                  currentDate: formattingDate(new Date()),
                })
              );
            }}
            className="current-day-button"
            variant="primary"
          >
            Today
          </Button>
          <Button
            onClick={goToPrevDay}
            className="change-selected-date-button"
            variant="secondary"
            icon={"./icons/chevron-left.svg#chevron-left"}
          ></Button>

          <Button
            onClick={goToNextDay}
            className="change-selected-date-button"
            variant="secondary"
            icon={"./icons/chevron-right.svg#chevron-right"}
          ></Button>
          <p className="header-selected-date">{formatDisplayDate()}</p>
        </div>
        <DropDown
          disabled
          className="header-dropdown"
          options={["Day", "Week"]}
        ></DropDown>

        <div
          className="user-container"
          onClick={(e) => {
            e.currentTarget
              .querySelector(".logout-button")
              .classList.toggle("hidden");
          }}
        >
          <p className="user-name">{user.displayName}</p>
          <img className="user-avatar" src={user.photoURL} alt="User photo" />

          <Button
            className="logout-button hidden"
            variant="secondary"
            icon="./icons/logout.svg#logout"
            iconStroke="none"
            iconFill="#323749"
            onClick={() => {
              signOut(auth);
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
