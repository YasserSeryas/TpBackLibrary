// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/browse-books', UserController.browseBooks);
router.get('/view-book/:id', UserController.viewBookDetails);

// Add more routes as needed

module.exports = router;
