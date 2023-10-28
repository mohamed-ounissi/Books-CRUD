const express = require("express");
const router = express.Router();
const Author = require("../models/author");

module.exports.addAnAuthor = async (req, res) => {
  try {
    const { lastName, firstName, nationality } = req.body;

    const newAuthor = new Author({
      lastName,
      firstName,
      nationality,
    });

    const savedAuthor = await newAuthor.save();

    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json(error);
  }
};
