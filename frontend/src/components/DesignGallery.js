import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './DesignGallery.css';

const DesignGallery = ({ addToCart }) => {
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axios.get('/api/designs');
        setDesigns(response.data);
        setFilteredDesigns(response.data);
      } catch (err) {
        setError('Error fetching designs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);

  const handleCategoryChange = (category) => {
    setCategory(category);
    if (category === 'all') {
      setFilteredDesigns(designs);
    } else {
      setFilteredDesigns(designs.filter((design) => design.category === category));
    }
  };

  if (loading) return <div>Loading designs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="gallery-container">
      <h2>Design Gallery</h2>

      {/* Category Filter */}
      <div className="category-filter">
        <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      {/* Design Grid */}
      <div className="designs">
        {filteredDesigns.length === 0 ? (
          <p>No designs available for this category</p>
        ) : (
          filteredDesigns.map((design) => (
            <div key={design.id} className="design-item">
              <img src={design.image_url} alt={design.name} />
              <h3>{design.name}</h3>
              <p>Price: ₹{design.price}</p>
              <button onClick={() => addToCart(design.id)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DesignGallery;
