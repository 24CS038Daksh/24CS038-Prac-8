import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS modules inside this lazy chunk only
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics() {
  const barData = {
    labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Practical 8'],
    datasets: [
      {
        label: 'Tasks Completed (24CS038)',
        data: [12, 19, 15, 22, 28],
        backgroundColor: '#2563eb'
      },
      {
        label: 'Tasks In Progress',
        data: [4, 5, 3, 6, 2],
        backgroundColor: '#93c5fd'
      }
    ]
  };

  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Pending Review'],
    datasets: [
      {
        data: [28, 6, 4],
        backgroundColor: ['#16a34a', '#f59e0b', '#ef4444']
      }
    ]
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Heavy Third-Party Component: Chart.js Analytics</h2>
            <p className="subtitle">
              Lazy Loaded Component (<code>Analytics.chunk.js</code> ~185 KB) | Student: <strong>Daksh Karangiya (24CS038)</strong>
            </p>
          </div>
          <span className="badge-pill heavy">Heavy Library Isolated</span>
        </div>

        <div className="callout-box info">
          <strong>Supplementary Problem Highlight:</strong>
          <p>
            <code>Chart.js</code> and <code>react-chartjs-2</code> add ~185 KB of parsing and execution weight. By code-splitting this page, users who only visit <em>Home</em> or <em>Projects</em> never pay the bandwidth or CPU penalty of loading Chart.js!
          </p>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Sprint Velocity &amp; Task Completion</h3>
            <div className="chart-wrapper">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3>Overall Task Distribution (24CS038)</h3>
            <div className="chart-wrapper">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
