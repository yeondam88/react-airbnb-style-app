import React, { Component } from "react";
import HeaderWithSearch from "components/shared/HeaderWithSearch";
import RentalCreateForm from "./RentalCreateForm";

class RentalCreate extends Component {
  submitRental = () => {};

  render() {
    return (
      <React.Fragment>
        <HeaderWithSearch />
        <div className="container" style={{ marginTop: "80px" }}>
          <section id="newRental">
            <div className="bwm-form">
              <div className="row">
                <div className="col-md-5">
                  <h1 className="page-title">Create Rental</h1>
                  <RentalCreateForm submitCb={this.submitRental} />
                </div>
                <div className="col-md-6 ml-auto">
                  <div className="image-container">
                    <h2 className="catchphrase">
                      Hundreds of awesome places in reach of few clicks.
                    </h2>
                    <img
                      src={process.env.PUBLIC_URL + "/img/create-rental.jpg"}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default RentalCreate;
