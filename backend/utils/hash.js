// utils/hash.js
//
// Small wrapper around bcrypt for hashing + verifying passwords.

const bcrypt = require('bcrypt');
const config = require('../config/config');


async function hashPassword(plain) {


  // Use BCRYPT_SALT_ROUNDS from config (defaults to 10).
  const saltRounds = config.BCRYPT_SALT_ROUNDS;


  return bcrypt.hash(plain, saltRounds);
}


async function verifyPassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}


module.exports = { hashPassword, verifyPassword };
