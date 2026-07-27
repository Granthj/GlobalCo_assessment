
const Job = require('../Models/jobsSchema');

const createJob = async (req, res) => {

    try {
        const { title, company, location, description } = req.body;

        if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!title || !company || !description || !location) {
            return res.status(400).json({ error: 'title, company, location, and description are required' });
        }

        const job = await Job.create({ title, company, location, description });
        res.status(201).json(job);
    } catch (error) {
        console.log('error creating jobs', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
}

const getAllJobs = async (req, res) => {

    try {
        const jobs = await Job.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json(jobs);
    } catch (error) {
        console.log('error fetching jobs', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
}
const getJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.log('error fetching job', error);
        res.status(500).json({ error: 'Failed to fetch job' });
    }
}
module.exports = {
    createJob,
    getAllJobs,
    getJob 
}