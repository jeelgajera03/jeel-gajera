import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingItem, setEditingItem] = useState(null); // To keep track of the item being edited

  useEffect(() => {
    axios.get(`${API_BASE_URL}/items`)
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update existing item
      axios.put(`${API_BASE_URL}/items/update/${editingItem._id}`, { name, description })
        .then(response => {
          setName('');
          setDescription('');
          setEditingItem(null); // Clear editing state
          return axios.get(`${API_BASE_URL}/items`);
        })
        .then(response => setItems(response.data))
        .catch(error => console.error('Error updating item:', error));
    } else {
      // Add new item
      axios.post(`${API_BASE_URL}/items/add`, { name, description })
        .then(() => {
          setName('');
          setDescription('');
          return axios.get(`${API_BASE_URL}/items`);
        })
        .then(response => setItems(response.data))
        .catch(error => console.error('Error adding item:', error));
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditingItem(item); // Set the item being edited
  };

  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/items/delete/${id}`)
      .then(() => {
        return axios.get(`${API_BASE_URL}/items`);
      })
      .then(response => setItems(response.data))
      .catch(error => console.error('Error deleting item:', error));
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
        <button type="submit" className="button">{editingItem ? 'Update Item' : 'Add Item'}</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
