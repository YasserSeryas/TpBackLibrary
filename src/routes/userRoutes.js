// userRoutes.js
import Router from '@koa/router';
import  UserController from '../controllers/userController.js';
import {authenticate,resolveRole} from '../middleware/authMiddleware.js';
import compose from 'koa-compose';
const isAuthentificatedAndResolveUser = compose([authenticate, resolveRole])
const user = new Router();

user.post('/register', UserController.register);
user.post('/login', UserController.login);
user.post('/search-books', UserController.searchBooks);
user.post('/borrow-book', authenticate, UserController.borrowBook);
user.post('/reserve-book', authenticate, UserController.reserveBook);
user.post('/return-book', authenticate, UserController.returnBook);
user.get('/list-all-books', UserController.listAllBooks);
user.post('/add-book',isAuthentificatedAndResolveUser, UserController.addBook);
user.del('/remove-book',isAuthentificatedAndResolveUser, UserController.removeBook);
user.post('/update-book', isAuthentificatedAndResolveUser, UserController.updateBook);



export default user;
