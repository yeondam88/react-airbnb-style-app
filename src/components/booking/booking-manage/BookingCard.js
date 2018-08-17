import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { pretifyDate, toUpperCase } from "helpers";

const BookingCard = ({ booking }) => {
  return (
    <div key={booking._id} className="col-md-4">
      <div className="card">
        <img
          className="card-img-top"
          src={booking.rental.image}
          alt={booking.title}
        />
        <div className="card-body">
          {booking.rental && (
            <Fragment>
              <h5 className="card-title">
                {booking.rental.title} - {toUpperCase(booking.rental.city)}
              </h5>
              <p className="card-text">{booking.rental.description}</p>
            </Fragment>
          )}
          <p className="card-text booking-days">
            {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} |{" "}
            {booking.days} {booking.days > 1 ? "days" : "day"}
          </p>
          <p className="card-text booking-price">
            <span>Price: </span>
            <span className="booking-price-value">${booking.totalPrice}</span>
          </p>
          <p className="card-text">
            <small className="text-muted">
              created {pretifyDate(booking.createdAt)}
            </small>
          </p>
          <p className="card-text">
            Rental Type:{" "}
            {booking.rental ? booking.rental.category : "Deleted Rental"}
          </p>
          <Link
            className="btn btn-primary btn-sm"
            to={`/rentals/${booking.rental._id}`}
          >
            Go to Rental
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
