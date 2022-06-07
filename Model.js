const mongoose = require("mongoose");
const validatornpm = require("validator");
const usersPlaylist = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: [3, "username should contain atleast 3 characters"],
    maxlength: [40, "username cannot larger than 40 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email adress is already present"],
    validate: {
      validator: function (val) {
        return validatornpm.isEmail(val);
      },
      message: "Please enter valid email",
    },
  },
  phone: {
    type: String,
    min: 7,
    unique: true,
  },
  address: {
    type: String,
    minlength: 5,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = new mongoose.model("User", usersPlaylist);

module.exports = User;
