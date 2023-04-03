const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: String,
    text: {
      type: String,
    },
    date: {
        type: String,
        required: true
    },
    tagList: Array
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);