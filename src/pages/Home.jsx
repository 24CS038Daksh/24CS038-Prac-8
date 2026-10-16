import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ loadedChunks }) {
  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <h2>Application Overview & Code Splitting Architecture</h2>
          <span className="badge-pill">Eagerly Loaded Route: /</span>
        </div>
        <p className="intro-text">
          This application demonstrates frontend performance optimization using <strong>React.lazy()</strong> and <strong>Suspense</strong> for route-based code splitting and on-demand third-party library loading.
        </p>

        {/* Architecture Comparison Diagram */}
        <div className="architecture-grid">
          <div className="arch-box before-box">
            <h3>Before Optimization (Single Monolithic Bundle)</h3>
            <div className="arch-flow">
              <div className="bundle-bar main-monolith">
                <span>main.bundle.js (~420 KB)</span>
              </div>
              <div className="arrow-down">↓ All components downloaded upfront on first load</div>
              <div className="comp-grid">
                <span className="comp-tag">[Home]</span>
                <span className="comp-tag">[Projects]</span>
                <span className="comp-tag">[Chart.js (185 KB)]</span>
                <span className="comp-tag">[Contact]</span>
              </div>
            </div>
            <p className="arch-note">Drawback: Slow Initial Page Load (FCP / LCP delayed) due to large unneeded code on initial visit.</p>
          </div>

          <div className="arch-box after-box">
            <h3>After Optimization (Route-based Code Splitting)</h3>
            <div className="arch-flow">
              <div className="bundle-bar split-entry">
                <span>index.js (Entry Bundle: ~78 KB)</span>
              </div>
              <div className="arrow-down">↓ Chunks requested ONLY when respective routes are visited</div>
              <div className="comp-grid split-chunks">
                <span className="comp-tag chunk">Projects.chunk.js (~18 KB)</span>
                <span className="comp-tag chunk">Analytics.chunk.js (~185 KB)</span>
                <span className="comp-tag chunk">Contact.chunk.js (~12 KB)</span>
              </div>
            </div>
            <p className="arch-note">Benefit: ~81% reduction in initial payload; instant initial render on mobile / 3G networks!</p>
          </div>
        </div>
      </div>

      {/* Dynamic Chunk Tracker */}
      <div className="card">
        <h3>Live Browser Chunk Tracking Status</h3>
        <p className="desc-text">
          The table below observes JavaScript chunks dynamically loaded into the browser memory as you navigate:
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Route Component</th>
              <th>Loading Strategy</th>
              <th>Estimated Size</th>
              <th>Network Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Home.jsx</code> (Dashboard)</td>
              <td>Eager (Initial Bundle)</td>
              <td>Part of ~78 KB entry</td>
              <td><span className="status-tag loaded">Downloaded Upfront</span></td>
            </tr>
            <tr>
              <td><code>Projects.jsx</code> (Task Management)</td>
              <td><code>React.lazy()</code> + Suspense</td>
              <td>~18 KB</td>
              <td>
                <span className={`status-tag ${loadedChunks.projects ? 'loaded' : 'pending'}`}>
                  {loadedChunks.projects ? 'Downloaded On Demand' : 'Not Loaded Yet (Click Projects to Fetch)'}
                </span>
              </td>
            </tr>
            <tr>
              <td><code>Analytics.jsx</code> (Chart.js Library)</td>
              <td><code>React.lazy()</code> Heavy Component</td>
              <td>~185 KB</td>
              <td>
                <span className={`status-tag ${loadedChunks.analytics ? 'loaded' : 'pending'}`}>
                  {loadedChunks.analytics ? 'Downloaded On Demand' : 'Not Loaded Yet (Click Analytics to Fetch)'}
                </span>
              </td>
            </tr>
            <tr>
              <td><code>Contact.jsx</code> (Feedback Form)</td>
              <td><code>React.lazy()</code> + Suspense</td>
              <td>~12 KB</td>
              <td>
                <span className={`status-tag ${loadedChunks.contact ? 'loaded' : 'pending'}`}>
                  {loadedChunks.contact ? 'Downloaded On Demand' : 'Not Loaded Yet (Click Contact to Fetch)'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="quick-nav-actions">
          <span>Test Route Chunks: </span>
          <Link to="/projects" className="btn btn-primary btn-sm">Navigate to Projects Chunk</Link>
          <Link to="/analytics" className="btn btn-secondary btn-sm">Navigate to Analytics Chunk</Link>
          <Link to="/contact" className="btn btn-outline btn-sm">Navigate to Contact Chunk</Link>
        </div>
      </div>
    </div>
  );
}
