import React, { useState, useMemo, useCallback } from 'react';

// Memoized Task Row to prevent unnecessary re-renders (Supplementary Problem)
const TaskRow = React.memo(function TaskRow({ task, onToggle, onDelete, renderCounter }) {
  // Track render count for this item
  renderCounter.count++;

  return (
    <tr className={task.completed ? 'task-done' : ''}>
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
      </td>
      <td>
        <strong>{task.title}</strong>
        <p className="task-subtext">{task.description}</p>
      </td>
      <td><span className={`badge-priority ${task.priority}`}>{task.priority}</span></td>
      <td>
        <span className={`badge-status ${task.completed ? 'completed' : 'pending'}`}>
          {task.completed ? 'Completed' : 'In Progress'}
        </span>
      </td>
      <td>
        <button className="btn btn-danger btn-xs" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
});

export default function Projects() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Implement React.lazy() for route splitting', description: 'Load routes on demand using Suspense', priority: 'high', completed: true },
    { id: 2, title: 'Measure initial bundle size reduction in DevTools', description: 'Compare monolithic bundle with chunk sizes', priority: 'high', completed: true },
    { id: 3, title: 'Lazy load heavy Chart.js library component', description: 'Defer chart parsing until analytics page is visited', priority: 'medium', completed: false },
    { id: 4, title: 'Add 300ms minimum-delay fallback helper', description: 'Prevent UI flicker on fast networks', priority: 'medium', completed: false }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newTitle, setNewTitle] = useState('');

  // Render stats tracker for React DevTools Profiler demonstration
  const [renderCount, setRenderCount] = useState(0);
  const rowRenderCounter = useMemo(() => ({ count: 0 }), []);

  const handleToggle = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      description: 'Added dynamically during Practical 8 session',
      priority: 'medium',
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setNewTitle('');
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'completed' && t.completed) ||
        (filter === 'pending' && !t.completed);
      const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchTerm]);

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Projects &amp; Task Management Module</h2>
            <p className="subtitle">
              Lazy Loaded Component (<code>Projects.chunk.js</code>) | Student ID: <strong>24CS038</strong> (Daksh Karangiya)
            </p>
          </div>
          <span className="badge-pill lazy">Lazy Chunk Loaded Successfully</span>
        </div>

        {/* Task Creator */}
        <form onSubmit={handleAddTask} className="task-add-form">
          <input
            type="text"
            placeholder="Add new project task..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="input-text"
          />
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>

        {/* Filter and Search Controls */}
        <div className="filter-bar">
          <div className="filter-group">
            <label>Filter Status: </label>
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({tasks.length})
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({tasks.filter((t) => !t.completed).length})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({tasks.filter((t) => t.completed).length})
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-text-sm"
            />
          </div>
        </div>

        {/* Tasks Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th width="40">Status</th>
              <th>Task Details</th>
              <th width="100">Priority</th>
              <th width="120">State</th>
              <th width="80">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  renderCounter={rowRenderCounter}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center empty-msg">
                  No tasks found matching criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* React Profiler Optimization Information Box */}
        <div className="profiler-callout">
          <h4>React DevTools Profiler &amp; Re-render Optimization (Supplementary Problem)</h4>
          <p>
            The table rows above are wrapped in <code>React.memo</code> and event handlers are stabilized with <code>useCallback</code>. When you type in the search bar or switch filters, unchanged items skip re-rendering, preventing wasted render cycles.
          </p>
        </div>
      </div>
    </div>
  );
}
