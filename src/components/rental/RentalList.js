import React, { Component } from "react";
import RentalCard from "./RentalCard";

class RentalList extends Component {
  state = {
    rentals: [1, 2, 3]
  };

  renderRentals = () => {
    return this.state.rentals.map(rental => {
      return <RentalCard />;
    });
  };

  addRental = () => {
    const rentals = this.state.rentals;
    rentals.push(1);

    this.setState({
      rentals
    });
  };

  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">{this.renderRentals()}</div>
        <button onClick={this.addRental}>Add Rental!</button>
      </section>
    );
  }
}

export default RentalList;
