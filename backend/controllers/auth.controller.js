// controllers/auth.controller.js
//
// Thin controller layer for authentication.

const authService = require('../services/auth.service');


async function register(req, res, next) {

  try {

    const payload = req.body;

    const result = await authService.register(payload);
    console.log("Login payload:", req.body);

    // created user + token
    return res.status(201).json({ message: 'User registered', data: result });
  } catch (err) {
    return next(err);
  }
}


async function login(req, res, next) {

  try {

    const { email, password } = req.body;

    const result = await authService.login({ email, password });
    console.log("Login payload:", req.body);

    return res.status(200).json({ message: 'Login successful', data: result });

  } catch (err) {
    return next(err);
  }
}


module.exports = { register, login };