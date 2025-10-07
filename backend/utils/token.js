// utils/token.js
//
// Create and sign JWT tokens. Keep payload minimal.

const jwt = require('jsonwebtoken');
const config = require('../config/config');


function signToken(payload) {


  // We intentionally include only id/email/role in token.
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN
  });


  return token;
}


module.exports = { signToken };
