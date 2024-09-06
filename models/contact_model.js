const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the email"]
    },
    phone: {
        type: Number,
        required: [true, "Please add the phone number"]
    },
});

module.exports = mongoose.model("Contact", contactSchema);