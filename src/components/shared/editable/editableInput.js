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

  render() {
    const { value } = this.state;
    return (
      <div>
        <input type="text" value={value} />
      </div>
    );
  }
}

export default editableInput;
