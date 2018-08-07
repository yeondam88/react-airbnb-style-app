import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRentals } from "actions";

const style = {
  background: `url(${process.env.PUBLIC_URL}/img/main-bg.jpg)`
};

class Main extends Component {
  state = {
    searchTerm: ""
  };

  handleSearchInput = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleSearchSubmit = () => {
    this.props.fetchRentals(this.state.searchTerm);
  };

  render() {
    console.log(this.props);
    return (
      <main className="main-cover" style={style}>
        <div className="search-container">
          <div className="content-area">
            <h1 className="main-title">
              Book unique homes <br />and experiences all over the world.
            </h1>
            <div className="form-container">
              <form onSubmit={this.handleSearchSubmit}>
                <input
                  className="search-box"
                  type="text"
                  placeholder="Try New York"
                  onChange={this.handleSearchInput}
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default connect(
  null,
  { fetchRentals }
)(Main);
