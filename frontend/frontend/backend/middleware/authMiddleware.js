// middleware/authMiddleware.js
//
// Verifies JWT token on protected routes.
// Attaches `req.user = { id, email, role }` when valid.

const jwt = require('jsonwebtoken');
const config = require('../config/config');


function authMiddleware(req, res, next) {


  const header = req.headers.authorization;


  if (!header) {
    return res.status(401).json({ message: 'Authorization header required' });
  }


  const parts = header.split(' ');


  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }


  const token = parts[1];


  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Minimal user payload: id, email, role
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };


    return next();


  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}


module.exports = { authMiddleware };
