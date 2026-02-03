import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../../../redux/toastSlice";

import "./toast.css";

export default function Toast({ className, onClose = () => { } }) {
  const { isOpen, message } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  return (
    <div className={`toast ${className}`}>
      <button className="toast-close-button" onClick={onClose}>
        <img src="./icons/close.svg" alt="close" />
      </button>
      <p className="toast-message">{message}</p>
    </div>
  );
}
