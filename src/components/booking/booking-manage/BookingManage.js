import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeaderWithSearch from "components/shared/HeaderWithSearch";
import { fetchUserBookings } from "actions";
import { pretifyDate, toUpperCase } from "helpers";

class BookingManage extends Component {
  componentDidMount() {
    this.props.fetchUserBookings();
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    return (
      <React.Fragment>
        <HeaderWithSearch />
        <div className="container" style={{ marginTop: "80px" }}>
          <section id="userBookings">
            <h1 className="page-title">My Bookings</h1>
            <div className="row">
              {bookings.map(booking => {
                return (
                  <div key={booking._id} className="col-md-4">
                    <div className="card text-center">
                      <div className="card-header">
                        {booking.rental
                          ? booking.rental.category
                          : "Deleted Rental"}
                      </div>
                      <div className="card-block">
                        {booking.rental && (
                          <Fragment>
                            <h4 className="card-title">
                              {booking.rental.title} -{" "}
                              {toUpperCase(booking.rental.city)}
                            </h4>
                            <p className="card-text booking-desc">
                              {booking.rental.description}
                            </p>
                          </Fragment>
                        )}

                        <p className="card-text booking-days">
                          {pretifyDate(booking.startAt)} -{" "}
                          {pretifyDate(booking.endAt)} | {booking.days}{" "}
                          {booking.days > 1 ? "days" : "day"}
                        </p>
                        <p className="card-text booking-price">
                          <span>Price: </span>
                          <span className="booking-price-value">
                            ${booking.totalPrice}
                          </span>
                        </p>
                        <Link
                          className="btn btn-bwm"
                          to="rental detail"
                          to={`/rentals/${booking.rental._id}`}
                        >
                          Go to Rental
                        </Link>
                      </div>
                      <div className="card-footer text-muted">
                        created {pretifyDate(booking.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {!isFetching &&
              bookings.length === 0 && (
                <div className="alert alert-warning">
                  You have no bookings created go to rentals section and book
                  your place today.
                  <Link
                    style={{ marginLeft: "10px" }}
                    className="btn btn-bwm"
                    to="rentals index page"
                  >
                    Available Rental
                  </Link>
                </div>
              )}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userBookings: state.userBookings
  };
};

export default connect(
  mapStateToProps,
  { fetchUserBookings }
)(BookingManage);
