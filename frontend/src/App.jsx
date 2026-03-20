import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        isAdmin
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (err) {
      setError('Login failed, Error');
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h1>BHIM Clone</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          <label>
            <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            Login as Admin
          </label>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p>User: user@example.com | Pass: password123</p>
        <p>Admin: admin@bhim.com | Pass: admin123</p>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  const [balance, setBalance] = useState(user.balance);
  const [recipientUPI, setRecipientUPI] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleSendMoney = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/transactions/send-money`, {
        senderUPI: user.upiId,
        receiverUPI: recipientUPI,
        amount: parseFloat(amount)
      }, { headers: { Authorization: `Bearer ${token}` } });
      setBalance(balance - parseFloat(amount));
      setRecipientUPI('');
      setAmount('');
    } catch (err) {
      alert('Failed to send money');
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <h2>BHIM Clone - {user.name}</h2>
        <button onClick={onLogout} style={styles.button}>Logout</button>
      </div>
      <div style={styles.balanceCard}>
        <h3>Balance: ₹{balance}</h3>
        <p>UPI: {user.upiId}</p>
      </div>
      <div style={styles.section}>
        <h3>Send Money</h3>
        <form onSubmit={handleSendMoney}>
          <input type="text" placeholder="Recipient UPI" value={recipientUPI} onChange={(e) => setRecipientUPI(e.target.value)} required style={styles.input} />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required style={styles.input} />
          <button type="submit" style={styles.button}>Send</button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ user, onLogout }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(response.data || []);
    } catch (err) {
      console.error('Error');
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <h2>Admin Dashboard</h2>
        <button onClick={onLogout} style={styles.button}>Logout</button>
      </div>
      <h3>Users</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>UPI</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.upiId}</td>
              <td>₹{u.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  loginContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' },
  loginBox: { backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '300px' },
  dashboardContainer: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  balanceCard: { backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '10px', marginBottom: '20px' },
  section: { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' },
  input: { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' },
  button: { width: '100%', padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  error: { color: 'red', marginBottom: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' }
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? (user.isAdmin ? <AdminDashboard user={user} onLogout={() => { localStorage.clear(); setUser(null); }} /> : <Dashboard user={user} onLogout={() => { localStorage.clear(); setUser(null); }} />) : <LoginPage onLogin={setUser} />} />
      </Routes>
    </Router>
  );
}
