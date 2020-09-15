module.exports = {
    isValid,
    checkDept
  };
  
  function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }
  

  function checkDept(department) {
    return (req, res, next) => {
      if (department === req.jwt.department) {
        next(); // role is allowed, so continue on 
      } else {
        res.status(403).json({message: 'department does not match'}); // user can't access based on role
      }
    }
  }