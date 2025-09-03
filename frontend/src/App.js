// src/App.js
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CustomerDashboard from './components/CustomerDashboard';
import TailorDashboard from './components/TailorDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/customer"
        element={
          user?.role === 'customer' ? (
            <>
              <CustomerDashboard />
              {/* <button onClick={handleLogout}>Logout</button> */}
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/tailor"
        element={
          user?.role === 'tailor' ? (
            <>
              <TailorDashboard />
              {/* <button onClick={handleLogout}>Logout</button> */}
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
