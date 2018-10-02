import React, { Component } from "react";

class editableInput extends Component {
  state = {
    isActive: false,
    value: null,
    originValue: null
  };

  componentDidMount() {
    const { entity, entityField } = this.props;
    const value = entity[entityField];
    this.setState({
      value,
      originValue: value
    });
  }

  disableEdit = () => {
    this.setState({
      isActive: false
    });
  };

  enableEdit = () => {
    this.setState({
      isActive: true
    });
  };

  update = () => {
    const { updateEntity, entityField } = this.props;
    const { value, originValue } = this.state;
    this.setState({
      isActive: false
    });

    if (value !== originValue) {
      updateEntity({
        [entityField]: value
      });
    }
  };

  renderComponentView = () => {
    const { value, isActive } = this.state;
    const { className } = this.props;
    if (isActive) {
      return (
        <React.Fragment>
          <input
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

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    return (
      <div id="editableComponent" style={this.props.containerStyle}>
        {this.renderComponentView()}
      </div>
    );
  }
}

export default editableInput;
