import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class RentalSearchInput extends Component {
  searchInput = React.createRef();

  handleSearch = () => {
    const { history } = this.props;
    const city = this.searchInput.current.value;

    city ? history.push(`/rentals/${city}/homes`) : history.push("/rentals");
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="form-inline my-2 my-lg-0">
        <input
          type="search"
          className="form-control mr-sm-2 bwm-search"
          placeholder="Try 'New York'"
          aria-label="Search"
          ref={this.searchInput}
          onKeyPress={event => {
            this.handleKeyPress(event);
          }}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
          type="submit"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default withRouter(RentalSearchInput);
