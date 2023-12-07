// controllers/librarianController.js
import Librarian from '../models/librarianModel.js';
import Book from '../models/bookModel.js';
import { hash, compare } from 'bcrypt';

const LibrarianController = {
  register: async (ctx) => {
    const { username, email, password } = ctx.request.body;

    try {
      // Check if the username or email already exists
      const existingLibrarian = await Librarian.findOne({ $or: [{ username }, { email }] });
      if (existingLibrarian) {
        ctx.status = 400;
        ctx.body = { error: 'Username or email already exists' };
        return;
      }

      // Hash the password before saving it
      const hashedPassword = await hash(password, 10);

      const newLibrarian = new Librarian({ username, email, password: hashedPassword });
      await newLibrarian.save();

      ctx.status = 201;
      ctx.body = { message: 'Librarian registered successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },
    
  login: async (ctx) => {
    const { username, password } = ctx.request.body;
  
    try {
      // Find the user by username and select the password field
      const librarian = await Librarian.findOne({ username }).select('password');
  
      // Check if the user exists
      if (!librarian) {
        ctx.status = 401; // Unauthorized
        ctx.body = { error: 'Invalid username or password' };
        return;
      }
  
      // Check if the password is correct
      const isPasswordValid = await compare(password, librarian.password);
      if (!isPasswordValid) {
        ctx.status = 401; // Unauthorized
        ctx.body = { error: 'Invalid username or password' };
        return;
      }
  
      // Generate a JWT token
      const token = generateToken(librarian._id, 'user');
  
      // Send the token in the response
      ctx.body = { token, message: 'Login successful' };
    } catch (error) {
      console.error('Error during login:', error);
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
  listAllBooks: async (ctx) => {
    try {
      const books = await Book.find();
      ctx.body = books;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },
  addBook: async (ctx) => {
    const { ISBN, title, author, genre, availableCopies } = ctx.request.body;

    try {
      // Check if the book with the same ISBN already exists
      const existingBook = await Book.findOne({ ISBN });
      if (existingBook) {
        ctx.status = 400;
        ctx.body = { error: 'Book with the same ISBN already exists' };
        return;
      }

      // Create a new book
      const newBook = new Book({
        ISBN,
        title,
        author,
        genre,
        availableCopies,
      });

      // Save the new book to the catalog
      await newBook.save();

      ctx.status = 201;
      ctx.body = { message: 'Book added to the catalog successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }

  },

  removeBook: async (ctx) => {
    const { bookId } = ctx.request.body;

    try {
      // Check if the book exists
      const existingBook = await Book.findById(bookId);
      if (!existingBook) {
        ctx.status = 404;
        ctx.body = { error: 'Book not found' };
        return;
      }

      // Remove the book from the catalog
      await existingBook.remove();

      ctx.body = { message: 'Book removed from the catalog successfully' };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  },

};

export default LibrarianController;
