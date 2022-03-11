const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

// Allows the use of the express package
const app = express();
app.use(express.json());

// Set up the server file to only work in production
// serve static content only
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    });
}

// Configure this server file to the MongoDB database
// Then start running server on port 4000
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then((result) => app.listen(port)).catch((err) => console.log(err));