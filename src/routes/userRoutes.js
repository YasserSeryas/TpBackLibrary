// userRoutes.js
import Router from '@koa/router';
import  UserController from '../controllers/userController.js';
import authenticate from '../middleware/authMiddleware.js';

const user = new Router();

user.post('/register', UserController.register);
user.post('/login', UserController.login);
user.post('/search-books', UserController.searchBooks);
user.post('/borrow-book', authenticate, UserController.borrowBook);
user.post('/reserve-book', authenticate, UserController.reserveBook);
user.post('/return-book', authenticate, UserController.returnBook);
user.get('/list-all-books', UserController.listAllBooks);


export default user;
