import React, { Component } from "react";
import HeaderWithSearch from "components/shared/HeaderWithSearch";

class RentalManage extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderWithSearch />
        <div className="container" style={{ marginTop: "80px" }}>
          Rental Manage!
        </div>
      </React.Fragment>
    );
  }
}

export default RentalManage;
