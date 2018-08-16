import React, { Component } from "react";
import HeaderWithSearch from "components/shared/HeaderWithSearch";
import { ClipLoader } from "react-spinners";
import { getUserRentals, deleteRental } from "actions";
import RentalManageCard from "./RentalManageCard";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class RentalManage extends Component {
  state = {
    userRentals: [],
    errors: [],
    isFetching: false
  };

  componentDidMount() {
    this.setState({ isFetching: true });
    getUserRentals().then(
      userRentals => this.setState({ userRentals, isFetching: false }),
      errors => this.setState({ errors, isFetching: false })
    );
  }

  handleDeleteRental = (id, rentalIndex) => {
    deleteRental(id)
      .then(res => {
        this.deleteRentalFromList(rentalIndex);
        toast.success("Your rental is deleted!");
      })
      .catch(errors => {
        toast.error(errors[0].detail);
      });
  };

  deleteRentalFromList = rentalIndex => {
    const userRentals = this.state.userRentals.slice();
    userRentals.splice(rentalIndex, 1);

    this.setState({ userRentals });
  };

  render() {
    const { userRentals, isFetching } = this.state;

    if (isFetching) {
      return (
        <div style={style}>
          <ClipLoader size={60} />
        </div>
      );
    }

    return (
      <React.Fragment>
        <HeaderWithSearch />
        <ToastContainer />
        <div className="container" style={{ marginTop: "80px" }}>
          <h1 className="title">My Rentals</h1>
          <div className="row">
            {userRentals.map((rental, index) => {
              return (
                <RentalManageCard
                  rental={rental}
                  rentalIndex={index}
                  key={rental._id}
                  onDeleteRental={this.handleDeleteRental}
                />
              );
            })}
          </div>
          {!isFetching &&
            userRentals.length === 0 && (
              <div className="alert alert-warning">
                You don't have any rentals currently created. If you want
                advertised your property please follow this link
                <Link
                  style={{ marginLeft: "10px" }}
                  className="btn btn-bwm"
                  to="/rentals/new"
                >
                  Register Rental
                </Link>
              </div>
            )}
        </div>
      </React.Fragment>
    );
  }
}

const style = {
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: "50%",
  left: "50%"
};

export default RentalManage;
