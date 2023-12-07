// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
