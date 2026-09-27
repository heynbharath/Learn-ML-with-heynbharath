// Interactive Logistic Regression & Sigmoid Function Visual Lab

class LogisticRegressionLab {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.beta0 = -4.0;
    this.beta1 = 0.8;
    this.threshold = 0.5;
    this.currentX = 6.0;

    this.benchmarkPoints = [
      { x: 2, label: "2 Hours" },
      { x: 4, label: "4 Hours" },
      { x: 6, label: "6 Hours" },
      { x: 8, label: "8 Hours" },
      { x: 10, label: "10 Hours" }
    ];

    this.renderLayout();
    this.initCanvas();
    this.attachEvents();
    this.update();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="lab-grid">
        <div class="lab-canvas-card">
          <div class="canvas-header">
            <h3>Sigmoid Probability Curve & Decision Threshold</h3>
            <div class="canvas-actions">
              <button class="btn btn-sm btn-secondary" id="log-reset-btn">Reset PDF Values</button>
            </div>
          </div>
          <div class="canvas-wrapper">
            <canvas id="log-canvas" width="600" height="380"></canvas>
            <div class="canvas-hint">Drag threshold slider or click canvas to shift study hours</div>
          </div>

          <div class="stage-flow-pipeline">
            <div class="stage-step">
              <span class="stage-name">1. Linear Score</span>
              <span class="stage-formula">z = β₀ + β₁X</span>
              <span class="stage-val" id="stage-z">0.80</span>
            </div>
            <div class="stage-arrow">➔</div>
            <div class="stage-step">
              <span class="stage-name">2. Sigmoid Function</span>
              <span class="stage-formula">1 / (1 + e^-z)</span>
              <span class="stage-val" id="stage-sig">1 / (1 + 0.45)</span>
            </div>
            <div class="stage-arrow">➔</div>
            <div class="stage-step">
              <span class="stage-name">3. Probability</span>
              <span class="stage-formula">P(Y=1|X)</span>
              <span class="stage-val highlight-prob" id="stage-prob">0.690 (69%)</span>
            </div>
            <div class="stage-arrow">➔</div>
            <div class="stage-step">
              <span class="stage-name">4. Decision Threshold</span>
              <span class="stage-formula">P ≥ Threshold ?</span>
              <span class="stage-val" id="stage-thresh-comp">0.690 ≥ 0.50</span>
            </div>
            <div class="stage-arrow">➔</div>
            <div class="stage-step">
              <span class="stage-name">5. Classification</span>
              <span class="stage-formula">Outcome</span>
              <span class="stage-badge badge-pass" id="stage-decision">PASS (1)</span>
            </div>
          </div>
        </div>

        <div class="lab-controls-card">
          <h3>Parameters & Benchmarks</h3>

          <div class="control-group">
            <div class="slider-header">
              <label for="log-x">Study Hours (X):</label>
              <span class="badge" id="log-x-val">${this.currentX.toFixed(1)} hrs</span>
            </div>
            <input type="range" id="log-x" min="0" max="12" step="0.2" value="${this.currentX}">
          </div>

          <div class="control-group">
            <div class="slider-header">
              <label for="log-thresh">Decision Threshold:</label>
              <span class="badge badge-accent" id="log-thresh-val">${this.threshold.toFixed(2)}</span>
            </div>
            <input type="range" id="log-thresh" min="0.1" max="0.9" step="0.02" value="${this.threshold}">
          </div>

          <div class="control-group">
            <div class="slider-header">
              <label for="log-b0">Bias / Intercept (β₀):</label>
              <span class="badge" id="log-b0-val">${this.beta0.toFixed(1)}</span>
            </div>
            <input type="range" id="log-b0" min="-8" max="2" step="0.2" value="${this.beta0}">
          </div>

          <div class="control-group">
            <div class="slider-header">
              <label for="log-b1">Coefficient (β₁):</label>
              <span class="badge" id="log-b1-val">${this.beta1.toFixed(2)}</span>
            </div>
            <input type="range" id="log-b1" min="0.1" max="2" step="0.05" value="${this.beta1}">
          </div>

          <div class="benchmark-table-box">
            <h4>PDF Slide 73-74 Benchmark Test Points</h4>
            <table class="benchmark-table">
              <thead>
                <tr>
                  <th>Study Hours</th>
                  <th>Linear z</th>
                  <th>Probability</th>
                  <th>At Threshold</th>
                </tr>
              </thead>
              <tbody id="log-benchmark-tbody">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  initCanvas() {
    this.canvas = document.getElementById('log-canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  attachEvents() {
    const xSlider = document.getElementById('log-x');
    const threshSlider = document.getElementById('log-thresh');
    const b0Slider = document.getElementById('log-b0');
    const b1Slider = document.getElementById('log-b1');

    xSlider.addEventListener('input', (e) => {
      this.currentX = parseFloat(e.target.value);
      document.getElementById('log-x-val').textContent = `${this.currentX.toFixed(1)} hrs`;
      this.update();
    });

    threshSlider.addEventListener('input', (e) => {
      this.threshold = parseFloat(e.target.value);
      document.getElementById('log-thresh-val').textContent = this.threshold.toFixed(2);
      this.update();
    });

    b0Slider.addEventListener('input', (e) => {
      this.beta0 = parseFloat(e.target.value);
      document.getElementById('log-b0-val').textContent = this.beta0.toFixed(1);
      this.update();
    });

    b1Slider.addEventListener('input', (e) => {
      this.beta1 = parseFloat(e.target.value);
      document.getElementById('log-b1-val').textContent = this.beta1.toFixed(2);
      this.update();
    });

    document.getElementById('log-reset-btn').addEventListener('click', () => {
      this.beta0 = -4.0;
      this.beta1 = 0.8;
      this.threshold = 0.5;
      this.currentX = 6.0;

      xSlider.value = this.currentX;
      threshSlider.value = this.threshold;
      b0Slider.value = this.beta0;
      b1Slider.value = this.beta1;

      document.getElementById('log-x-val').textContent = `${this.currentX.toFixed(1)} hrs`;
      document.getElementById('log-thresh-val').textContent = this.threshold.toFixed(2);
      document.getElementById('log-b0-val').textContent = this.beta0.toFixed(1);
      document.getElementById('log-b1-val').textContent = this.beta1.toFixed(2);

      this.update();
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const padding = 50;
      const w = this.canvas.width - padding * 2;
      const clickedX = ((mouseX - padding) / w) * 12;
      if (clickedX >= 0 && clickedX <= 12) {
        this.currentX = parseFloat(clickedX.toFixed(1));
        xSlider.value = this.currentX;
        document.getElementById('log-x-val').textContent = `${this.currentX.toFixed(1)} hrs`;
        this.update();
      }
    });
  }

  calcProb(x) {
    const z = this.beta0 + this.beta1 * x;
    const p = 1 / (1 + Math.exp(-z));
    return { z, p };
  }

  update() {
    const { z, p } = this.calcProb(this.currentX);
    const isPass = p >= this.threshold;

    // Update pipeline flow displays
    document.getElementById('stage-z').textContent = z.toFixed(2);
    const expTerm = Math.exp(-z);
    document.getElementById('stage-sig').textContent = `1 / (1 + ${expTerm.toFixed(2)})`;
    document.getElementById('stage-prob').textContent = `${p.toFixed(3)} (${(p * 100).toFixed(1)}%)`;
    document.getElementById('stage-thresh-comp').textContent = `${p.toFixed(3)} ${isPass ? '≥' : '<'} ${this.threshold.toFixed(2)}`;

    const decisionBadge = document.getElementById('stage-decision');
    if (decisionBadge) {
      decisionBadge.className = `stage-badge ${isPass ? 'badge-pass' : 'badge-fail'}`;
      decisionBadge.textContent = isPass ? 'PASS (1)' : 'FAIL (0)';
    }

    // Update benchmark table
    const tbody = document.getElementById('log-benchmark-tbody');
    if (tbody) {
      tbody.innerHTML = this.benchmarkPoints.map(bp => {
        const res = this.calcProb(bp.x);
        const pass = res.p >= this.threshold;
        const isCurrent = Math.abs(this.currentX - bp.x) < 0.2;
        return `
          <tr class="${isCurrent ? 'current-row' : ''}">
            <td><strong>${bp.x} hrs</strong></td>
            <td>${res.z.toFixed(2)}</td>
            <td><strong>${res.p.toFixed(3)}</strong></td>
            <td>
              <span class="badge ${pass ? 'badge-pass' : 'badge-fail'}">
                ${pass ? 'Pass' : 'Fail'}
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }

    this.draw();
  }

  dataToCanvas(x, p) {
    const padding = 50;
    const w = this.canvas.width - padding * 2;
    const h = this.canvas.height - padding * 2;

    const cx = padding + (x / 12) * w;
    const cy = this.canvas.height - padding - p * h;
    return { cx, cy };
  }

  draw() {
    const ctx = this.ctx;
    const padding = 50;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    // X Grid (Hours: 0 to 12)
    for (let x = 0; x <= 12; x += 2) {
      const { cx } = this.dataToCanvas(x, 0);
      ctx.beginPath();
      ctx.moveTo(cx, padding / 2);
      ctx.lineTo(cx, this.canvas.height - padding);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${x}h`, cx, this.canvas.height - padding + 18);
    }

    // Y Grid (Probabilities: 0.0 to 1.0)
    for (let p = 0; p <= 1.0; p += 0.2) {
      const { cy } = this.dataToCanvas(0, p);
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(this.canvas.width - padding / 2, cy);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(p.toFixed(1), padding - 10, cy + 4);
    }

    // Axes
    const orig = this.dataToCanvas(0, 0);
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(orig.cx, padding / 2);
    ctx.lineTo(orig.cx, orig.cy);
    ctx.lineTo(this.canvas.width - padding / 2, orig.cy);
    ctx.stroke();

    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Study Hours (X) ➔', this.canvas.width - padding / 2, orig.cy - 10);
    ctx.fillText('Probability P(Y=1) ⬆', orig.cx + 120, padding / 2 + 12);

    // Draw Threshold Horizontal Line
    const threshY = this.dataToCanvas(0, this.threshold).cy;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, threshY);
    ctx.lineTo(this.canvas.width - padding / 2, threshY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`Threshold = ${this.threshold.toFixed(2)}`, this.canvas.width - padding / 2, threshY - 6);

    // Draw Sigmoid Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    let first = true;
    for (let x = 0; x <= 12; x += 0.1) {
      const res = this.calcProb(x);
      const pt = this.dataToCanvas(x, res.p);
      if (first) {
        ctx.moveTo(pt.cx, pt.cy);
        first = false;
      } else {
        ctx.lineTo(pt.cx, pt.cy);
      }
    }
    ctx.stroke();

    // Draw Benchmark dots on curve
    this.benchmarkPoints.forEach(bp => {
      const res = this.calcProb(bp.x);
      const pt = this.dataToCanvas(bp.x, res.p);
      const pass = res.p >= this.threshold;

      ctx.fillStyle = pass ? '#22c55e' : '#ef4444';
      ctx.beginPath();
      ctx.arc(pt.cx, pt.cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Current X Point & Guides
    const currRes = this.calcProb(this.currentX);
    const currPt = this.dataToCanvas(this.currentX, currRes.p);
    const isPass = currRes.p >= this.threshold;

    // Vertical guideline from X axis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(currPt.cx, orig.cy);
    ctx.lineTo(currPt.cx, currPt.cy);
    ctx.lineTo(padding, currPt.cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glowing target marker
    ctx.fillStyle = isPass ? '#4ade80' : '#f87171';
    ctx.shadowColor = isPass ? '#22c55e' : '#ef4444';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(currPt.cx, currPt.cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`X=${this.currentX.toFixed(1)}h, P=${currRes.p.toFixed(3)}`, currPt.cx + 12, currPt.cy - 4);
  }
}

window.LogisticRegressionLab = LogisticRegressionLab;
