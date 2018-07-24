import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentalById } from "actions";

class RentalDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchRentalById(id);
  }

  render() {
    const { rental } = this.props;
    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <div className="rental">
                  <h2 className={`rental-type ${rental.category}`}>
                    {rental.shared} {rental.category}
                  </h2>
                  <h1 className="rental-title">{rental.title}</h1>
                  <h2 className="rental-city">{rental.city}</h2>
                  <div className="rental-room-info">
                    <span>
                      <i className="fa fa-building" />
                      {rental.bedrooms} bedrooms
                    </span>
                    <span>
                      <i className="fa fa-user" /> {rental.bedrooms + 4} guests
                    </span>
                    <span>
                      <i className="fa fa-bed" /> {rental.bedrooms + 2} beds
                    </span>
                  </div>
                  <p className="rental-description">{rental.description}</p>
                  <hr />
                  <div className="rental-assets">
                    <h3 className="title">Assets</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <span>
                          <i className="fa fa-asterisk" /> Cooling
                        </span>
                        <span>
                          <i className="fa fa-thermometer" /> Heating
                        </span>
                        <span>
                          <i className="fa fa-location-arrow" /> Iron
                        </span>
                      </div>
                      <div className="col-md-6">
                        <span>
                          <i className="fa fa-desktop" /> Working area
                        </span>
                        <span>
                          <i className="fa fa-cube" /> Washing machine
                        </span>
                        <span>
                          <i className="fa fa-cube" /> Dishwasher
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4"> BOOKING</div>
            </div>
          </div>
        </section>
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
