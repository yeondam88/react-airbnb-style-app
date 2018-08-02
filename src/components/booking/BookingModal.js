import React from "react";
import Modal from "react-responsive-modal";

const BookingModal = ({ open, closeModal, proposedBooking }) => {
  return (
    <Modal open={open} onClose={closeModal} center>
      <p>{proposedBooking.guests}</p>
      <p>{proposedBooking.startAt}</p>
      <p>{proposedBooking.endAt}</p>
    </Modal>
  );
};

export default BookingModal;
