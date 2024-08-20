import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

// Use an environment variable or default to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/items`)
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/items/add`, { name, description })
      .then(() => {
        setName('');
        setDescription('');
        return axios.get(`${API_BASE_URL}/items`);
      })
      .then(response => setItems(response.data))
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <div className="container">
      <h1 className="heading">MERN Stack App</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Add Item</button>
      </form>
      <ul className="list">
        {items.map(item => (
          <li key={item._id} className="list-item">
            {item.name}: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
