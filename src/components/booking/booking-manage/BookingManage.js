import React, { Component } from "react";
import HeaderWithSearch from "components/shared/HeaderWithSearch";
import { connect } from "react-redux";
import { fetchUserBookings } from "actions";

class BookingManage extends Component {
  componentDidMount() {
    this.props.fetchUserBookings();
  }

  render() {
    const { userBookings } = this.props;
    return (
      <React.Fragment>
        <HeaderWithSearch />
        <div className="container" style={{ marginTop: "80px" }}>
          {userBookings.data.map(booking => {
            return [<p>{booking.startAt}</p>, <p>{booking.guests}</p>];
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userBookings: state.userBookings
  };
};

export default connect(
  mapStateToProps,
  { fetchUserBookings }
)(BookingManage);
