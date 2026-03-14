import React, { useState, useEffect } from 'react';
import './App.css';

const API = '/api/todos';

const PRIORITY_COLORS = {
  high:   '#ff4d4d',
  medium: '#f5a623',
  low:    '#4caf50'
};

export default function App() {
  const [todos, setTodos]       = useState([]);
  const [title, setTitle]       = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter]     = useState('all');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  // Fetch all todos
  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTodos(data);
    } catch {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority })
      });
      const data = await res.json();
      setTodos([data, ...todos]);
      setTitle('');
    } catch {
      setError('Failed to add todo');
    }
  };

  // Toggle completed
  const toggleTodo = async (id) => {
    try {
      const res = await fetch(`${API}/${id}/toggle`, { method: 'PATCH' });
      const updated = await res.json();
      setTodos(todos.map(t => t._id === id ? updated : t));
    } catch {
      setError('Failed to update todo');
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(t => t._id !== id));
    } catch {
      setError('Failed to delete todo');
    }
  };

  // Filter todos
  const filtered = todos.filter(t => {
    if (filter === 'active')    return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const counts = {
    all:       todos.length,
    active:    todos.filter(t => !t.completed).length,
    completed: todos.filter(t =>  t.completed).length
  };

  return (
    <div className="app">
      <div className="container">

        {/* Header */}
        <header className="header">
          <h1>📝 Todo App</h1>
          <p className="subtitle">MERN Stack — MongoDB · Express · React · Node</p>
        </header>

        {/* Error */}
        {error && <div className="error" onClick={() => setError('')}>⚠️ {error} (click to dismiss)</div>}

        {/* Add Todo Form */}
        <form className="form" onSubmit={addTodo}>
          <input
            className="input"
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <select
            className="select"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
          <button className="btn-add" type="submit">Add</button>
        </form>

        {/* Filter Tabs */}
        <div className="filters">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="count">{counts[f]}</span>
            </button>
          ))}
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="empty">No todos here 🎉</div>
        ) : (
          <ul className="todo-list">
            {filtered.map(todo => (
              <li key={todo._id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
                <div className="todo-left">
                  <span
                    className="priority-dot"
                    style={{ background: PRIORITY_COLORS[todo.priority] }}
                    title={todo.priority}
                  />
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id)}
                    className="checkbox"
                  />
                  <span className="todo-title">{todo.title}</span>
                </div>
                <div className="todo-right">
                  <span className="date">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    className="btn-delete"
                    onClick={() => deleteTodo(todo._id)}
                  >✕</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <footer className="footer">
          {counts.active} item{counts.active !== 1 ? 's' : ''} left
        </footer>

      </div>
    </div>
  );
}
