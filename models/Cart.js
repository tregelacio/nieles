const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create CartSchema with userId, items and bill fields
const CartSchema = new Schema({

    // stores the ID of the user who is the owner of the cart
    userId: {
        type: String,
    },

    // stores the items that the user has added to their cart
    items: [{

        // an item has an ID, name, amount and a price
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1'],
            default: 1
        },
        price: Number
    }],

    // stores the total cost of the cart
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = Cart = mongoose.models('cart', CartSchema);