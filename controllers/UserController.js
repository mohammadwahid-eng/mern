const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const FValidator = require("fastest-validator");
const validator = new FValidator();

const registration = (req, res) => {
    // Input data
    let { name, email, password, confirmPassword } = req.body;

    // Validation Rules
    let rules = {
        name: {
            type: "string",
            trim: true,
            messages: {
                required: "Name field is required.",
                string: "Name must be a string."
            }
        },
        email: {
            type: "email",
            normalize: true,
            messages: {
                emailEmpty: "Email field is required.",
                email: "Invalid email address."
            }
        },
        password: {
            type: "string",
            min: 6,
            messages: {
                required: "Password field is required.",
                string: "Password must be a string.",
                stringMin: "Password length must be at least {expected} characters."
            }
        },
        confirmPassword: {
            type: "equal",
            field: "password",
            messages: {
                required: "Confirm password is required.",
                equalField: "Password did not match."
            }
        }
    }

    // Form Validation (Before sending data to server)
    let isValid = validator.validate({ name, email, password, confirmPassword }, rules);
    if (isValid !== true) {
        return res.status(400).json(isValid);
    }

    //Find if email already registered or not
    User.findOne({email})
        .then(user => {
            if (user) {
                return res.status(400).json([
                    {
                        "type": "unique",
                        "message": "Email already exists.",
                        "field": "email"
                    }
                ]);
            }

            //Generate HasPassword
            bcrypt.hash(password, 11, (error, hashPassword) => {
                let user = new User({ name, email, password: hashPassword });
                user.save()
                    .then(user => {
                        res.status(201).json(user);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            });

        })
        .catch(error => {
            res.status(500).json(error);
        });
}

const login = (req, res) => {
    // Input data
    let { email, password } = req.body;

    // Validation Rules
    let rules = {
        email: {
            type: "email",
            normalize: true,
            messages: {
                required: "Email field is required.",
                email: "Invalid email address."
            }
        },
        password: {
            type: "string",
            min: 6,
            messages: {
                required: "Password field is required.",
                string: "Password must be a string.",
                stringMin: "Password length must be at least {expected} characters."
            }
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
                    "type": "equal",
                    "message": "Email is not registered.",
                    "field": "email"
                });
            }

            //User founded, now check password
            bcrypt.compare(password, user.password, (error, result) => {
                if (error) {
                    return res.status(500).json(error);
                }
                if (!result) {
                    res.status(400).json({
                        "type": "equal",
                        "message": "Password does not match.",
                        "field": "password"
                    });
                } else {
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                    res.status(200).json("Bearer " + token);
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

module.exports = {
    registration, login
}