import React from "react";
import { toUpperCase } from "helpers";

const BwmSelect = ({
  input,
  label,
  options,
  className,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="input-group">
      <select {...input} className={className}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {toUpperCase(option)}
          </option>
        ))}
      </select>
    </div>
    {touched && (error && <div className="alert alert-danger">{error}</div>)}
  </div>
);

export default BwmSelect;
