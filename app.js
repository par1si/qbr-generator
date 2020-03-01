require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = 3000;


// Defining Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user.router');

// View Engine, Parsing Form Entries & Static File Directory
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views')
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

// Defining DB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`Database connected!`)
});

// Using Routes
app.use('/qbr', indexRouter);
app.use('/', userRouter);

// Starting the server
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}.`);
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
});