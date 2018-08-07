import React, { Component } from "react";
import Header from "components/shared/Header";
import Main from "components/shared/Main";
import RentalList from "./RentalList";
import axios from "axios";

class RentalSearchListing extends Component {
  state = {
    city: "",
    rentals: []
  };

  componentWillMount() {
    axios
      .get(`http://localhost:3001/api/v1/rentals?city=new%20york`)
      .then(response => this.setState({ rentals: response.data }));
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
        <div className="container" style={{ marginTop: "40px" }}>
          <section id="rentalListing">
            <h1 className="page-title">Your Home All Around the World</h1>
            <RentalList rentals={this.state.rentals} />
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default RentalSearchListing;
