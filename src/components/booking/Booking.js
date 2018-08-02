import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { getRangeOfDates } from "helpers";
import * as moment from "moment";
import { throws } from "assert";

class Booking extends React.Component {
  state = {
    startAt: "",
    endAt: "",
    guests: 0,
    errors: "",
    isErrors: false
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
      startAt,
      endAt
    });
  };

  selectGuests = event => {
    const { guests } = this.state;
    const { rental } = this.props;

    this.setState({
      guests: parseInt(event.target.value)
    });

    if (guests >= rental.bedrooms + 4) {
      this.setState({
        errors: `You can not have more than ${rental.bedrooms + 4} people.`,
        isErrors: true
      });
    } else {
      this.setState({
        errors: "",
        isErrors: false
      });
    }
  };

  handleReserveButton = () => {
    console.log(this.state);
  };

  render() {
    const { rental } = this.props;

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
            value={this.state.guests}
            type="number"
            className="form-control"
            id="guests"
            aria-describedby="guests"
            placeholder=""
          />
          {this.state.errors ? (
            <p className="alert alert-danger">{this.state.errors}</p>
          ) : null}
        </div>
        <button
          disabled={this.state.isErrors}
          onClick={this.handleReserveButton}
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
      </div>
    );
  }
}

export default Booking;
