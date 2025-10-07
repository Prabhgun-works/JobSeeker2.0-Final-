// controllers/application.controller.js
//
// Handles applying to jobs and managing application status.

const applicationService = require('../services/application.service');
const { ok, created } = require('../utils/response');


async function applyToJob(req, res, next) {
  try {

    const jobId = req.params.jobId;
    const candidateId = req.user.id;

    // If file was uploaded, multer attached file info to req.file
    const resumePath = req.file ? req.file.path : req.user.resume_path || null;


    const application = await applicationService.applyToJob({
      jobId,
      candidateId,
      resumePath
    });


    return created(res, application, 'Applied to job');


  } catch (err) {
    return next(err);
  }
}


async function myApplications(req, res, next) {
  try {
    const candidateId = req.user.id;

    const rows = await applicationService.getApplicationsByCandidate(candidateId);

    return ok(res, rows, 'My applications');
  } catch (err) {
    return next(err);
  }
}


async function updateStatus(req, res, next) {
  try {
    const applicationId = req.params.id;
    const recruiterId = req.user.id;
    const { status } = req.body;

    const updated = await applicationService.updateStatus(recruiterId, applicationId, status);

    return ok(res, updated, 'Status updated');
  } catch (err) {
    return next(err);
  }
}


module.exports = { applyToJob, myApplications, updateStatus };
