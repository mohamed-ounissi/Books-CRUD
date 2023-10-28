const express = require("express");
const router = express.Router();
const Author = require("../models/category");

module.exports.addCategory = async (req, res) => {
  try {
    const { title } = req.body;

    const newCategory = new Author({
      title,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};
