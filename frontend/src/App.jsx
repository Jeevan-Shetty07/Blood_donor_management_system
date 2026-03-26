import { useState, useEffect } from 'react';
import { api } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchGroup, setSearchGroup] = useState('');

  // Form states
  const [donorForm, setDonorForm] = useState({ name: '', email: '', bloodGroup: '', phone: '', address: '' });
  const [hospitalForm, setHospitalForm] = useState({ name: '', location: '', contactNumber: '' });
  const [requestForm, setRequestForm] = useState({ hospitalId: '', bloodGroupNeeded: '', urgency: 'MEDIUM', notes: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'donors') {
        const data = await api.getDonors();
        setDonors(data);
      } else if (activeTab === 'hospitals') {
        const data = await api.getHospitals();
        setHospitals(data);
      } else if (activeTab === 'requests') {
        const data = await api.getRequests();
        setRequests(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.registerDonor(donorForm);
      setDonorForm({ name: '', email: '', bloodGroup: '', phone: '', address: '' });
      fetchData();
      alert('Donor registered successfully!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleHospitalSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.registerHospital(hospitalForm);
      setHospitalForm({ name: '', location: '', contactNumber: '' });
      fetchData();
      alert('Hospital registered successfully!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createRequest(requestForm);
      setRequestForm({ hospitalId: '', bloodGroupNeeded: '', urgency: 'MEDIUM', notes: '' });
      fetchData();
      alert('Request created successfully!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.updateRequestStatus(id, status);
      fetchData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleSearch = async () => {
    try {
      const data = await api.searchDonors(searchGroup);
      setDonors(data);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo" onClick={() => setActiveTab('home')}>
            <span className="logo-icon">🩸</span>
            <span className="logo-text">BloodLink</span>
          </div>
          <div className="nav-links">
            <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</button>
            <button className={activeTab === 'donors' ? 'active' : ''} onClick={() => setActiveTab('donors')}>Donors</button>
            <button className={activeTab === 'hospitals' ? 'active' : ''} onClick={() => setActiveTab('hospitals')}>Hospitals</button>
            <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>Requests</button>
          </div>
        </div>
      </nav>

      <main className="container">
        {activeTab === 'home' && (
          <section className="hero">
            <div className="hero-content">
              <h1 className="section-title">Save Lives. Donate Blood.</h1>
              <p className="hero-subtitle">Connect donors with hospitals in real-time. Fast, reliable, and life-saving.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => setActiveTab('donors')}>Become a Donor</button>
                <button className="btn btn-outline" onClick={() => setActiveTab('requests')}>View Requests</button>
              </div>
            </div>
            <div className="hero-stats glass-card">
              <div className="stat-item">
                <span className="stat-value">500+</span>
                <span className="stat-label">Active Donors</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">50+</span>
                <span className="stat-label">Hospitals</span>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'donors' && (
          <div className="page-layout">
            <aside className="page-sidebar glass-card">
              <h3>Register as Donor</h3>
              <form onSubmit={handleDonorSubmit} className="modern-form">
                <input type="text" placeholder="Full Name" value={donorForm.name} onChange={e => setDonorForm({...donorForm, name: e.target.value})} required />
                <input type="email" placeholder="Email Address" value={donorForm.email} onChange={e => setDonorForm({...donorForm, email: e.target.value})} required />
                <input type="text" placeholder="Blood Group (e.g. A+)" value={donorForm.bloodGroup} onChange={e => setDonorForm({...donorForm, bloodGroup: e.target.value})} required />
                <input type="tel" placeholder="Phone Number" value={donorForm.phone} onChange={e => setDonorForm({...donorForm, phone: e.target.value})} required />
                <textarea placeholder="Address" value={donorForm.address} onChange={e => setDonorForm({...donorForm, address: e.target.value})} />
                <button type="submit" className="btn btn-primary w-full">Register</button>
              </form>
            </aside>
            <section className="page-content">
              <div className="content-header">
                <h2>Active Donors</h2>
                <div className="search-box">
                  <input type="text" placeholder="Search by Blood Group" value={searchGroup} onChange={e => setSearchGroup(e.target.value)} />
                  <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>
              </div>
              <div className="grid">
                {donors.map(donor => (
                  <div key={donor.id} className="donor-card glass-card">
                    <div className="donor-avatar">{donor.bloodGroup}</div>
                    <div className="donor-info">
                      <h4>{donor.name}</h4>
                      <p>{donor.phone}</p>
                      <p className="small">{donor.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'hospitals' && (
          <div className="page-layout">
            <aside className="page-sidebar glass-card">
              <h3>Register Hospital</h3>
              <form onSubmit={handleHospitalSubmit} className="modern-form">
                <input type="text" placeholder="Hospital Name" value={hospitalForm.name} onChange={e => setHospitalForm({...hospitalForm, name: e.target.value})} required />
                <input type="text" placeholder="Location" value={hospitalForm.location} onChange={e => setHospitalForm({...hospitalForm, location: e.target.value})} required />
                <input type="tel" placeholder="Contact Number" value={hospitalForm.contactNumber} onChange={e => setHospitalForm({...hospitalForm, contactNumber: e.target.value})} required />
                <button type="submit" className="btn btn-primary w-full">Register</button>
              </form>
            </aside>
            <section className="page-content">
              <h2>Partner Hospitals</h2>
              <div className="grid">
                {hospitals.map(hospital => (
                  <div key={hospital.id} className="hospital-card glass-card">
                    <h4>{hospital.name}</h4>
                    <p>📍 {hospital.location}</p>
                    <p>📞 {hospital.contactNumber}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="page-layout">
            <aside className="page-sidebar glass-card">
              <h3>Create Blood Request</h3>
              <form onSubmit={handleRequestSubmit} className="modern-form">
                <select value={requestForm.hospitalId} onChange={e => setRequestForm({...requestForm, hospitalId: e.target.value})} required>
                  <option value="">Select Hospital</option>
                  {hospitals.map(h => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
                <input type="text" placeholder="Blood Group Needed" value={requestForm.bloodGroupNeeded} onChange={e => setRequestForm({...requestForm, bloodGroupNeeded: e.target.value})} required />
                <select value={requestForm.urgency} onChange={e => setRequestForm({...requestForm, urgency: e.target.value})}>
                  <option value="LOW">LOW Urgency</option>
                  <option value="MEDIUM">MEDIUM Urgency</option>
                  <option value="HIGH">HIGH Urgency</option>
                </select>
                <textarea placeholder="Additional Notes" value={requestForm.notes} onChange={e => setRequestForm({...requestForm, notes: e.target.value})} />
                <button type="submit" className="btn btn-primary w-full">Post Request</button>
              </form>
            </aside>
            <section className="page-content">
              <h2>Blood Requests</h2>
              <div className="list">
                {requests.map(req => (
                  <div key={req.id} className={`request-card glass-card urgency-${req.urgency.toLowerCase()}`}>
                    <div className="request-badge">{req.bloodGroupNeeded}</div>
                    <div className="request-details">
                      <h4>Hospital ID: {req.hospitalId}</h4>
                      <p className="urgency">Urgency: {req.urgency}</p>
                      <p className="notes">{req.notes}</p>
                      <div className="status-badge">{req.status}</div>
                    </div>
                    <div className="request-actions">
                      {req.status === 'PENDING' && (
                        <button className="btn btn-primary btn-sm" onClick={() => handleStatusUpdate(req.id, 'FULFILLED')}>Mark Fulfilled</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
