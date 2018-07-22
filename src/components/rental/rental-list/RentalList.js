import React, { Component } from "react";
import RentalCard from "../RentalCard";
import { connect } from "react-redux";
import { fetchRentals } from "../../../actions";

class RentalList extends Component {
  componentDidMount() {
    this.props.fetchRentals();
  }

  renderRentals = () => {
    return this.props.rentals.map((rental, index) => {
      return (
        <RentalCard key={index} colNum="col-md-3 col-xs-6" rental={rental} />
      );
    });
  };

  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">{this.renderRentals()}</div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rentals.data
  };
};

export default connect(
  mapStateToProps,
  {
    fetchRentals
  }
)(RentalList);
