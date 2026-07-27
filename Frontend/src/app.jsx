import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import JobList from './Component/JobLists';
import JobDetail from './Component/JobDetails';
import PostJob from './Component/PostJobs';
import './app.css';

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="site-header__logo">
            board<span>.</span>
          </Link>
          <Link to="/post" className="site-header__post-link">
            + Post a job
          </Link>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/post" element={<PostJob />} />
        </Routes>
      </main>
    </div>
  );
}