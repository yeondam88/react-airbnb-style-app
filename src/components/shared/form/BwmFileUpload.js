import React, { Component } from "react";

class BwmFileUpload extends Component {
  onChange = event => {
    const {
      input: { onChange }
    } = this.props;
    onChange("https://source.unsplash.com/random/600x400");
  };

  render() {
    const {
      label,
      meta: { touched, error }
    } = this.props;
    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="input-group">
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={this.onChange}
          />
        </div>
        {touched &&
          (error && <div className="alert alert-danger">{error}</div>)}
      </div>
    );
  }
}

export default BwmFileUpload;
