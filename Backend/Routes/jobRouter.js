const express = require('express');
const router = express.Router();

const jobController = require('../Controllers/jobController');

router.get('/get-jobs', jobController.getAllJobs);
router.post('/create-job', jobController.createJob);
router.get('/job/:id', jobController.getJob);

module.exports = router;    