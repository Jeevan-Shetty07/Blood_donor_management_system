import { useState, useEffect } from 'react';
import { api } from './services/api';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [activeTab, setActiveTab] = useState('home');
  const [isLogin, setIsLogin] = useState(true);
  
  // Auth Form State
  const [authForm, setAuthForm] = useState({ username: '', password: '', role: 'ROLE_USER' });
  
  // Data States
  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchGroup, setSearchGroup] = useState('');

  // Business Form states
  const [donorForm, setDonorForm] = useState({ name: '', email: '', bloodGroup: '', phone: '', address: '' });
  const [hospitalForm, setHospitalForm] = useState({ name: '', location: '', contactNumber: '' });
  const [requestForm, setRequestForm] = useState({ hospitalId: '', bloodGroupNeeded: '', urgency: 'MEDIUM', notes: '' });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [activeTab, user]);

  const fetchData = async () => {
    try {
      if (activeTab === 'donors' && user.role === 'ROLE_HOSPITAL') {
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

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await api.login({ username: authForm.username, password: authForm.password });
      } else {
        data = await api.register(authForm);
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      alert(`${isLogin ? 'Login' : 'Registration'} successful!`);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setActiveTab('home');
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

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="logo">
            <span className="logo-icon">🩸</span>
            <span className="logo-text">BloodLink</span>
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Join the Community'}</h2>
          <form onSubmit={handleAuth} className="modern-form">
            <input 
              type="text" 
              placeholder="Username" 
              value={authForm.username} 
              onChange={e => setAuthForm({...authForm, username: e.target.value})} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={authForm.password} 
              onChange={e => setAuthForm({...authForm, password: e.target.value})} 
              required 
            />
            {!isLogin && (
              <select 
                value={authForm.role} 
                onChange={e => setAuthForm({...authForm, role: e.target.value})}
              >
                <option value="ROLE_USER">I am a Donor</option>
                <option value="ROLE_HOSPITAL">I am a Hospital Representative</option>
              </select>
            )}
            <button type="submit" className="btn btn-primary w-full">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <p className="auth-toggle">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    );
  }

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
            
            {(user.role === 'ROLE_USER' || user.role === 'ROLE_HOSPITAL') && (
              <button className={activeTab === 'donors' ? 'active' : ''} onClick={() => setActiveTab('donors')}>
                {user.role === 'ROLE_USER' ? 'My Profile' : 'Find Donors'}
              </button>
            )}
            
            {user.role === 'ROLE_HOSPITAL' && (
              <button className={activeTab === 'hospitals' ? 'active' : ''} onClick={() => setActiveTab('hospitals')}>Hospital Info</button>
            )}

            <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>
              {user.role === 'ROLE_HOSPITAL' ? 'Manage Requests' : 'Blood Requests'}
            </button>
            
            <button className="btn-logout" onClick={handleLogout}>Logout ({user.username})</button>
          </div>
        </div>
      </nav>

      <main className="container">
        {activeTab === 'home' && (
          <section className="hero">
            <div className="hero-content">
              <h1 className="section-title">Save Lives. Donate Blood.</h1>
              <p className="hero-subtitle">Welcome, {user.username}! You are logged in as {user.role === 'ROLE_USER' ? 'a Donor' : 'a Hospital Representative'}.</p>
              <div className="hero-actions">
                {user.role === 'ROLE_USER' ? (
                  <button className="btn btn-primary" onClick={() => setActiveTab('donors')}>Update Donor Profile</button>
                ) : (
                  <button className="btn btn-primary" onClick={() => setActiveTab('requests')}>Post New Request</button>
                )}
                <button className="btn btn-outline" onClick={() => setActiveTab('donors')}>Find Donors</button>
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
            {user.role === 'ROLE_USER' ? (
              <aside className="page-sidebar glass-card" style={{ gridColumn: 'span 2' }}>
                <h3>My Donor Profile</h3>
                <p className="small-info">Keep your information updated to ensure hospitals can reach you.</p>
                <form onSubmit={handleDonorSubmit} className="modern-form">
                  <input type="text" placeholder="Full Name" value={donorForm.name} onChange={e => setDonorForm({...donorForm, name: e.target.value})} required />
                  <input type="email" placeholder="Email Address" value={donorForm.email || (donorForm.email = user.username)} disabled required />
                  <input type="text" placeholder="Blood Group (e.g. A+)" value={donorForm.bloodGroup} onChange={e => setDonorForm({...donorForm, bloodGroup: e.target.value})} required />
                  <input type="tel" placeholder="Phone Number" value={donorForm.phone} onChange={e => setDonorForm({...donorForm, phone: e.target.value})} required />
                  <textarea placeholder="Address" value={donorForm.address} onChange={e => setDonorForm({...donorForm, address: e.target.value})} />
                  <button type="submit" className="btn btn-primary w-full">Update My Profile</button>
                </form>
              </aside>
            ) : (
              <section className="page-content" style={{ gridColumn: 'span 2' }}>
                <div className="content-header">
                  <h2>Find Donors</h2>
                  <div className="search-box">
                    <input type="text" placeholder="Search Blood Group" value={searchGroup} onChange={e => setSearchGroup(e.target.value)} />
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
                  {donors.length === 0 && <p className="empty-msg">No donors found. Try searching for a specific blood group.</p>}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'hospitals' && user.role === 'ROLE_HOSPITAL' && (
          <div className="page-layout">
            <aside className="page-sidebar glass-card">
              <h3>Hospital Registration</h3>
              <p className="small-info">Register your hospital to post blood requests.</p>
              <form onSubmit={handleHospitalSubmit} className="modern-form">
                <input type="text" placeholder="Hospital Name" value={hospitalForm.name} onChange={e => setHospitalForm({...hospitalForm, name: e.target.value})} required />
                <input type="text" placeholder="Location" value={hospitalForm.location} onChange={e => setHospitalForm({...hospitalForm, location: e.target.value})} required />
                <input type="email" placeholder="Email Address" value={hospitalForm.email || (hospitalForm.email = user.username)} disabled required />
                <input type="tel" placeholder="Contact Number" value={hospitalForm.contactNumber} onChange={e => setHospitalForm({...hospitalForm, contactNumber: e.target.value})} required />
                <button type="submit" className="btn btn-primary w-full">Update Hospital Info</button>
              </form>
            </aside>
            <section className="page-content">
              <h2>Partner Hospitals</h2>
              <div className="grid">
                {hospitals.map(hospital => (
                  <div key={hospital.id} className="hospital-card glass-card">
                    <h4>{hospital.name}</h4>
                    <p> {hospital.location}</p>
                    <p>📞 {hospital.contactNumber}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="page-layout">
            {user.role === 'ROLE_HOSPITAL' && (
              <aside className="page-sidebar glass-card">
                <h3>Create Blood Request</h3>
                <form onSubmit={handleRequestSubmit} className="modern-form">
                  <p className="small-info">Raising request for your hospital based on your profile.</p>
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
            )}
            <section className="page-content" style={{ gridColumn: user.role === 'ROLE_USER' ? 'span 2' : 'auto' }}>
              <h2>{user.role === 'ROLE_HOSPITAL' ? 'Manage Your Requests' : 'Available Blood Requests'}</h2>
              <div className="list">
                {requests.map(req => (
                  <div key={req.id} className={`request-card glass-card urgency-${req.urgency.toLowerCase()}`}>
                    <div className="request-badge">{req.bloodGroupNeeded}</div>
                    <div className="request-details">
                      <h4>Hospital: {req.hospitalName || 'Unknown'}</h4>
                      <p className="urgency">Urgency: <span className={`badge-${req.urgency.toLowerCase()}`}>{req.urgency}</span></p>
                      <p className="notes">{req.notes}</p>
                      <div className="status-badge">{req.status}</div>
                    </div>
                    {user.role === 'ROLE_HOSPITAL' && (
                      <div className="request-actions">
                        {req.status === 'PENDING' && (
                          <button className="btn btn-primary btn-sm" onClick={() => handleStatusUpdate(req.id, 'FULFILLED')}>Mark Fulfilled</button>
                        )}
                      </div>
                    )}
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

