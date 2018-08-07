import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderWithSearch from "components/shared/HeaderWithSearch";
import RentalList from "./RentalList";
import axios from "axios";

import { fetchRentals } from "actions";
import { toUpperCase } from "helpers";

class RentalSearchListing extends Component {
  state = {
    searchedCity: "",
    rentals: []
  };

  componentWillMount() {
    this.searchRentalByCity();
  }

  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.city;
    const prevUrlParam = prevProps.match.params.city;

    if (currentUrlParam !== prevUrlParam) {
      this.searchRentalByCity();
    }
  }

  searchRentalByCity = () => {
    const { city: searchedCity } = this.props.match.params;
    this.setState({
      searchedCity
    });
    this.props.fetchRentals(searchedCity);
    axios
      .get(`http://localhost:3001/api/v1/rentals?city=${searchedCity}`)
      .then(response => this.setState({ rentals: response.data }));
  };

  renderTitle = () => {
    const { errors, data } = this.props.rentals;
    const { searchedCity } = this.state;
    let title = "";

    if (errors.length > 0) {
      title = errors[0].detail;
    }
    if (data.length > 0) {
      title = `Your home in city of ${toUpperCase(searchedCity)}.`;
    }

    return <h1 className="page-title">{title}</h1>;
  };

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <HeaderWithSearch />
        <div className="container" style={{ marginTop: "40px" }}>
          <section id="rentalListing">
            {this.renderTitle()}
            <RentalList rentals={this.props.rentals.data} />
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  rentals: state.rentals
});

export default connect(
  mapStateToProps,
  { fetchRentals }
)(RentalSearchListing);
