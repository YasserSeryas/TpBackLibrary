// models/book.js
import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    lowercase: true,
    required: true,
  },
  author: {
    type: String,
    lowercase: true,
    required: true,
  },
  genre: {
    type: String,
    lowercase: true,
    required: true,
  },
  availableCopies: {
    type: Number,
    required: true,
  },
  
});

const Book = model('Book', bookSchema);

export default Book;
