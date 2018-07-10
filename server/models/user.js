const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    max: [32, "Too long max is 32 characters"],
    min: [4, "Too short, minimum 4 characters"]
  },
  email: {
    type: String,
    required: "Email is required",
    lowercase: true,
    unique: true,
    max: [32, "Too long max is 32 characters"],
    min: [4, "Too short, minimum 4 characters"],
    match: [/^\w+([\,-]?\w+)*@\w+([\,-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
    required: "Password is required"
  },
  rentals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rental"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
