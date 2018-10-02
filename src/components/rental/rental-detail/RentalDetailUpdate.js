import React, { Component } from "react";
import RentalAssets from "./RentalAssets";
import { toUpperCase, rentalType } from "helpers";
import { connect } from "react-redux";

import { updateRental } from "actions";
import EditableInput from "../../shared/editable/EditableInput";
import EditableText from "../../shared/editable/EditableText";

class RentalDetailUpdate extends Component {
  updateRental = rentalData => {
    const { id } = this.props;
    this.props.updateRental(id, rentalData);
  };

  render() {
    const { rental } = this.props;
    return (
      <div className="rental">
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
        <EditableInput
          entity={rental}
          entityField={"title"}
          className={"rental-title"}
          updateEntity={this.updateRental}
        />
        <EditableInput
          entity={rental}
          entityField={"city"}
          className={"rental-city"}
          updateEntity={this.updateRental}
        />
        <EditableInput
          entity={rental}
          entityField={"street"}
          className={"rental-street"}
          updateEntity={this.updateRental}
        />
        <div className="rental-room-info">
          <span>
            <i className="fa fa-building">
              <EditableInput
                entity={rental}
                entityField={"bedrooms"}
                className={"rental-bedrooms"}
                containerStyle={{ display: "inline-block" }}
                updateEntity={this.updateRental}
              />{" "}
              bedrooms
            </i>
          </span>
          <span>
            <i className="fa fa-user">{rental.bedrooms + 4} guests</i>
          </span>
          <span>
            <i className="fa fa-bed">{rental.bedrooms + 2} beds</i>
          </span>
        </div>
        <p className="rental-description">
          <EditableText
            entity={rental}
            entityField={"description"}
            className={"rental-description"}
            containerStyle={{ display: "inline-block" }}
            updateEntity={this.updateRental}
            rows={6}
            cols={50}
          />
        </p>
        <hr />
        <RentalAssets />
      </div>
    );
  }
}

export default connect(
  null,
  { updateRental }
)(RentalDetailUpdate);
