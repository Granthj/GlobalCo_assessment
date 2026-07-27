import React,{ useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../../api/client.js';
import '../Css/JobLists.css';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="state-message">Loading jobs…</p>;
  if (error) return <p className="state-message state-message--error">Error: {error}</p>;

  return (
    <div className="job-list">
      <h1 className="job-list__heading">Open positions</h1>
      <p className="job-list__count">
        {jobs.length} {jobs.length === 1 ? 'role' : 'roles'} posted
      </p>

      {jobs.length === 0 ? (
        <div className="job-list__empty">
          <p>No jobs posted yet.</p>
          <Link to="/post">Be the first to post one →</Link>
        </div>
      ) : (
        <ul className="job-list__grid">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link to={`/jobs/${job.id}`} className="job-card">
                <h2 className="job-card__title">{job.title}</h2>
                <div className="job-card__meta">
                  <span className="job-card__company">{job.company}</span>
                  <span>·</span>
                  <span>{job.location || 'Remote'}</span>
                </div>
                <p className="job-card__desc">{job.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
