import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = "http://localhost:3001/memories";

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
        <svg
          className="basic-beating-heart"
          viewBox="0 0 48 48"
          width="90"
          height="90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 43s-1.74-1.62-4.55-4.13C10.4 31.36 4 25.28 4 18.5 4 12.7 8.7 8 14.5 8c3.54 0 6.54 2.07 8 5.09C24.96 10.07 27.96 8 31.5 8 37.3 8 42 12.7 42 18.5c0 6.78-6.4 12.86-15.45 20.37C25.74 41.38 24 43 24 43z"
            fill="#ff2d55"
          />
        </svg>
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