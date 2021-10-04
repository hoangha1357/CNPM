const jwt = require('jsonwebtoken');

module.exports = function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      res.redirect('/loginpage');
    }
  }