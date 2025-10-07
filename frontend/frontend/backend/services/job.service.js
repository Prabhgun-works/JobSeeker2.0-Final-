// services/job.service.js
//
// Business logic around jobs.

const jobRepo = require('../repositories/jobRepository');
const userRepo = require('../repositories/userRepository');


async function listJobs(query) {
  // pagination/filters would be here; for now return all
  return await jobRepo.findAll();
}


async function getJobById(id) {
  const job = await jobRepo.findById(Number(id));

  if (!job) {
    const err = new Error('Job not found');
    err.status = 404;
    throw err;
  }

  return job;
}


async function createJob(recruiterId, payload) {

  // ensure recruiter exists and is recruiter
  const recruiter = await userRepo.findById(recruiterId);

  if (!recruiter || recruiter.role !== 'recruiter') {
    const err = new Error('Only recruiters can post jobs');
    err.status = 403;
    throw err;
  }

  const job = {
    title: payload.title,
    description: payload.description,
    company: payload.company,
    location: payload.location,
    recruiterId: Number(recruiterId)
  };

  const created = await jobRepo.create(job);

  return created;
}


async function updateJob(recruiterId, jobId, payload) {

  const job = await jobRepo.findById(Number(jobId));

  if (!job) {
    const err = new Error('Job not found');
    err.status = 404;
    throw err;
  }

  if (job.recruiterId !== Number(recruiterId)) {
    const err = new Error('Forbidden: you do not own this job');
    err.status = 403;
    throw err;
  }

  const updated = await jobRepo.update(Number(jobId), payload);

  return updated;
}


async function deleteJob(recruiterId, jobId) {

  const job = await jobRepo.findById(Number(jobId));

  if (!job) {
    const err = new Error('Job not found');
    err.status = 404;
    throw err;
  }

  if (job.recruiterId !== Number(recruiterId)) {
    const err = new Error('Forbidden: you do not own this job');
    err.status = 403;
    throw err;
  }

  await jobRepo.delete(Number(jobId));

  return;
}


module.exports = { listJobs, getJobById, createJob, updateJob, deleteJob };