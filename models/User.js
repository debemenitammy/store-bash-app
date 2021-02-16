const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Users schema
const User = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile_number: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    dateGenerated: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('User', User);