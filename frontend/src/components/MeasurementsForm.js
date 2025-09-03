// src/components/MeasurementsForm.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';

function MeasurementsForm({ customerId }) {
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
    neck: '',
    sleeve: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/measurements/${customerId}`)
      .then(res => {
        setMeasurements(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching measurements:', err);
        setMessage('Error fetching measurements');
        setLoading(false);
      });
  }, [customerId]);

  const handleChange = (e) => setMeasurements({ ...measurements, [e.target.name]: e.target.value });

  const handleSave = () => {
    setLoading(true);
    setMessage('');
    
    // Validate inputs (ensure all fields are filled)
    for (const key in measurements) {
      if (!measurements[key]) {
        setMessage('Please fill all the fields.');
        setLoading(false);
        return;
      }
    }

    axios.put(`http://localhost:5000/api/measurements/${customerId}`, measurements)
      .then(() => {
        setMessage('Measurements saved successfully!');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error saving measurements:', err);
        setMessage('Error saving measurements');
        setLoading(false);
      });
  };

  return (
    <div>
      <h3>Edit Measurements</h3>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <form>
        <input
          name="chest"
          value={measurements.chest}
          onChange={handleChange}
          placeholder="Chest"
        />
        <input
          name="waist"
          value={measurements.waist}
          onChange={handleChange}
          placeholder="Waist"
        />
        <input
          name="hips"
          value={measurements.hips}
          onChange={handleChange}
          placeholder="Hips"
        />
        <input
          name="inseam"
          value={measurements.inseam}
          onChange={handleChange}
          placeholder="Inseam"
        />
        <input
          name="neck"
          value={measurements.neck}
          onChange={handleChange}
          placeholder="Neck"
        />
        <input
          name="sleeve"
          value={measurements.sleeve}
          onChange={handleChange}
          placeholder="Sleeve"
        />
        <button type="button" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default MeasurementsForm;
