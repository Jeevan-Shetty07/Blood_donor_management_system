const API_BASE_URL = 'http://127.0.0.1:8080/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Donors
  getDonors: () => fetch(`${API_BASE_URL}/donors`).then(handleResponse),
  registerDonor: (donor) => fetch(`${API_BASE_URL}/donors/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donor),
  }).then(handleResponse),
  searchDonors: (bloodGroup) => fetch(`${API_BASE_URL}/donors/search?bloodGroup=${encodeURIComponent(bloodGroup)}`).then(handleResponse),

  // Hospitals
  getHospitals: () => fetch(`${API_BASE_URL}/hospitals`).then(handleResponse),
  registerHospital: (hospital) => fetch(`${API_BASE_URL}/hospitals/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hospital),
  }).then(handleResponse),

  // Blood Requests
  getRequests: () => fetch(`${API_BASE_URL}/requests`).then(handleResponse),
  createRequest: (request) => fetch(`${API_BASE_URL}/requests/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  }).then(handleResponse),
  updateRequestStatus: (id, status) => fetch(`${API_BASE_URL}/requests/${id}/status?status=${encodeURIComponent(status)}`, {
    method: 'PUT', // Matches @PutMapping in BloodRequestController
  }).then(handleResponse),
};
