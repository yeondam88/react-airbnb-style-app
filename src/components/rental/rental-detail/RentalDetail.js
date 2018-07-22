import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalById } from "../../../actions";

class RentalDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchRentalById(id);
  }

  render() {
    const rental = this.props.rental;
    if (rental.id) {
      return (
        <div>
          <h1>Rental Detail!!!</h1>
          <p>{rental.title}</p>
          <p>{rental.city}</p>
          <p>{rental.description}</p>
          <p>per night ${rental.dailyRate}</p>
        </div>
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
