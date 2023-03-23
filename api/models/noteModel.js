const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: String,
    text: {
      type: String,
    },
    date: {
        type: String,
    },
    tagList: Array
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);