// services/application.service.js
//
// Logic for applying to jobs and updating statuses.

const applicationRepo = require('../repositories/applicationRepository');
const jobRepo = require('../repositories/jobRepository');
const userRepo = require('../repositories/userRepository');


async function applyToJob({ jobId, candidateId, resumePath }) {

  // validate job exists
  const job = await jobRepo.findById(Number(jobId));
  if (!job) {
    const err = new Error('Job not found');
    err.status = 404;
    throw err;
  }

  // validate candidate
  const candidate = await userRepo.findById(Number(candidateId));
  if (!candidate || candidate.role !== 'candidate') {
    const err = new Error('Only candidates can apply');
    err.status = 403;
    throw err;
  }

  // create application
  const app = {
    jobId: Number(jobId),
    candidateId: Number(candidateId),
    resumeUrl: resumePath || candidate.resumePath || '',
    status: 'PENDING'
  };

  const created = await applicationRepo.create(app);

  return created;
}


async function getApplicationsByCandidate(candidateId) {
  return await applicationRepo.findByCandidate(Number(candidateId));
}


async function updateStatus(recruiterId, applicationId, status) {

  // fetch application
  const app = await applicationRepo.findById(Number(applicationId));
  if (!app) {
    const err = new Error('Application not found');
    err.status = 404;
    throw err;
  }

  // verify recruiter owns the job
  const job = await jobRepo.findById(Number(app.jobId));
  if (!job || job.recruiterId !== Number(recruiterId)) {
    const err = new Error('Forbidden: cannot update this application');
    err.status = 403;
    throw err;
  }

  const updated = await applicationRepo.updateStatus(Number(applicationId), status);

  return updated;
}


module.exports = { applyToJob, getApplicationsByCandidate, updateStatus };