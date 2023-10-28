const mongoose = require('mongoose');

// Schema and model definition for Category
const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    enum: [
      "Horror",
      "Mystery",
      "Science Fiction",
      "Romance",
      "Fantasy",
      "Non-Fiction",
      "Other",
    ],
    required: true,
  },
}, { timestamps: true });

const Category = mongoose.model("Category", CategorySchema); 

module.exports = Category;
