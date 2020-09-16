const router = require('express').Router();
const bcrypt = require('bcryptjs');


const Users = require('../users/users-model');

const { isValid, makeJwt } = require('../users/users-services.js');

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

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (isValid(req.body)) {
        Users.findBy({ username: username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = makeJwt(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
            console.log(err)
        });
    } else {
        res.status(400),json({
            message: "You shall not pass!"
        });
    }
});




module.exports = router;