import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toUpperCase, pretifyDate } from "helpers";
import RentalManageModal from "./RentalManageModal";

class RentalManageCard extends Component {
  state = {
    wantDelete: false
  };

  showDeleteMenu = () => {
    this.setState({
      wantDelete: true
    });
  };

  closeDeleteMenu = () => {
    this.setState({
      wantDelete: false
    });
  };

  render() {
    const { image, title, city, _id, createdAt, bookings } = this.props.rental;
    const { wantDelete } = this.state;
    const { onDeleteRental } = this.props;

    const deleteClass = wantDelete ? "toBeDeleted" : "";

    return (
      <div key={_id} className="col-md-4 rental-card">
        <div className={`card text-center ${deleteClass}`}>
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
            {bookings &&
              bookings.length > 0 && <RentalManageModal bookings={bookings} />}
          </div>
          <div className="card-footer">
            Created at {pretifyDate(createdAt)}
            {!wantDelete && (
              <button
                onClick={this.showDeleteMenu}
                className="btn btn-sm btn-danger m-2"
              >
                Delete
              </button>
            )}
            {wantDelete && (
              <div>
                Are you sure ?
                <button
                  onClick={() => onDeleteRental(_id)}
                  className="btn btn-sm btn-danger m-2"
                >
                  Yes
                </button>
                <button
                  onClick={this.closeDeleteMenu}
                  className="btn btn-sm btn-success"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RentalManageCard;
