import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LoadingFallback from './components/LoadingFallback';
import { lazyWithDelay } from './utils/lazyWithDelay';
import './App.css';

// Lazy-loaded routes with minimum-delay fallback (Supplementary Problem)
const Projects = lazyWithDelay(() => import('./pages/Projects'), 350);
const Analytics = lazyWithDelay(() => import('./pages/Analytics'), 350);
const Contact = lazyWithDelay(() => import('./pages/Contact'), 350);
const PerformanceMetrics = lazyWithDelay(() => import('./pages/PerformanceMetrics'), 300);

function MainContent() {
  const location = useLocation();
  const [loadedChunks, setLoadedChunks] = useState({
    home: true,
    projects: false,
    analytics: false,
    contact: false,
    performance: false
  });

  useEffect(() => {
    const path = location.pathname;
    if (path === '/projects') {
      setLoadedChunks((prev) => ({ ...prev, projects: true }));
    } else if (path === '/analytics') {
      setLoadedChunks((prev) => ({ ...prev, analytics: true }));
    } else if (path === '/contact') {
      setLoadedChunks((prev) => ({ ...prev, contact: true }));
    } else if (path === '/performance') {
      setLoadedChunks((prev) => ({ ...prev, performance: true }));
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      {/* Header with Student and Practical details */}
      <header className="app-header">
        <div className="header-brand">
          <h1>Practical 8: Frontend Performance Optimization</h1>
          <p className="subtitle">
            ITUE301: Advance Web Development Framework | React.lazy(), Suspense, Code Splitting
          </p>
        </div>
        <div className="student-badge">
          <span className="badge-label">Student ID:</span>
          <span className="badge-value" id="student-roll">24CS038</span>
          <span className="badge-label">Name:</span>
          <span className="badge-value" id="student-name">Daksh Karangiya</span>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home (Eager)
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Projects (Lazy Chunk)
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Analytics (Chart.js Lazy)
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact (Lazy Chunk)
          </NavLink>
          <NavLink to="/performance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Performance Profiler
          </NavLink>
        </div>
        <div className="chunk-indicator">
          <span className="pulse-dot"></span>
          <span>Chunk Profiler Active</span>
        </div>
      </nav>

      {/* Main Content Area wrapped in Suspense with Meaningful Fallback */}
      <main className="main-content">
        <Suspense fallback={<LoadingFallback message="Loading Dynamic Route Chunk..." />}>
          <Routes>
            <Route path="/" element={<Home loadedChunks={loadedChunks} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/performance" element={<PerformanceMetrics />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Advance Web Development Framework (ITUE301) | Practical 8 | <strong>Daksh Karangiya (24CS038)</strong> | Academic Year: 2026-27
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}
