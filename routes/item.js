const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

// GET request to get all items from the server
router.get('/items', itemController.get_items);

// POST request to add a new item to the database
router.post('/items', itemController.post_item);

// PUT request to update existing items in the database
router.put('/items/:id', itemController.update_item);

// DELETE request to delete items from the database
router.delete('/items/:id', itemController.delete_item);

module.exports = router;