const Booking = require("../models/booking");

exports.createBooking = (req, res) => {
  res.json({
    bookingCreated: "true"
  });
};
