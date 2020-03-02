const User = require('../models/schemas/user');
const sha256 = require('sha256');

async function isAuthenticated (req, res) {
    const { email, password } = req.body;
    try {
    const userData = await {
        email,
        hashedPassword: sha256(password)
        };
    const verifiedUser = await User.find({ email: userData.email, hashedPassword: userData.hashedPassword }, (err, result) => {
        if (err) return console.error(err);
    })
    if (userData.email === verifiedUser[0].email && userData.hashedPassword === verifiedUser[0].hashedPassword) {
        return userData
    } 
    } catch {
        return (console.log('Error'))
    }
};

module.exports = isAuthenticated;