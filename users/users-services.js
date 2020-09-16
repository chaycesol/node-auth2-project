const jwt = require("jsonwebtoken");

module.exports = {
    isValid,
    checkDept,
    makeJwt
  };
  
  function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }
  

  function checkDept(department) {
    return (req, res, next) => {
      if (department === req.jwt.department) {
        next(); // departn is allowed, so continue on 
      } else {
        res.status(403).json({message: 'department does not match'}); // user can't access based on department
      }
    }
  }

  function makeJwt({ id, username, department }) {
    const payload = {
        username,
        department,
        subject: id,
    };
    const config = {
        jwtSecret: process.env.JWT_SECRET || 'shhhh!',
    };
    const options = {
        expiresIn: "8 hours",
    };
    return jwt.sign(payload, config.jwtSecret, options);
}