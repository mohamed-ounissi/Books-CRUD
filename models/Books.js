const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  ISBN: { type: String, required: true, unique: true },
  category: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  ],
  publishedYear: { type: Number },
  coverImage: { type: String },
  language: { type: String },
  isBestseller: { type: Boolean },
  description: { type: String },
});

module.exports = mongoose.model("Books", booksSchema);
