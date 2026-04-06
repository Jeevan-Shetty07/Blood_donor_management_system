const API_BASE_URL = 'http://127.0.0.1:8080/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Auth
  login: (credentials) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then(handleResponse),

  register: (user) => fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }).then(handleResponse),

  // Donors
  getDonors: () => fetch(`${API_BASE_URL}/donors`, { headers: getHeaders() }).then(handleResponse),
  registerDonor: (donor) => fetch(`${API_BASE_URL}/donors/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(donor),
  }).then(handleResponse),
  searchDonors: (bloodGroup) => fetch(`${API_BASE_URL}/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}`, { headers: getHeaders() }).then(handleResponse),

  // Hospitals
  getHospitals: () => fetch(`${API_BASE_URL}/hospitals`, { headers: getHeaders() }).then(handleResponse),
  registerHospital: (hospital) => fetch(`${API_BASE_URL}/hospitals/add`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(hospital),
  }).then(handleResponse),

  // Blood Requests
  getRequests: () => fetch(`${API_BASE_URL}/requests`, { headers: getHeaders() }).then(handleResponse),
  createRequest: (request) => fetch(`${API_BASE_URL}/requests/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(request),
  }).then(handleResponse),
  updateRequestStatus: (id, status) => fetch(`${API_BASE_URL}/requests/${id}/status?status=${encodeURIComponent(status)}`, {
    method: 'PUT',
    headers: getHeaders(),
  }).then(handleResponse),
};

