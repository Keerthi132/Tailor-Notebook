import React, { useState } from 'react';
import DesignGallery from './DesignGallery';
import Cart from './Cart';
import Orders from './Orders';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [showOrders, setShowOrders] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const customerId = user?.id;

  const addToCart = async (designId) => {
    try {
      await axios.post('/api/cart', {
        customer_id: customerId,
        design_id: designId,
      });
      alert('Design added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add design to cart');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="welcome-text">Welcome, {user?.username || 'Customer'}!</h2>
        <div className="top-buttons">
          <button className="small-btn" onClick={() => setShowOrders((prev) => !prev)}>
            {showOrders ? 'View Cart & Designs' : 'View Orders'}
          </button>
          <button className="small-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showOrders ? (
        <Orders />
      ) : (
        <>
          <DesignGallery addToCart={addToCart} />
          <Cart />
        </>
      )}
    </div>
  );
};

export default CustomerDashboard;
