const Booking = require("../models/booking");
const Rental = require("../models/rental");
const { normalizeErrors } = require("../helpers/mongoose");
const moment = require("moment");

exports.createBooking = (req, res) => {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guests,
    days
  });

  Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user.id === user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid User!",
              detail: "Cannot create booking on your rental!"
            }
          ]
        });
      }

      if (isValidBooking(booking, foundRental)) {
        foundRental.bookings.push(booking);
        foundRental.save();
        booking.save();
        return res.json({ createdAt: true });
      } else {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid Booking!",
              detail: "Choosen dates are already taken!"
            }
          ]
        });
      }
    });
};

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(booking => {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);
      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }

  return isValid;
}
