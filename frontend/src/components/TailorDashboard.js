import React, { useState, useEffect } from 'react';
import axios from '../axios';
import TailorOrders from './TailorOrders';  
import './TailorDashboard.css';

function TailorDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError('');
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/tailor');
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Fetch orders error:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: 'accepted' });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'accepted' } : order));
    } catch (err) {
      console.error('Error accepting order:', err);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: 'completed' });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'completed' } : order));
    } catch (err) {
      console.error('Error completing order:', err);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="tailor-dashboard">
      <h1>Tailor Dashboard</h1>
      {/* <h3>Orders</h3> */}
      <TailorOrders 
        orders={orders} 
        onAccept={handleAcceptOrder} 
        onComplete={handleCompleteOrder} 
      />
    </div>
  );
}

export default TailorDashboard;
