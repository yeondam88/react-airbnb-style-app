import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeaderWithSearch from "components/shared/HeaderWithSearch";
import BookingCard from "./BookingCard";
import { fetchUserBookings } from "actions";

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
            <div className="row card-deck">
              {bookings.map(booking => {
                return <BookingCard key={booking._id} booking={booking} />;
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
                    to="/rentals"
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
