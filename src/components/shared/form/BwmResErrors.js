import React from "react";

const BwmResErrors = ({ errors }) => {
  return (
    errors.length > 0 && (
      <div className="alert alert-danger bwm-res-errors">
        {errors.map((error, index) => <p key={index}>{error.detail}</p>)}
      </div>
    )
  );
};

export default BwmResErrors;
