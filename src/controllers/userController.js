// controllers/userController.js
import User from '../models/userModel.js';
import Book from '../models/bookModel.js';
import { hash, compare } from 'bcrypt';
import  generateToken  from '../utils/auth.js';

const UserController = {
  register: async (ctx) => {
    const { username, email, password } = ctx.request.body;

    try {
      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        ctx.status = 400;
        ctx.body = { error: 'Username or email already exists' };
        return;
      }

      // Hash the password before saving it
      const hashedPassword = await hash(password, 10);

      const newUser = new User({ username, email, password: hashedPassword });
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
      // Find the user by username and select the password field
      const user = await User.findOne({ username }).select('password');
  
      // Check if the user exists
      if (!user) {
        ctx.status = 401; // Unauthorized
        ctx.body = { error: 'Invalid username or password' };
        return;
      }
  
      // Check if the password is correct
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        ctx.status = 401; // Unauthorized
        ctx.body = { error: 'Invalid username or password' };
        return;
      }
  
      // Generate a JWT token
      const token = generateToken(user._id, 'user');
  
      // Send the token in the response
      ctx.body = { token, message: 'Login successful' };
    } catch (error) {
      console.error('Error during login:', error);
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
      const user = await Book.findById(userId);
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
      const user = await Book.findById(userId);
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
      const user = await Book.findById(userId);
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
  },
};

export default UserController;
