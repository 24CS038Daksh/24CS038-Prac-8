import React from 'react';

/**
 * Meaningful Suspense Fallback UI for lazy-loaded route chunks
 * Displays student roll number 24CS038 and loading animation
 */
export default function LoadingFallback({ message = 'Loading lazy component chunk...' }) {
  return (
    <div className="fallback-container">
      <div className="fallback-card">
        <div className="spinner"></div>
        <h4 className="fallback-title">{message}</h4>
        <p className="fallback-desc">
          Fetching chunk over network on demand via <code>React.lazy()</code> &amp; <code>Suspense</code>.
        </p>
        <div className="fallback-badge">
          <span>Student ID:</span> <strong>24CS038</strong> | <span>Name:</span> <strong>Daksh Karangiya</strong>
        </div>
      </div>
    </div>
  );
}
