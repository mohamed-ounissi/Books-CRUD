const Books = require("../models/Books");

const fetshBooks = async (req, res) => {
  try {
    let BooksToget;
    BooksToget = await Books.find().populate("author").populate("category");
    res.status(200).json(BooksToget);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addBook = async (req, res) => {
  const newBook = new Books(req.body);

  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const Bookstoget = await Books.findOne({ ISBN: req.params.ISBN })
      .populate("author")
      .populate("category");
    res.status(200).json(Bookstoget);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBooks = await Books.findOneAndUpdate(
      { ISBN: req.params.ISBN },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBooks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const Bookstodelete = await Books.findOneAndDelete({
      ISBN: req.params.ISBN,
    });

    if (Bookstodelete) {
      res
        .status(200)
        .json("Book with ISBN: " + req.params.ISBN + " was deleted");
    } else {
      res.status(404).json("Book with ISBN: " + req.params.ISBN + " not found");
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  fetshBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
};
