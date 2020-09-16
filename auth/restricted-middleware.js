const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || 'shhhh!';

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Inside if = You shall not pass!',
                                        error: err.message })
            } else {
                req.jwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "OUtside if = You shall not pass!" });
    }
};