import React, { Component } from "react";
import { MapWithAGeoCode } from "components/map/GoogleMap";

class RentalMap extends Component {
  render() {
    const { location } = this.props;
    return (
      <MapWithAGeoCode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfwGWCndbhphVLApZq_q4uV4uoPBFdIRg&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}

export default RentalMap;
