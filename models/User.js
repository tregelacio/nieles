const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

// Create User Schema consisting of name, email and password
const UserSchema = new Schema({

    // contains the name of the user
    name: {
        type: String,
        required: true
    },

    // emails must be unique and it will be stored in lowercase
    // emails must also be validated to make sure it belongs to the right user
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },

    // passwords is required for every user and has a minimum length of 6 to be slightly more secure
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },

    // keeps track of the date the user registers for information purposes
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);