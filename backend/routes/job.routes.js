// routes/job.routes.js
//
// Job CRUD routes. Only recruiters can create/update/delete.

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { getApplicants } = require("../controllers/job.controller");

// Public: list jobs
router.get('/', jobController.listJobs);

// Public: view single job
router.get('/:id', jobController.viewJob);


// Protected: recruiter-only routes
router.post('/', authMiddleware, requireRole('recruiter'), jobController.createJob);
router.put('/:id', authMiddleware, requireRole('recruiter'), jobController.updateJob);

router.delete('/:id', authMiddleware, requireRole('recruiter'), jobController.deleteJob);

router.get("/:id/applicants", authMiddleware, requireRole("recruiter"), getApplicants);

module.exports = router;
