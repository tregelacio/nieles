const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create ItemSchema using title, description, category, price and date_added
const ItemSchema = new Schema({

    // stores the name of the item in the store
    title: {
        type: String,
        required: true
    },

    // stores the description of an item
    description: {
        type: String,
        required: true
    },

    // store the name of the category the item belongs to
    category: {
        type: String,
        required: true
    },

    // stores the price of the item
    price: {
        type: Number,
        required: true
    },

    // stores the date of when the item was added to the store
    date_added: {
        type: Date,
        default: Date.now
    },
});

module.exports = Item = mongoose.model('item', ItemSchema);