import React, { Component } from "react";
import EditableComponent from "./EditableComponent";

class EditableText extends EditableComponent {
  renderComponentView = () => {
    const { value, isActive } = this.state;
    const { className, rows, cols } = this.props;
    if (isActive) {
      return (
        <React.Fragment>
          <textarea
            rows={rows}
            cols={cols}
            onChange={event => this.handleChange(event)}
            type="text"
            value={value}
            className={className}
          />
          <button
            className="btn btn-sm btn-danger btn-editable"
            type="button"
            onClick={event => this.update(event)}
          >
            Save
          </button>
          <button
            className="btn btn-sm btn-danger btn-editable"
            type="button"
            onClick={() => this.disableEdit()}
          >
            Close
          </button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <span className={className}>{value}</span>
        <button
          className="btn btn-sm btn-danger btn-editable"
          type="button"
          onClick={() => this.enableEdit()}
        >
          Edit
        </button>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="editableComponent" style={this.props.containerStyle}>
        {this.renderComponentView()}
      </div>
    );
  }
}

export default EditableText;
