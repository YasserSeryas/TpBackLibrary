// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

const UserController = {
  register: async (ctx) => {
    const { username, password } = ctx.request.body;

    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        ctx.status = 400;
        ctx.body = { error: 'Username already exists' };
        return;
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      ctx.status = 201;
      ctx.body = { message: 'User registered successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },
  login: async (ctx) => {
    const { username, password } = ctx.request.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });

      // Check if the user exists and if the password is correct
      if (!user || !(await bcrypt.compare(password, user.password))) {
        ctx.status = 401; // Unauthorized
        ctx.body = { error: 'Invalid username or password' };
        return;
      }

      // Generate a JWT token
      const token = generateToken(user._id, 'user');

      // Send the token in the response
      ctx.body = { token, message: 'Login successful' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
},
  listAllBooks: async (ctx) => {
    try {
      const books = await Book.find();
      ctx.body = books;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },

  
  searchBooks: async (ctx) => {
    const { query } = ctx.request.body;

    try {
      const books = await Book.find({ $text: { $search: query } });
      ctx.body = books;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },

  borrowBook: async (ctx) => {
    const { userId, bookId } = ctx.request.body;

    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
      }

      // Check if the book is available
      const book = await Book.findById(bookId);
      if (!book || !book.isAvailable()) {
        ctx.status = 400;
        ctx.body = { error: 'Book not available for borrowing' };
        return;
      }

      // Update user's borrowed books and decrease available copies
      user.borrowedBooks.push(book);
      await user.save();

      book.availableCopies -= 1;
      await book.save();

      ctx.body = { message: 'Book borrowed successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },

  reserveBook: async (ctx) => {
    const { userId, bookId } = ctx.request.body;

    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
      }

      // Check if the book is available for reservation
      const book = await Book.findById(bookId);
      if (!book || book.availableCopies === 0) {
        ctx.status = 400;
        ctx.body = { error: 'Book not available for reservation' };
        return;
      }

      // Update user's reserved books
      user.reservedBooks.push(book);
      await user.save();

      ctx.body = { message: 'Book reserved successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },

  returnBook: async (ctx) => {
    const { userId, bookId } = ctx.request.body;

    try {
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
      }

      // Check if the user has borrowed the book
      const borrowedBookIndex = user.borrowedBooks.findIndex((book) => book.toString() === bookId);
      if (borrowedBookIndex === -1) {
        ctx.status = 400;
        ctx.body = { error: 'User has not borrowed this book' };
        return;
      }

      // Remove the book from user's borrowed books
      user.borrowedBooks.splice(borrowedBookIndex, 1);
      await user.save();

      // Increase available copies of the book
      const book = await Book.findById(bookId);
      book.availableCopies += 1;
      await book.save();

      ctx.body = { message: 'Book returned successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },e
};

module.exports = UserController;
