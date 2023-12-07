// routes/librarianRoutes.js
const Router = require('@koa/router');
const LibrarianController = require('../controllers/librarianController');
const { authenticate } = require('../middleware/authMiddleware');
const router = new Router();

router.post('/search-books', LibrarianController.searchBooks);
router.post('/add-book',authenticate, LibrarianController.addBook);
router.post('/remove-book',authenticate, LibrarianController.removeBook);
router.post('/register', LibrarianController.register);
router.post('/login', LibrarianController.login);
router.get('/list-all-books', LibrarianController.listAllBooks);

// Add more routes as needed

module.exports = router.routes();
