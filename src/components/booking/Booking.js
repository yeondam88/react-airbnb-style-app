import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { getRangeOfDates } from "helpers";
import * as moment from "moment";
import * as actions from "actions";
import BookingModal from "./BookingModal";
import { ToastContainer, toast } from "react-toastify";

class Booking extends React.Component {
  state = {
    proposedBooking: {
      startAt: "",
      endAt: "",
      guests: ""
    },
    modal: {
      open: false
    },
    validate: {
      message: "",
      isValid: false
    },
    errors: []
  };
  bookedOutDates = [];
  dateRef = React.createRef();

  componentWillMount = () => {
    this.getBookedOutDates();
  };

  getBookedOutDates = () => {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(
          booking.startAt,
          booking.endAt,
          "Y/MM/DD"
        );
        this.bookedOutDates.push(...dateRange);
      });
    }
  };

  checkInvalidDates = date => {
    return (
      this.bookedOutDates.includes(date.format("Y/MM/DD")) ||
      date.diff(moment(), "days") < 0
    );
  };

  handleApply = (event, picker) => {
    const startAt = picker.startDate.format("Y/MM/DD");
    const endAt = picker.endDate.format("Y/MM/DD");

    this.dateRef.current.value = `${startAt} to ${endAt}`;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
  };

  selectGuests = event => {
    const {
      proposedBooking: { guests }
    } = this.state;
    const { rental } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10)
      }
    });

    if (guests >= rental.bedrooms + 4) {
      this.setState({
        validate: {
          message: `You can not have more than ${rental.bedrooms + 4} people.`,
          isValid: true
        }
      });
    } else {
      this.setState({
        validate: {
          message: "",
          isValid: false
        }
      });
    }
  };

  cancelConfirmation = () => {
    this.setState({
      modal: {
        open: false
      }
    });
  };

  addNewBookedOutDates = booking => {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  };

  resetData = () => {
    this.dateRef.current.value = "";

    this.setState({
      proposedBooking: { guests: "" }
    });
  };

  confirmProposedData = () => {
    const { startAt, endAt } = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    });
  };

  reserveRental = () => {
    actions.createBooking(this.state.proposedBooking).then(
      booking => {
        this.addNewBookedOutDates(booking);
        this.cancelConfirmation();
        this.resetData();
        toast.success("Booking has been successfully created. Enjoy!");
      },
      errors => {
        this.setState({
          errors
        });
      }
    );
  };

  render() {
    const { rental } = this.props;
    const { startAt, endAt, guests } = this.state.proposedBooking;

    return (
      <div className="booking">
        <ToastContainer />
        <h3 className="booking-price">
          ${rental.dailyRate}
          <span className="booking-per-night"> per night</span>
        </h3>
        <hr />
        <div className="form-group">
          <label htmlFor="dates">Dates</label>
          <DateRangePicker
            onApply={this.handleApply}
            isInvalidDate={this.checkInvalidDates}
            opens="left"
            containerStyles={{ display: "block" }}
          >
            <input
              ref={this.dateRef}
              id="dates"
              type="text"
              className="form-control"
            />
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            onChange={this.selectGuests}
            value={guests}
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="guests"
            placeholder=""
          />
          {this.state.validate.message ? (
            <p className="alert alert-danger">{this.state.validate.message}</p>
          ) : null}
        </div>
        <button
          disabled={
            !startAt || !endAt || !guests || this.state.validate.isValid
          }
          onClick={this.confirmProposedData}
          className="btn btn-bwm btn-confirm btn-block"
        >
          Reserve place now
        </button>
        <hr />
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
          open={this.state.modal.open}
          closeModal={this.cancelConfirmation}
          booking={this.state.proposedBooking}
          confirmModal={this.reserveRental}
          errors={this.state.errors}
          rentalPrice={rental.dailyRate}
        />
      </div>
    );
  }
}

export default Booking;
