import React from "react";

const RentalCard = ({ colNum, rental }) => (
  <div className={colNum}>
    <div className="card bwm-card">
      <img src={rental.image} alt="" className="card-img-top" />
      <div className="card-block">
        <h6 className="card-subtitle">
          {rental.shared ? "shared" : "whole"} {rental.category} &#183;{" "}
          {rental.city}
        </h6>
        <h4 className="card-title">{rental.title}</h4>
        <p className="card-text">
          ${rental.dailyRate} per night &#183; Free Cancelation
        </p>
        <a href="" className="card-link">
          More Info
        </a>
      </div>
    </div>
  </div>
);

export default RentalCard;
