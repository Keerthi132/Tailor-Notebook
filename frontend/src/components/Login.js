// src/components/Login.js
import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Use login function from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setError('');
      const res = await axios.post('http://localhost:5000/api/login', form);

      login(res.data); // ✅ Call global login
      res.data.role === 'customer' ? navigate('/customer') : navigate('/tailor');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <div className="form-container">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="form-input"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="form-input"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <p className="register-link">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default Login;
