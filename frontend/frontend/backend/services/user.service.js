// services/user.service.js
//
// Profile and resume update logic.

const userRepo = require('../repositories/userRepository');


async function getProfile(userId) {

  const user = await userRepo.findById(userId);

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  // don't include the password
  delete user.password;

  return user;
}


async function updateResume(userId, resumePath) {

  const updated = await userRepo.update(userId, { resumePath });

  // remove password if present
  if (updated.password) delete updated.password;

  return updated;
}


module.exports = { getProfile, updateResume };