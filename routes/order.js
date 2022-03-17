const { Router } = require('express');
const orderController = require('../controllers/orderControllers');
const router = Router();

// GET request to get all the orders made
// The userID is used to return the correct user's orders
router.get('/order/:id', orderController.get_orders);

// POST request to create a new order
// The userID is used for finding the user
// The payments part is handled by this route
router.post('/order/:id', orderController.checkout);

module.exports = router;