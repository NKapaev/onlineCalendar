import "./mainPage.css";

import React from "react";
import Header from "../../components/header/Header";
import Main from "../../components/main/Main";
import Modal from "../../components/ui/modal/Modal";
import Button from "../../components/ui/button/Button";
import Toast from "../../components/ui/toast/Toast";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalsSlice";
import { deleteCalendar, deleteEvent } from "../../redux/calendarsSlice";
import { getEvent, getCalendarById } from "../../utils/helpers";
import { hideToast, showToast } from "../../redux/toastSlice";

export default function MainPage() {
  const toast = useSelector((state) => state.toast);
  const confirmModal = useSelector((state) => state.modals.confirmModal);
  const calendars = useSelector((state) => state.calendars.calendars);
  const dispatch = useDispatch();

  const selectedEvent = getEvent(confirmModal.id, calendars);

  const calendar = useSelector((state) =>
    getCalendarById(calendars, confirmModal.id)
  );

  return (
    <div className="main-page">
      {/* Delete calendar modal */}
      {confirmModal.isOpen && confirmModal.entityType === "calendar" && (
        <Modal
          modalTitle="Delete calendar"
          className="confirm-modal"
          onClose={() => {
            dispatch(closeModal({ modalName: "confirmModal" }));
          }}
        >
          <p>
            Are you sure you want to delete {calendar.title}? You'll no longer
            have access to this calendar and its events.
          </p>

          <div className="confirm-button-container">
            <Button
              className="confirm-button"
              variant="secondary"
              onClick={() => {
                dispatch(closeModal({ modalName: "confirmModal" }));
              }}
            >
              Cancle
            </Button>
            <Button
              className="confirm-button"
              variant="primary"
              onClick={() => {
                dispatch(deleteCalendar({ id: confirmModal.id }));
                dispatch(closeModal({ modalName: "confirmModal" }));
                dispatch(showToast("Calendar deleted"));
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
      {/* Delete event modal */}
      {confirmModal.isOpen && confirmModal.entityType === "event" && (
        <Modal
          modalTitle="Delete event"
          className="confirm-modal"
          onClose={() => {
            dispatch(closeModal({ modalName: "confirmModal" }));
          }}
        >
          <p className="confirm-modal-text">
            Are you sure you want to delete {selectedEvent.title}? You'll no
            longer have access to this calendar and its events.
          </p>

          <div className="confirm-button-container">
            <Button
              className="confirm-button"
              variant="secondary"
              onClick={() => {
                dispatch(closeModal({ modalName: "confirmModal" }));
              }}
            >
              Cancle
            </Button>
            <Button
              className="confirm-button"
              variant="primary"
              onClick={() => {
                dispatch(deleteEvent({ findedEvent: selectedEvent }));
                dispatch(closeModal({ modalName: "confirmModal" }));
                dispatch(showToast("Event deleted"));
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
      <Header />
      <Main />
      {toast.isOpen && (
        <Toast
          className={"page-toast"}
          message={toast.message}
          onClose={() => {
            dispatch(hideToast());
          }}
        />
      )}
    </div>
  );
}
