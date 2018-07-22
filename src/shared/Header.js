import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="navbar navbar-dark navbar-expand-lg">
    <div className="container">
      <Link to="/" className="navbar-brand">
        BookWithMe
      </Link>
      <form action="" className="form-inline my-2 my-lg-0">
        <input
          type="search"
          className="form-control mr-sm-2 bwm-search"
          placeholder="Try 'New York'"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
          type="submit"
        >
          Search
        </button>
      </form>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <a href="" className="nav-item nav-link active">
            Login <span className="sr-only">(current)</span>
          </a>
          <a href="" className="nav-item nav-link">
            Register
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
