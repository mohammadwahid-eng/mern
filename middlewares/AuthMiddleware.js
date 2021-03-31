const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
            if (error) {
                console.log(error.message);
                res.status(400).json(error.message);
            } else {
                console.log(decoded);
                next();
            }
        });
    } else {
        res.status(400).json({
            message: "Access denied."
        });
    }
}

module.exports = Auth;