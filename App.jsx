import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setItems([...items, { text, done: false }]);
    setText('');
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCheck = (index) => {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  };

  const handleEdit = (index, newText) => {
    const newItems = [...items];
    newItems[index].text = newText;
    setItems(newItems);
  };

  const handleArchive = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleCheckAll = () => {
    const newItems = items.map(item => {
      return {...item, done: true};
    });
    setItems(newItems);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} placeholder="Add new item..." />
        <button type="submit">Add</button>
      </form>
      <div className="list">
        <button onClick={handleCheckAll} className="check-all">Check All</button>
        <ul>
          {items.map((item, index) => (
            <li key={index} className={item.done ? 'done' : ''}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => handleCheck(index)}
              />
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleEdit(index, e.target.value)}
                className="edit-input"
              />
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleArchive(index)}>Archive</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
