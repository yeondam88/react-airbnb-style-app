import React, { Component } from "react";
import Header from "./shared/Header";
import RentalList from "./components/rental/RentalList";
import RentalDetail from "./components/rental/RentalDetail";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <RentalList />
          <RentalDetail />
        </div>
      </div>
    );
  }
}

export default App;
