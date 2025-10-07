// controllers/users.controller.js
//
// User-related controllers: profile read, resume upload (single resume only).

const userService = require('../services/user.service');


async function getProfile(req, res, next) {

  try {

    const userId = req.user.id;

    const profile = await userService.getProfile(userId);

    return res.status(200).json({ message: 'Profile fetched', data: profile });

  } catch (err) {
    return next(err);
  }
}


async function uploadResume(req, res, next) {

  try {

    // multer attaches file to req.file
    if (!req.file) {
      const err = new Error('No file uploaded');
      err.status = 400;
      throw err;
    }

    // update user record with resume path
    const resumePath = req.file.path;

    const updated = await userService.updateResume(req.user.id, resumePath);

    return res.status(200).json({ message: 'Resume uploaded', data: updated });

  } catch (err) {
    return next(err);
  }
}


module.exports = { getProfile, uploadResume };