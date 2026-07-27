// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getJobs() {
  try {
    const res = await axios.get(`${BASE_URL}/jobs/get-jobs`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to fetch jobs');
  }
}

export async function getJob(id) {
  try {
    const res = await axios.get(`${BASE_URL}/jobs/job/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to fetch job');
  }
}

export async function createJob(job, adminKey) {
  try {
    const res = await axios.post(`${BASE_URL}/jobs/create-job`, job, {
      headers: { 'x-admin-key': adminKey },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to create job');
  }
}

export async function applyToJob(application) {
  try {
    const res = await axios.post(`${BASE_URL}/applications/`, application);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || 'Failed to apply');
  }
}