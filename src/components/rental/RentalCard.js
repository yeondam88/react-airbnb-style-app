import React from "react";

const RentalCard = props => (
  <div className={props.colNum}>
    <div className="card bwm-card">
      <img
        src="http://via.placeholder.com/350x250"
        alt=""
        className="card-img-top"
      />
      <div className="card-block">
        <h6 className="card-subtitle">Whole Apartment &#183; New York</h6>
        <h4 className="card-title">Some nice apartment</h4>
        <p className="card-text">$240 per night &#183; Free Cancelation</p>
        <a href="" className="card-link">
          More Info
        </a>
      </div>
    </div>
  </div>
);

export default RentalCard;
