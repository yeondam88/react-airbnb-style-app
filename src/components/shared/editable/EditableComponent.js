import React, { Component } from "react";

class EditableComponent extends Component {
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

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };
}

export default EditableComponent;
