import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = "https://dad-1-cqla.onrender.com/memories";

const App = () => {
  const [name, setName] = useState('');
  const [memory, setMemory] = useState('');
  const [memories, setMemories] = useState([]);

  const fetchMemories = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMemories(data);
  };

  const handleSubmit = async () => {
    if (name.trim() && memory.trim()) {
      await fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, memory })
      });
      setName('');
      setMemory('');
      fetchMemories();
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div className="basic-container">
      <div className="basic-heart-center">
        <img src="https://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/512/heart-icon.png" alt="Heart" class="beating-heart" />
      </div>
      <div className="basic-formBox">
        <h1>💌 Memories with Dad... </h1>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="basic-input"
        />
        <textarea
          placeholder="Share a memory with Dad..."
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          className="basic-textarea"
        />
        <button onClick={handleSubmit} className="basic-button">Submit</button>
      </div>
      <div className="basic-memoryBoard">
        <h2>📜 Memories from Everyone</h2>
        {memories.map((m) => (
          <div key={m.id} className="basic-memoryCard">
            <h3>❤️ {m.name} says:</h3>
            <p>"{m.memory}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;