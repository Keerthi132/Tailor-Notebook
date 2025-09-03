// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import './Cart.css'; // Import cart-specific styles

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get logged-in customer's ID from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const customerId = user?.id;

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!customerId) {
      setError('Customer ID not found.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`/api/cart/${customerId}`);
      setCartItems(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [customerId]);

  // Remove item from cart
  const handleRemove = async (cartId) => {
    try {
      await axios.delete(`/api/cart/${cartId}`);
      fetchCartItems(); // Refresh cart after deletion
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  // Place order
  const handlePlaceOrder = async () => {
    try {
      await axios.post(`/api/cart/place-order/${customerId}`);
      fetchCartItems(); // Refresh cart after placing order
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Failed to place order');
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart</h2>
        {cartItems.length > 0 && (
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        )}
      </div>


      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="designs">
          {cartItems.map((item) => (
            <div key={item.cart_id} className="design-item">
              <img src={item.image_url} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Price: Rs.{item.price}</p>
              <p className="added-date">
                Added on: {new Date(item.added_at).toLocaleString()}
              </p>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.cart_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
