const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const FValidator = require("fastest-validator");
const validator = new FValidator();

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
        return res.status(400).json(isValid);
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

const login = (req, res) => {
    // Input data
    let { email, password } = req.body;
    // Validation Rules
    let rules = {
        email: {
            type: "email",
            normalize: true
        },
        password: {
            type: "string",
            min: 6
        }
    }

    // Form Validation (Server side)
    let isValid = validator.validate({ email, password }, rules);
    if (isValid !== true) {
        res.status(400).json(isValid);
        return;
    }

    // Form is validate now do login
    User.findOne({email})
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: "User not found."
                });
            }

            //User founded, now check password
            bcrypt.compare(password, user.password, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        message: "Server error occurred."
                    });
                }
                if (!result) {
                    res.status(400).json({
                        message: "Password does not match."
                    });
                } else {
                    let token = jwt.sign({
                        _id: user._id
                    }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

                    res.cookie("jwt", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
                    res.status(200).json({
                        message: "Login Proceed.",
                        token: token
                    });
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Server error occurred.",
                error
            });
        });
}

const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({
       message: "Logout success."
    });
}

module.exports = {
    registration, login, logout
}