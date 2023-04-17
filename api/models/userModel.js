const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    tags: {
      type: Array,
      default: [{name: "Journal", _id: "0"}, {name: "Notes", _id: "1"}]
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema)
