// routes/librarianRoutes.js
import Router from '@koa/router';
import librarianController from '../controllers/librarianController.js';
import authenticate from '../middleware/authMiddleware.js';
const librarian = new Router();

librarian.post('/search-books', librarianController.searchBooks);
librarian.post('/add-book',authenticate, librarianController.addBook);
librarian.post('/remove-book',authenticate, librarianController.removeBook);
librarian.post('/register', librarianController.register);
librarian.post('/login', librarianController.login);
librarian.get('/list-all-books', librarianController.listAllBooks);

// Add more routes as needed

export default librarian;
