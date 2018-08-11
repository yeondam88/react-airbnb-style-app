const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/user");
const RentalCtrl = require("../controllers/rental");

router.get("/secret", UserCtrl.authMiddleware, RentalCtrl.secret);

router.get("/manage", UserCtrl.authMiddleware, RentalCtrl.getUserRentals);

router.get("/:id", RentalCtrl.getRentalById);

router.delete("/:id", UserCtrl.authMiddleware, RentalCtrl.deleteRentalById);

router.get("", RentalCtrl.getRentals);

router.post("", UserCtrl.authMiddleware, RentalCtrl.createRental);

module.exports = router;
