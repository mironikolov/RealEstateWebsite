const mongoose = require("mongoose");

const userSchema =mongoose.Schema({
    id: { type: String, required: true},
    username:{ type: String, require:true },
    password:{ type: String, require: true },
    email: { type: String, require: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model( 'User', userSchema );