const express = require('express');
const router = express.Router();
const applyToJobController = require('../Controllers/applicantController');

router.post('/', applyToJobController.applyToJob);
router.get('/:jobId', applyToJobController.getApplicationsForJob);


module.exports = router;