import React, { Component } from "react";
import RentalAssets from "./RentalAssets";
import { toUpperCase, rentalType } from "helpers";

import EditableInput from "components/shared/editable/EditableInput";

class RentalDetailUpdate extends Component {
  render() {
    const { rental } = this.props;
    return (
      <div className="rental">
        <h1>Update Rental</h1>
        <h2 className={`rental-type ${rental.category}`}>
          {rentalType(rental.shared)} {rental.category}
        </h2>
        <div className="rental-owner">
          <img
            src="https://api.adorable.io/avatars/285/abott@adorable.png"
            alt="owner"
          />
          <span>{rental.user && rental.user.username}</span>
        </div>
        <h1 className="rental-title">{rental.title}</h1>
        <EditableInput
          entity={rental}
          entityField={"title"}
          className={"rental-title"}
        />
        <h2 className="rental-city">{toUpperCase(rental.city)}</h2>
        <div className="rental-room-info">
          <span>
            <i className="fa fa-building">{rental.bedrooms} bedrooms</i>
          </span>
          <span>
            <i className="fa fa-user">{rental.bedrooms + 4} guests</i>
          </span>
          <span>
            <i className="fa fa-bed">{rental.bedrooms + 2} beds</i>
          </span>
        </div>
        <p className="rental-description">{rental.description}</p>
        <hr />
        <RentalAssets />
      </div>
    );
  }
}

export default RentalDetailUpdate;
