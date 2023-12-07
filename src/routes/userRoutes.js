// routes/userRoutes.js
const Router = require('@koa/router');
const UserController = require('../controllers/userController');

const router = new Router();

router.post('/search-books', UserController.searchBooks);
router.post('/borrow-book', UserController.borrowBook);
router.post('/reserve-book', UserController.reserveBook);
router.post('/return-book', UserController.returnBook);
router.get('/list-all-books', UserController.listAllBooks);
router.get('/view-book/:id', UserController.viewBookDetails);


// Add more routes as needed

module.exports = router.routes();
