// controllers/job.controller.js
//
// Job controllers: minimal, readable, and delegating to service layer.


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jobService = require('../services/job.service');
const { ok, created } = require('../utils/response');


async function listJobs(req, res, next) {
  try {
    const jobs = await jobService.listJobs(req.query);
    return ok(res, jobs, 'Jobs fetched');
  } catch (err) {
    return next(err);
  }
}


async function viewJob(req, res, next) {
  try {
    const id = req.params.id;
    const job = await jobService.getJobById(id);
    return ok(res, job, 'Job fetched');
  } catch (err) {
    return next(err);
  }
}


async function createJob(req, res, next) {
  console.log(req.user, req.body); // helpful for debugging

  try {
    const { title, description, company, location } = req.body;

    if (!title || !description || !company || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        location,
        recruiterId: req.user.id,
      },
    });

    return res.status(201).json({ message: 'Job created', data: job });
  } catch (err) {
    console.error('Error in createJob:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function updateJob(req, res, next) {
  try {
    const id = req.params.id;
    const payload = req.body;
    const recruiterId = req.user.id;

    const job = await jobService.updateJob(recruiterId, id, payload);

    return ok(res, job, 'Job updated');
  } catch (err) {
    return next(err);
  }
}


async function deleteJob(req, res, next) {
  try {
    const id = req.params.id;
    const recruiterId = req.user.id;

    await jobService.deleteJob(recruiterId, id);

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}
async function getApplicants(req, res, next) {
  try {
    const { id } = req.params;
    const applicants = await jobRepository.findApplicantsByJob(id);
    res.json({ message: "Applicants fetched", data: applicants });
  } catch (err) {
    next(err);
  }
}

module.exports = { getApplicants, listJobs, viewJob, createJob, updateJob, deleteJob };
