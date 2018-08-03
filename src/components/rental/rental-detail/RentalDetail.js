import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalById } from "actions";
import { ClipLoader } from "react-spinners";
import RentalMap from "./RentalMap";
import RentalDetailInfo from "./RentalDetailInfo";
import Booking from "../../booking/Booking";
import HeaderWithSearch from 'components/shared/HeaderWithSearch';

class RentalDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchRentalById(id);
  }

  render() {
    const { rental } = this.props;
    if (rental._id) {
      return (
        <React.Fragment>
          <HeaderWithSearch />
        <div className="container" style={{ marginTop: "80px" }}>
          <section id="rentalDetails">
            <div className="upper-section">
              <div className="row">
                <div className="col-md-6">
                  <img src={rental.image} alt="" />
                </div>
                <div className="col-md-6">
                  <RentalMap location={`${rental.city}, ${rental.street}`} />
                </div>
              </div>
            </div>

            <div className="details-section">
              <div className="row">
                <div className="col-md-8">
                  <RentalDetailInfo rental={rental} />
                </div>
                <div className="col-md-4">
                  <Booking rental={rental} />
                </div>
              </div>
            </div>
          </section>
        </div>
        </React.Fragment>
        
      );
    } else {
      return (
        <div style={style}>
          <ClipLoader size={60} />
        </div>
      );
    }
  }
}

const style = {
  width: "100%",
  height: "100vh",
  position: "absolute",
  top: "50%",
  left: "50%"
};

const mapStateToProps = state => {
  return {
    rental: state.rental.data
  };
};

export default connect(
  mapStateToProps,
  { fetchRentalById }
)(RentalDetail);
