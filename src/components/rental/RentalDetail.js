import React, { Component } from "react";

class RentalDetail extends Component {
  render() {
    return (
      <div>
        <h1>Rental Detail!!! {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default RentalDetail;
