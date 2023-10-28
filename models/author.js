const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Author", authorSchema);
