import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Orders.css';

const Orders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const customerId = localStorage.getItem('customer_id');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/${customerId}`);
        setPendingOrders(response.data.pendingOrders);
        setCompletedOrders(response.data.completedOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };
    fetchOrders();
  }, [customerId]);

  if (loading) return <div>Loading your orders...</div>;

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {error && <p className="error">{error}</p>}

      {/* Pending Orders Section */}
      <h3>Pending Orders</h3>
      {pendingOrders.length === 0 ? (
        <p className="no-orders">You have no pending orders.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Placed On</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.status}</td>
                <td>{new Date(order.placed_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Completed Orders Section */}
      <h3>Completed Orders</h3>
      {completedOrders.length === 0 ? (
        <p className="no-orders">You have no completed orders.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Placed On</th>
            </tr>
          </thead>
          <tbody>
            {completedOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.status}</td>
                <td>{new Date(order.placed_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
