// services/auth.service.js
//
// Auth business logic: register + login.
// Uses userRepository and utils for hashing + token.

const userRepo = require('../repositories/userRepository');
const { hashPassword, verifyPassword } = require('../utils/hash');
const { signToken } = require('../utils/token');


async function register(payload) {

  // Quick validation
  if (!payload.email || !payload.password || !payload.name) {
    const err = new Error('Missing required fields: name, email, password');
    err.status = 400;
    throw err;
  }


  // Check existing email
  const existing = await userRepo.findByEmail(payload.email);

  if (existing) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }


  // Hash password before storing
  const hashed = await hashPassword(payload.password);


  const user = {
    name: payload.name,
    email: payload.email,
    password: hashed,
    role: payload.role || 'candidate'
  };


  const created = await userRepo.create(user);


  // Remove password before returning
  delete created.password;


  // Sign token
  const token = signToken({
    id: created.id,
    email: created.email,
    role: created.role
  });


  return { user: created, token };
}


async function login({ email, password }) {

  if (!email || !password) {
    const err = new Error('Email and password required');
    err.status = 400;
    throw err;
  }


  const user = await userRepo.findByEmail(email);

  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }


  const ok = await verifyPassword(password, user.password);

  if (!ok) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }


  // Strip password from returned user
  delete user.password;


  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role
  });


  return { user, token };
}


module.exports = { register, login };