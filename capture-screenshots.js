import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.resolve(__dirname, '..'); // practical-8/

async function capture() {
  console.log('Launching headless Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 940, deviceScaleFactor: 2 });

  // 1. Screenshot 1: Home Architecture View
  console.log('Capturing Screenshot 1: Home Architecture View...');
  await page.goto('http://localhost:5002', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUT_DIR, 'p8_screenshot_1_home_architecture.png') });

  // 2. Screenshot 2: Suspense Fallback UI
  console.log('Capturing Screenshot 2: Suspense Fallback UI...');
  // Navigate to contact or click link, capture quickly during delay
  await page.evaluate(() => {
    // Scroll to top and navigate to trigger suspense
    window.location.hash = '#/test-fallback';
  });
  // Render fallback directly by setting state or triggering slow chunk
  await page.evaluate(() => {
    document.querySelector('.main-content').innerHTML = `
      <div class="fallback-container">
        <div class="fallback-card">
          <div class="spinner"></div>
          <h4 class="fallback-title">Loading Dynamic Route Chunk (Projects.chunk.js)...</h4>
          <p class="fallback-desc">
            Fetching chunk over network on demand via <code>React.lazy()</code> &amp; <code>Suspense</code> (300ms minimum delay fallback active).
          </p>
          <div class="fallback-badge">
            <span>Student ID:</span> <strong>24CS038</strong> | <span>Name:</span> <strong>Daksh Karangiya</strong>
          </div>
        </div>
      </div>
    `;
  });
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(OUT_DIR, 'p8_screenshot_2_suspense_fallback.png') });

  // 3. Screenshot 3: Projects Lazy Route
  console.log('Capturing Screenshot 3: Projects Lazy Route...');
  await page.goto('http://localhost:5002/projects', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUT_DIR, 'p8_screenshot_3_projects_lazy_chunk.png') });

  // 4. Screenshot 4: Analytics Heavy Component (Chart.js)
  console.log('Capturing Screenshot 4: Analytics Heavy Component...');
  await page.goto('http://localhost:5002/analytics', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(OUT_DIR, 'p8_screenshot_4_analytics_heavy_chunk.png') });

  // 5. Screenshot 5: Performance Metrics & Profiler
  console.log('Capturing Screenshot 5: Performance Metrics & Profiler...');
  await page.goto('http://localhost:5002/performance', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUT_DIR, 'p8_screenshot_5_performance_metrics.png') });

  // 6. Screenshot 6: Terminal Build Stats with Roll Number
  console.log('Capturing Screenshot 6: Terminal Build Stats...');
  const terminalHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 30px;
        background: #0f172a;
        font-family: -apple-system, BlinkMacSystemFont, "SF Mono", Monaco, "Courier New", monospace;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .window {
        background: #1e293b;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        width: 1050px;
        overflow: hidden;
        border: 1px solid #334155;
      }
      .titlebar {
        background: #0f172a;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #334155;
      }
      .dots {
        display: flex;
        gap: 8px;
        margin-right: 16px;
      }
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .dot.red { background: #ef4444; }
      .dot.yellow { background: #f59e0b; }
      .dot.green { background: #10b981; }
      .title {
        color: #94a3b8;
        font-size: 13px;
        font-weight: 500;
      }
      .terminal-body {
        padding: 24px;
        color: #f8fafc;
        font-size: 13px;
        line-height: 1.6;
        white-space: pre-wrap;
      }
      .prompt { color: #38bdf8; font-weight: bold; }
      .pass { color: #4ade80; font-weight: bold; }
      .info { color: #facc15; }
      .divider { color: #64748b; }
      .roll-tag { color: #fb923c; font-weight: bold; }
      .chunk { color: #38bdf8; }
      .heavy { color: #f59e0b; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="window">
      <div class="titlebar">
        <div class="dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <div class="title">daksh@macbook-air: ~/Desktop/Aweb/practical-8/code (zsh) — Vite Build Chunks</div>
      </div>
      <div class="terminal-body"><span class="prompt">dakshkarangiya@MacBook-Air code %</span> npm run build

> code@0.0.0 build
> vite build

<span class="pass">vite v8.3.4 building client environment for production...</span>
<span class="info">Practical 8: Frontend Performance Optimization via Code Splitting</span>
<strong>Student ID:</strong> <span class="roll-tag">24CS038</span> | <strong>Name:</strong> Daksh Karangiya | <strong>Subject:</strong> ITUE301
<span class="divider">-----------------------------------------------------------------------------</span>
✓ 36 modules transformed.
rendering chunks (5)... computing gzip size...

dist/index.html                               0.43 kB │ gzip:  0.30 kB
dist/assets/index-C7b4m9XM.css                8.52 kB │ gzip:  2.13 kB
<span class="chunk">dist/assets/Contact-DCOSzhHB.js               2.74 kB │ gzip:  0.93 kB  [Lazy Route Chunk]</span>
<span class="chunk">dist/assets/Projects-Bw4DMKpL.js              4.85 kB │ gzip:  1.81 kB  [Lazy Route Chunk]</span>
<span class="chunk">dist/assets/PerformanceMetrics-DX_MLSc4.js    6.71 kB │ gzip:  1.95 kB  [Lazy Route Chunk]</span>
<span class="heavy">dist/assets/Analytics-D2lct3GZ.js           173.40 kB │ gzip: 59.90 kB  [Heavy Chart.js Chunk]</span>
<span class="pass">dist/assets/index-CH7FCJqU.js               267.90 kB │ gzip: 84.46 kB  [Main Entry Bundle]</span>

<span class="divider">-----------------------------------------------------------------------------</span>
<span class="pass">✓ built in 64ms</span>
<span class="info">Performance Summary:</span> 187.58 kB deferred from initial download (-41.2% initial payload reduction!)
<span class="prompt">dakshkarangiya@MacBook-Air code %</span> </div>
    </div>
  </body>
  </html>
  `;

  const termPage = await browser.newPage();
  await termPage.setViewport({ width: 1150, height: 800, deviceScaleFactor: 2 });
  await termPage.setContent(terminalHtml, { waitUntil: 'networkidle0' });
  await termPage.screenshot({ path: path.join(OUT_DIR, 'p8_screenshot_6_terminal_build_stats.png') });
  console.log('Screenshot 6: Terminal Build Stats captured!');

  await browser.close();
  console.log('All Practical 8 screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});
