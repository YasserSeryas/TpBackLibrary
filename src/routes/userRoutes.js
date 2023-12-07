// routes/userRoutes.js
const Router = require('@koa/router');
const UserController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = new Router();
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/search-books', UserController.searchBooks);
router.post('/borrow-book', authenticate, UserController.borrowBook);
router.post('/reserve-book', authenticate, UserController.reserveBook);
router.post('/return-book', authenticate, UserController.returnBook);
router.get('/list-all-books', UserController.listAllBooks);
router.get('/view-book/:id', UserController.viewBookDetails);

// Add more routes as needed

module.exports = router.routes();

