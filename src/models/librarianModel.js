// models/librarian.js
const mongoose = require('mongoose');

const librarianSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  managedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const Librarian = mongoose.model('Librarian', librarianSchema);

module.exports = Librarian;
