const express = require('express');
const router = express.Router();
const User = require('../models/schemas/user');
const sha256 = require('sha256');

router.get('/', async (req, res) => {
    try {
    const users = await User.find({}, (err, result) => {
        if (err) return console.error(err);
    })
    res.render('user.ejs', {
        users: users
    }
    )
    } catch {
    res.send('Something went wrong')
    }
});

router.post('/add-user', async (req, res) => {
    const { email, password } = req.body;
    try {
    const userData = await {
        email,
        hashedPassword: sha256(password)
        };
        const newUser = new User(userData);
        newUser.save().then(
            res.redirect('/')
        )
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    } catch {
        res.send('Error saving user.')
    }
})

module.exports = router;