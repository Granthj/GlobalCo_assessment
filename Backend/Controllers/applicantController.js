
const Job = require('../Models/jobsSchema');
const Application = require('../Models/applicationSchema');

const applyToJob = async (req, res) => {
    try {
        const { jobId, applicantName, applicantEmail, resumeLink } = req.body;

        if (!jobId || !applicantName || !applicantEmail || !resumeLink) {
            return res.status(400).json({ error: 'jobId, applicantName, applicantEmail, and resumeLink are required' });
        }
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        const application = await Application.create({ jobId, applicantName, applicantEmail, resumeLink });
        res.status(201).json(application);
    }
    catch(err){
        console.log('error applying to job', err);
        res.status(500).json({ error: 'Failed to apply to job' });
    }
}

const getApplicationsForJob = async(req,res)=>{

    try{
        const { jobId } = req.params;

        const job = await Job.findByPk(jobId);
        if(!job){
            return res.status(404).json({error: 'Job is not found'});
        }

        const applications = await Application.findAll({
            where: { jobId: jobId },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(applications);
    }
    catch(err){
        console.log('error fetching applications for job', err);
        res.status(500).json({ error: 'Failed to fetch applications for job' });
    }
}

module.exports = {
    applyToJob,
    getApplicationsForJob
}