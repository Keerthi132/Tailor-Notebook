import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Adjust the import path for axios if necessary

const TailorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all orders when the component is mounted
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/tailor');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle the completion of an order
  const handleComplete = async (orderId) => {
    try {
      await axios.put(`/api/tailor/${orderId}/status`, { status: 'completed' });

      // Update state after marking as completed
      setOrders(orders.map(order =>
        order.order_id === orderId ? { ...order, status: 'completed' } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to mark order as completed. Please try again.');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>⏳ Loading orders...</div>;
  }

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const completedOrders = orders.filter(order => order.status === 'completed');

  return (
    <div style={{ padding: '20px' }}>
      {/* Dashboard heading and logout button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
  <button
    style={{
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '6px 14px',
      borderRadius: '20px',
      width: 'max-width',
      cursor: 'pointer'
    }}
    onClick={() => {
      localStorage.removeItem('tailor_id'); // adjust key as per your login
      window.location.href = '/'; // redirect to login/home
    }}
  >
    <strong>Logout</strong>
  </button>
</div>


      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Pending Orders Table */}
      <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>⏳ Pending Orders</h3>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Customer Name</th>
            <th style={thStyle}>Design Name</th>
            <th style={thStyle}>Placed At</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.length === 0 ? (
            <tr>
              <td colSpan="5" style={emptyStyle}>No pending orders</td>
            </tr>
          ) : (
            pendingOrders.map((order, index) => (
              <tr key={order.order_id} style={index % 2 === 0 ? rowEven : rowOdd}>
                <td style={tdStyle}>{order.order_id}</td>
                <td style={tdStyle}>{order.customer_name}</td>
                <td style={tdStyle}>{order.design_name}</td>
                <td style={tdStyle}>{new Date(order.placed_at).toLocaleString()}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleComplete(order.order_id)}
                    style={btnGreen}
                  >
                    ✅ Mark as Completed
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Completed Orders Table */}
      <h3 style={{ marginTop: '40px', marginBottom: '15px' }}>✅ Completed Orders</h3>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Customer Name</th>
            <th style={thStyle}>Design Name</th>
            <th style={thStyle}>Placed At</th>
          </tr>
        </thead>
        <tbody>
          {completedOrders.length === 0 ? (
            <tr>
              <td colSpan="4" style={emptyStyle}>No completed orders</td>
            </tr>
          ) : (
            completedOrders.map((order, index) => (
              <tr key={order.order_id} style={index % 2 === 0 ? rowEven : rowOdd}>
                <td style={tdStyle}>{order.order_id}</td>
                <td style={tdStyle}>{order.customer_name}</td>
                <td style={tdStyle}>{order.design_name}</td>
                <td style={tdStyle}>{new Date(order.placed_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Table Styles
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden'
};

const theadStyle = {
  backgroundColor: '#00796b',
  color: 'white'
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd'
};

const rowEven = { backgroundColor: '#ffffff' };
const rowOdd = { backgroundColor: '#f1f1f1' };

const emptyStyle = { textAlign: 'center', padding: '15px', color: '#777' };

const btnGreen = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default TailorOrders;
