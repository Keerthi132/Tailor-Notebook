// src/components/Register.js
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'customer' });
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(''); // Added error state
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    if (!form.username || !form.password) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true); // Set loading to true when registration starts
    try {
      // Adjusted the API endpoint to match the backend route
      await axios.post('http://localhost:5000/api/register', form);
      alert('Registration successful!');
      navigate('/'); // Navigate to login page or home page after successful registration
    } catch (err) {
      setError('Registration failed. Please try again later.'); // Display error message
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
  <div className="register-container">
    <h2>Register</h2>
    <input 
      name="username" 
      value={form.username} 
      onChange={handleChange} 
      placeholder="Username" 
    />
    <input 
      name="password" 
      type="password" 
      value={form.password} 
      onChange={handleChange} 
      placeholder="Password" 
    />
    <select name="role" value={form.role} onChange={handleChange}>
      <option value="customer">Customer</option>
      <option value="tailor">Tailor</option>
    </select>
    <button onClick={handleRegister} disabled={loading}>
      {loading ? 'Registering...' : 'Register'}
    </button>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <p>
      Already have an account? <a href="/">Login</a>
    </p>
  </div>
);


}

export default Register;
