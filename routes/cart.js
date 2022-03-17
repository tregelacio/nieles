const { Router } = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();

// GET request to get all items in the cart of the user
// The userID is passed as a parameter
router.get('/cart/:id', cartController.get_cart_items);

// POST request to add an item to the cart
// The userID is also passed as a parameter to identify which user is adding the item to their cart
router.post('/cart/:id', cartController.add_cart_item);

// DELETE request removes the item from the cart
// userID and itemID is passed as parameters
// userID is to get the cart of the user
// itemID is to search for the certain item and remove it from cart
router.delete('/cart/:userId/:itemId', cartController.delete_item);

module.exports = router;