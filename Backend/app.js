const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const db = require('./Utils/db.js');
const jobsRouter = require('../Backend/Routes/jobRouter.js'); 
const applicationsRouter = require('../Backend/Routes/applicationRouter.js');
const dotenv = require('dotenv');
const Job = require('./Models/jobsSchema');
const Application = require('./Models/applicationSchema');


app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

Job.hasMany(Application, { foreignKey: 'jobId', onDelete: 'CASCADE' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

db.sync().then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log('Connected to server 3000');
    });
});