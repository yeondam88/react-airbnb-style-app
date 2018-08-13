import React, { Component } from "react";
import HeaderWithSearch from "components/shared/HeaderWithSearch";
import { getUserRentals } from "actions";

class RentalManage extends Component {
  state = {
    userRentals: [],
    errors: []
  };

  componentDidMount() {
    getUserRentals().then(
      userRentals => this.setState({ userRentals }),
      errors => this.setState({ errors })
    );
  }

  render() {
    console.log(this.state.userRentals);
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
