import "./modal.css";
import Button from "../button/Button";

export default function Modal({
  className = "",
  modalTitle = "",
  onClose = () => { },

  children,
}) {
  return (
    <div className={`modal ${className}`}>
      <button onClick={onClose} className="modal-button-close">
        <img src="./icons/close.svg" alt="close" />
      </button>
      <h2 className="modal-title">{modalTitle}</h2>

      {children}
    </div>
  );
}
