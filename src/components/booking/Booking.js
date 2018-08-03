import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { getRangeOfDates } from "helpers";
import * as moment from "moment";
import BookingModal from "./BookingModal";

class Booking extends React.Component {
  state = {
    proposedBooking: {
      startAt: "",
      endAt: "",
      guests: 0,
      rental: {}
    },
    modal: {
      open: false
    },
    error: {
      message: "",
      isError: false
    }
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
        guests: parseInt(event.target.value)
      }
    });

    if (guests >= rental.bedrooms + 4) {
      this.setState({
        error: {
          message: `You can not have more than ${rental.bedrooms + 4} people.`,
          isError: true
        }
      });
    } else {
      this.setState({
        error: {
          message: "",
          isError: false
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

  render() {
    const { rental } = this.props;
    const { startAt, endAt, guests } = this.state.proposedBooking;

    return (
      <div className="booking">
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
            value={this.state.proposedBooking.guests}
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="guests"
            placeholder=""
          />
          {this.state.error.message ? (
            <p className="alert alert-danger">{this.state.error.message}</p>
          ) : null}
        </div>
        <button
          disabled={!startAt || !endAt || !guests || this.state.error.isError}
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
        />
      </div>
    );
  }
}

export default Booking;
