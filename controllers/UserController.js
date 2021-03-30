const bcrypt = require("bcrypt");
const User = require("../models/User");
const FValidator = require("fastest-validator");
const validator = new FValidator();

const login = (req, res) => {
    res.status(200).json({
        message: "login"
    })
}

const registration = (req, res) => {
    // Input data
    let { first_name, last_name, email, password, confirmPassword } = req.body;

    // Validation Rules
    let rules = {
        first_name: {
            type: "string",
            empty: false,
            trim: true,
            alphanum: false
        },
        last_name: {
            type: "string",
            empty: false,
            trim: true,
            alphanum: false
        },
        email: {
            type: "email",
            normalize: true
        },
        password: {
            type: "string",
            min: 6
        },
        confirmPassword: {
            type: "equal",
            field: "password"
        }
    }

    // Form Validation (Server side)
    let isValid = validator.validate({ first_name, last_name, email, password, confirmPassword }, rules);
    if (isValid !== true) {
        res.status(400).json(isValid);
        return;
    }

    // Form is validate now do registration
    bcrypt.hash(password, 11, (error, hashPassword) => {
        let user = new User({
            first_name,
            last_name,
            email,
            password: hashPassword
        });
        user.save()
            .then(user => {
                res.status(201).json({
                    message: "User created successfully",
                    user
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: "Server error occurred",
                    error
                });
            });
    });

}

module.exports = {
    login, registration
}