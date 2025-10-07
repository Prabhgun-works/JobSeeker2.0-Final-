// routes/application.routes.js
//
// Application routes: candidates apply, recruiters manage status.

const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { upload } = require('../middleware/upload.middleware');


// Candidate applies to a job (upload resume if desired).
router.post('/:jobId/apply', authMiddleware, requireRole('candidate'), upload.single('resume'), applicationController.applyToJob);


// Candidate: view my applications
router.get('/me', authMiddleware, requireRole('candidate'), applicationController.myApplications);


// Recruiter: update application status
router.put('/:id/status', authMiddleware, requireRole('recruiter'), applicationController.updateStatus);


module.exports = router;
