import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const style = {
  background: `url(${process.env.PUBLIC_URL}/img/main-bg.jpg)`
};

class Main extends Component {
  state = {
    searchTerm: ""
  };

  searchInput = React.createRef();

  handleSearchInput = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleSearchSubmit = () => {
    const { history } = this.props;
    const city = this.searchInput.current.value;

    city ? history.push(`/rentals/${city}/homes`) : history.push("/rentals");
  };

  render() {
    return (
      <main className="main-cover" style={style}>
        <div className="search-container">
          <div className="content-area">
            <h1 className="main-title">
              Book unique homes <br />
              and experiences all over the world.
            </h1>
            <div className="form-container">
              <form onSubmit={this.handleSearchSubmit}>
                <input
                  className="search-box"
                  type="text"
                  placeholder="Try New York"
                  ref={this.searchInput}
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(Main);
