import React, { useState } from 'react'

const App = () => {
  const [item, setItem] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Add item
  const addItem = () => {
    if (item.trim() === '') return;

    setTodos([...todos, item]);
    setItem('');
  };

  // Start editing
  const editItem = (index) => {
    setItem(todos[index]);
    setEditIndex(index);
  };

  // Update item
  const updateItem = () => {
    if (item.trim() === '') return;

    const updatedTodos = [...todos];
    updatedTodos[editIndex] = item;

    setTodos(updatedTodos);
    setItem('');
    setEditIndex(null);
  };

  // Delete item  
  const deleteItem = (index) => {
    const filteredTodos = todos.filter((_, i) => i !== index);
    setTodos(filteredTodos);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your items"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />

      {editIndex === null ? (
        <button onClick={addItem}>Add item</button>
      ) : (
        <button onClick={updateItem}>Update</button>
      )}

      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ listStyle: 'none' }}>
            {todo}
            <button onClick={() => editItem(index)}>Edit</button>
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App