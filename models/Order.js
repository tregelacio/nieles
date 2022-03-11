const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    // stores the ID of the user who is the owner of the order
    userId: {
        type: String,
    },

    // stores the items that the user has added to their order
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

    // stores the total cost of the order
    bill: {
        type: Number,
        required: true,
        default: 0
    },

    // stores the date when the order was created
    date_added: {
        type: Date, 
        default: Date.now
    }
})

module.exports = Order = mongoose.model('order', OrderSchema);