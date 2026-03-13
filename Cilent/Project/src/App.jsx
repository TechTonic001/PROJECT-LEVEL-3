import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './App.css';


const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5630/api/auth';

const App = () => {
  const [item, setItem] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch todos on mount
  useEffect(() => {
    const take = localStorage.getItem('token');
    if (!take) {
      navigate('/login');
      return;
    }

    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_BASE}/todos`, {
          headers: { Authorization: `Bearer ${take}` }
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
        toast.error('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [navigate]);

  // Save
  const saveTodos = async (newTodos) => {
    const take = localStorage.getItem('token');
    try {
      await axios.put(`${API_BASE}/todos`, { todos: newTodos }, {
        headers: { Authorization: `Bearer ${take}` }
      });
    } catch (error) {
      console.error('Error saving todos:', error);
      toast.error('Failed to save todos');
    }
  };

  // Add item
  const addItem = () => {
    if (item.trim() === '') return;

    const newTodos = [...todos, item];
    setTodos(newTodos);
    saveTodos(newTodos);
    setItem('');
  };

  // edit
  const editItem = (index) => {
    setItem(todos[index]);
    setEditIndex(index);
  };

  // Update
  const updateItem = () => {
    if (item.trim() === '') return;

    const updatedTodos = [...todos];
    updatedTodos[editIndex] = item;

    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setItem('');
    setEditIndex(null);
  };

  // Delete 
  const deleteItem = (index) => {
    const filteredTodos = todos.filter((_, i) => i !== index);
    setTodos(filteredTodos);
    saveTodos(filteredTodos);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="app-title">Todo List</h1>
      <div className="input-section">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter your items"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        {editIndex === null ? (
          <button className="add-btn" onClick={addItem}>Add item</button>
        ) : (
          <button className="update-btn" onClick={updateItem}>Update</button>
        )}
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span className="todo-text">{todo}</span>
            <div className="todo-actions">
              <button className="edit-btn" onClick={() => editItem(index)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteItem(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App