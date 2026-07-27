import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJob, applyToJob } from '../../api/client.js';
import '../Css/JobDetails.css';

export default function JobDetail() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState({
    applicantName: '',
    applicantEmail: '',
    resumeLink: ''
  });

  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getJob(id)
      .then(setJob)
      .catch(() => setNotFound(true));
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setStatus(null);

    try {
      // Combine the job ID with the form data
      const applicationData = {
        jobId: id,
        ...form
      };

      const application = await applyToJob(applicationData);

      console.log('Application submitted:', application);

      setStatus({
        type: 'success',
        message: 'Application submitted. Good luck!'
      });

      // Clear form after successful submission
      setForm({
        applicantName: '',
        applicantEmail: '',
        resumeLink: ''
      });

    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to submit application'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (notFound) {
    return (
      <p className="state-message state-message--error">
        Job not found.
      </p>
    );
  }

  if (!job) {
    return (
      <p className="state-message">
        Loading…
      </p>
    );
  }

  return (
    <div className="job-detail">

      <Link to="/" className="job-detail__back">
        ← Back to jobs
      </Link>

      <div className="job-detail__header">
        <h1 className="job-detail__title">
          {job.title}
        </h1>

        <div className="job-detail__meta">
          <span className="job-detail__company">
            {job.company}
          </span>

          <span>·</span>

          <span>
            {job.location || 'Remote'}
          </span>
        </div>
      </div>

      <p className="job-detail__desc">
        {job.description}
      </p>

      <div className="apply-card">

        <h2 className="apply-card__heading">
          Apply for this role
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="form-field">
            <label htmlFor="applicantName">
              Full name
            </label>

            <input
              id="applicantName"
              name="applicantName"
              value={form.applicantName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="applicantEmail">
              Email
            </label>

            <input
              id="applicantEmail"
              name="applicantEmail"
              type="email"
              value={form.applicantEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="resumeLink">
              Resume link
            </label>

            <input
              id="resumeLink"
              name="resumeLink"
              type="url"
              placeholder="Drive, Dropbox, portfolio, etc."
              value={form.resumeLink}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting
              ? 'Submitting…'
              : 'Submit application'}
          </button>

        </form>

        {status && (
          <p className={`form-status form-status--${status.type}`}>
            {status.message}
          </p>
        )}

      </div>

    </div>
  );
}

