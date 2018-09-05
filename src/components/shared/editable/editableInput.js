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

  renderComponentView = () => {
    const { value, isActive } = this.state;
    if (isActive) {
      return (
        <React.Fragment>
          <input
            onChange={event => this.handleChange(event)}
            type="text"
            value={value}
          />
          <button
            className="btn btn-sm btn-danger"
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
        <p>{value}</p>
        <button
          className="btn btn-sm btn-danger"
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
    return <div>{this.renderComponentView()}</div>;
  }
}

export default editableInput;
