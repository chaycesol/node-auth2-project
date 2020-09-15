const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Users = require('../users/users-model');

const { isValid } = require('../users/users-services.js');

router.post('/register', (req, res) => {
    const creds = req.body;

    if(isValid(creds)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcrypt.hashSync(creds.password, rounds);
        creds.password = hash;

        Users.add(creds)
        .then(user => {
            const token = makeJwt(user);
            res.status(201).json({ data: user, token });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
    } else {
        res.status(400).json({
            message: 'please provide username and password. your password is alphanumeric and case sensitve!'
        });
    }
});

module.exports = router;