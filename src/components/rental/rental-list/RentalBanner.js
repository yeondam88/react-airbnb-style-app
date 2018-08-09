import React from "react";

const RentalBanner = () => {
  return (
    <React.Fragment>
      <div className="row" style={{ marginBottom: '15px' }}>
      <div className="col-md-3 rental-banner">
        <div className="rental-banner__image--1"/>
        <div className="rental-banner__text">
          Homes
        </div>
      </div>
      <div className="col-md-3 rental-banner">
        <div className="rental-banner__image--2"/>
        <div className="rental-banner__text" >
          Experiences
        </div>
      </div>
      <div className="col-md-3 col-md-offset-3 rental-banner">
        <div className="rental-banner__image--3"/>
        <div className="rental-banner__text">
          Restaurants
        </div>
      </div>
    </div>

    <div className="row" style={{ flexDirection: 'column', marginBottom: '15px' }}>
      <h1 className="page-title" style={{ marginLeft: '15px', marginBottom: '0px'}}>Introducing BWM Plus</h1>
      <p style={{ marginLeft: '15px' }}>A new selection of homes verified for quality &amp; comfort</p>
      <img style={{ paddingLeft: '15px', paddingRight: '15px' }} src="https://a0.muscache.com/4ea/air/v2/pictures/e36e06a9-f9a4-49a5-a94c-02134a8787c5.jpg?t=c:w1131-h343,r:w1131-h343-sfit,e:fjpg-c75" alt="Banner"/>
    </div>
    </React.Fragment>
    
  );
};

export default RentalBanner;
