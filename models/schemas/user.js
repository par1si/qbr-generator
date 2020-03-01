const mongoose = require('mongoose');
const sha256 = require('sha256');

const userSchema = new mongoose.Schema({
    hashedPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
userSchema.methods.comparePassword = function comparePassword(password) {
    return this.hashedPassword === sha256(password);
};

module.exports = mongoose.model('User', userSchema);