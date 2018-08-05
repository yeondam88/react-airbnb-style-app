const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const { normalizeErrors } = require("../helpers/mongoose");
const UserCtrl = require("../controllers/user");

router.get("/secret", UserCtrl.authMiddleware, (req, res) => {
  res.json({ secret: true });
});

router.get("/:id", (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({
          errors: [
            { title: "Rental Error!", detail: "Could not found rental." }
          ]
        });
      }
      return res.json(foundRental);
    });
});

router.get("", (req, res) => {
  const city = req.query.city;

  if (city) {
    Rental.find({ city: city.toLowerCase() })
      .select("-bookings")
      .exec((err, filteredRentals) => {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (filteredRentals.length === 0) {
          return res.status(422).send({
            errors: [
              {
                title: "No Rentals Found",
                detail: `There are no rentals for city ${city}.`
              }
            ]
          });
        }
        return res.json(filteredRentals);
      });
  } else {
    Rental.find({})
      .select("-bookings")
      .exec((err, foundRentals) => {
        return res.json(foundRentals);
      });
  }
});

module.exports = router;
