import React, { Component } from "react";
import HeaderWithSearch from "components/shared/HeaderWithSearch";

class BookingManage extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderWithSearch />
        <div className="container" style={{ marginTop: "80px" }}>
          Booking Manage!
        </div>
      </React.Fragment>
    );
  }
}

export default BookingManage;
