// models/book.js
import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  ISBN: String,
  title: String,
  author: String,
  genre: String,
  availableCopies: Number,
});

const Book = model('Book', bookSchema);

export default Book;
