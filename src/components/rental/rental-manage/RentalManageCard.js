import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toUpperCase, pretifyDate } from "helpers";

class RentalManageCard extends Component {
  render() {
    const { image, title, city, _id, createdAt } = this.props.rental;
    return (
      <div key={_id} className="col-md-4 rental-card">
        <div className="card">
          <img className="card-img-top" src={image} alt="Card image cap" />
          <div className="card-body">
            <p className="card-text">
              {title} - {toUpperCase(city)}
            </p>
            <Link
              className="btn btn-primary btn-sm rental-card-btn"
              to="rental detail"
              to={`/rentals/${_id}`}
            >
              Go to Rental
            </Link>
            <button className="btn btn-primary btn-sm rental-card-btn">
              Bookings
            </button>
          </div>
          <div className="card-footer">
            <p className="card-text">Created at {pretifyDate(createdAt)}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default RentalManageCard;
