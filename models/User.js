const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    email_verified_at: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    remember_token: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;