const { Router } = require('express');
const authController = require('../controllers/authControllers');
const router = Router();
const auth = require('../middleware/auth');

// register handles a post request (user's name, email and password)
router.post('/register', authController.signup);

// login handles user login to the website
router.post('/login', authController.login);

// user is a GET request and check if the user is logged in or not
router.get('/user', auth, authController.get_user);

module.exports = router;