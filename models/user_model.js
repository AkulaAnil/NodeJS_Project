const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Pls Add the username"]
    },
    email: {
        type: String,
        required: [true, "Pls Add a email address"],
        unique: [true, "Email address already Taken !"]
    },
    password: {
        type: String,
        required: [true, "Pls Add the password"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("users", userSchema);
