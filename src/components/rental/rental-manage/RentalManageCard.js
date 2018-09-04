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

  deleteRental = (id, rentalIndex) => {
    this.setState({ wantDelete: false });
    this.props.onDeleteRental(id, rentalIndex);
  };

  render() {
    const { image, title, city, _id, createdAt, bookings } = this.props.rental;
    const { wantDelete } = this.state;
    const { rentalIndex } = this.props;

    const deleteClass = wantDelete ? "toBeDeleted" : "";

    return (
      <div key={_id} className="col-md-4 rental-card">
        <div className={`card text-center ${deleteClass}`}>
          <img className="card-img-top" src={image} alt={title} />
          <div className="card-body">
            <p className="card-text">
              {title} - {toUpperCase(city)}
            </p>
            <Link
              className="btn btn-primary btn-sm rental-card-btn"
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
              <React.Fragment>
                <button
                  onClick={this.showDeleteMenu}
                  className="btn btn-sm btn-danger m-2"
                >
                  Delete
                </button>
                <Link
                  className="btn btn-sm btn-warning ml-2"
                  to={{
                    pathname: `/rentals/${_id}`,
                    state: { isUpdate: true }
                  }}
                >
                  Edit
                </Link>
              </React.Fragment>
            )}
            {wantDelete && (
              <div>
                Are you sure ?
                <button
                  onClick={() => this.deleteRental(_id, rentalIndex)}
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
