import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalById } from "actions";
import { MapWithAMarker } from "components/map/GoogleMap";

import RentalDetailInfo from "./RentalDetailInfo";

class RentalDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchRentalById(id);
  }

  render() {
    const { rental } = this.props;
    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
              <div className="col-md-6">
                <MapWithAMarker
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDym52aogc--qUUxVq_vCHgnV1c8MZaHeU&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `360px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <RentalDetailInfo rental={rental} />
              </div>
              <div className="col-md-4"> BOOKING</div>
            </div>
          </div>
        </section>
      );
    } else {
      return <h1>loading...</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    rental: state.rental.data
  };
};

export default connect(
  mapStateToProps,
  { fetchRentalById }
)(RentalDetail);
