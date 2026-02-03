import "./greeting.css";
import Login from "../login/Login";

export default function Greeting() {
  return (
    <div className="greeting-container">
      <img className="greeting-logo" src="./logo.svg" alt="WebCalendar logo" />
      <Login />
    </div>
  );
}
