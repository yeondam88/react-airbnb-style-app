const express = require("express");
const router = express.Router();

const UserCtrl = require("../controllers/user");
const BookingCtrl = require("../controllers/booking");

router.post("/bookings", UserCtrl.authMiddleware, BookingCtrl.createBooking);

module.exports = router;
