require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));


// View Engine, Parsing Form Entries & Static File Directory
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Defining DB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`Database connected!`)
});

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Starting the server
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}.`);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
});