import React,{ useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createJob } from '../../api/client.js';
import '../Css/PostJobs.css';

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', company: '', location: '', description: '' });
  const [adminKey, setAdminKey] = useState('');
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const job = await createJob(form, adminKey);
      navigate(`/jobs/${job.id}`);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
      setSubmitting(false);
    }
  };

  return (
    <div className="post-job">
      <Link to="/" className="job-detail__back">← Back to jobs</Link>
      <h1 className="post-job__heading">Post a job</h1>
      <p className="post-job__subheading">Fill in the role details below.</p>

      <form className="post-job__form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Job title</label>
          <input id="title" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" value={form.company} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            placeholder="Remote, Hyderabad, etc."
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <hr className="form-divider" />

        <div className="form-field form-field--admin">
          <label htmlFor="adminKey">Admin key</label>
          <input
            id="adminKey"
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Posting…' : 'Post job'}
        </button>

        {status && (
          <p className={`form-status form-status--${status.type}`}>{status.message}</p>
        )}
      </form>
    </div>
  );
}
