// models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ISBN: String,
  title: String,
  author: String,
  genre: String,
  availableCopies: Number,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
