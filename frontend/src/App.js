import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/items/add', { name, description })
      .then(() => {
        setName('');
        setDescription('');
        return axios.get('http://localhost:5000/items');
      })
      .then(response => setItems(response.data))
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <div>
      <h1>MERN Stack App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}: {item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;