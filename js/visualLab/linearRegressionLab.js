// Interactive Linear Regression Visual Lab

class LinearRegressionLab {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.points = [
      { x: 1, y: 3 },
      { x: 2, y: 5 },
      { x: 3, y: 7 },
      { x: 4, y: 9 },
      { x: 5, y: 11 }
    ];
    this.slope = 2;
    this.intercept = 1;
    this.xMin = 0;
    this.xMax = 8;
    this.yMin = 0;
    this.yMax = 16;
    this.isDragging = false;
    this.draggedIndex = -1;
    this.predictX = 6;

    this.renderLayout();
    this.initCanvas();
    this.attachEvents();
    this.updateCalculations();
    this.draw();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="lab-grid">
        <div class="lab-canvas-card">
          <div class="canvas-header">
            <h3>Cartesian Coordinate Playground</h3>
            <div class="canvas-actions">
              <button class="btn btn-sm btn-secondary" id="lr-reset-btn">Reset PDF Data</button>
              <button class="btn btn-sm btn-primary" id="lr-fit-btn">Snap to OLS Best-Fit</button>
            </div>
          </div>
          <div class="canvas-wrapper">
            <canvas id="lr-canvas" width="600" height="420"></canvas>
            <div class="canvas-hint">Click anywhere on grid to add points • Drag existing points</div>
          </div>
        </div>

        <div class="lab-controls-card">
          <h3>Line Controls & Dynamic Math</h3>

          <div class="control-group">
            <div class="slider-header">
              <label for="lr-slope">Slope (a):</label>
              <span class="badge" id="lr-slope-val">${this.slope.toFixed(2)}</span>
            </div>
            <input type="range" id="lr-slope" min="-2" max="6" step="0.1" value="${this.slope}">
          </div>

          <div class="control-group">
            <div class="slider-header">
              <label for="lr-intercept">Intercept (b):</label>
              <span class="badge" id="lr-intercept-val">${this.intercept.toFixed(2)}</span>
            </div>
            <input type="range" id="lr-intercept" min="-5" max="10" step="0.1" value="${this.intercept}">
          </div>

          <div class="equation-box">
            <div class="eq-title">Current Fitted Equation:</div>
            <div class="eq-math" id="lr-equation-display">y = 2.00x + 1.00</div>
          </div>

          <div class="stats-panel">
            <div class="stat-item">
              <span class="stat-label">x̄ (Mean X):</span>
              <span class="stat-val" id="lr-xmean">3.00</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">ȳ (Mean Y):</span>
              <span class="stat-val" id="lr-ymean">7.00</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Numerator Σ(x-x̄)(y-ȳ):</span>
              <span class="stat-val" id="lr-num">20.00</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Denominator Σ(x-x̄)²:</span>
              <span class="stat-val" id="lr-den">10.00</span>
            </div>
            <div class="stat-item highlight">
              <span class="stat-label">RSS (Σ residuals²):</span>
              <span class="stat-val" id="lr-rss">0.00</span>
            </div>
            <div class="stat-item highlight">
              <span class="stat-label">MSE (RSS / n):</span>
              <span class="stat-val" id="lr-mse">0.00</span>
            </div>
          </div>

          <div class="prediction-box">
            <h4>Live Prediction Calculator</h4>
            <div class="pred-inputs">
              <label>Predict Y for X = </label>
              <input type="number" id="lr-pred-input" value="${this.predictX}" step="0.5" style="width: 80px;">
              <span class="pred-result">➔ Predicted ŷ = <strong id="lr-pred-output">13.00</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initCanvas() {
    this.canvas = document.getElementById('lr-canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  attachEvents() {
    const slopeSlider = document.getElementById('lr-slope');
    const interceptSlider = document.getElementById('lr-intercept');
    const slopeVal = document.getElementById('lr-slope-val');
    const interceptVal = document.getElementById('lr-intercept-val');

    slopeSlider.addEventListener('input', (e) => {
      this.slope = parseFloat(e.target.value);
      slopeVal.textContent = this.slope.toFixed(2);
      this.updateCalculations();
      this.draw();
    });

    interceptSlider.addEventListener('input', (e) => {
      this.intercept = parseFloat(e.target.value);
      interceptVal.textContent = this.intercept.toFixed(2);
      this.updateCalculations();
      this.draw();
    });

    document.getElementById('lr-fit-btn').addEventListener('click', () => {
      this.fitOLS();
    });

    document.getElementById('lr-reset-btn').addEventListener('click', () => {
      this.points = [
        { x: 1, y: 3 },
        { x: 2, y: 5 },
        { x: 3, y: 7 },
        { x: 4, y: 9 },
        { x: 5, y: 11 }
      ];
      this.fitOLS();
    });

    document.getElementById('lr-pred-input').addEventListener('input', (e) => {
      this.predictX = parseFloat(e.target.value) || 0;
      this.updatePrediction();
      this.draw();
    });

    // Canvas click & drag interactions
    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Check if clicked near an existing point
      const clickedIdx = this.points.findIndex(p => {
        const { cx, cy } = this.dataToCanvas(p.x, p.y);
        const dist = Math.hypot(cx - mouseX, cy - mouseY);
        return dist < 12;
      });

      if (clickedIdx !== -1) {
        this.isDragging = true;
        this.draggedIndex = clickedIdx;
      } else {
        // Add new point if within bounds
        const { x, y } = this.canvasToData(mouseX, mouseY);
        if (x >= this.xMin && x <= this.xMax && y >= this.yMin && y <= this.yMax) {
          this.points.push({ x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(1)) });
          this.updateCalculations();
          this.draw();
        }
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging || this.draggedIndex === -1) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const { x, y } = this.canvasToData(mouseX, mouseY);
      this.points[this.draggedIndex] = {
        x: Math.max(0, Math.min(this.xMax, parseFloat(x.toFixed(1)))),
        y: Math.max(0, Math.min(this.yMax, parseFloat(y.toFixed(1))))
      };
      this.updateCalculations();
      this.draw();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.draggedIndex = -1;
    });
  }

  fitOLS() {
    if (this.points.length < 2) return;
    const n = this.points.length;
    const xMean = this.points.reduce((acc, p) => acc + p.x, 0) / n;
    const yMean = this.points.reduce((acc, p) => acc + p.y, 0) / n;

    let num = 0;
    let den = 0;
    this.points.forEach(p => {
      num += (p.x - xMean) * (p.y - yMean);
      den += Math.pow(p.x - xMean, 2);
    });

    const olsSlope = den !== 0 ? num / den : 0;
    const olsIntercept = yMean - olsSlope * xMean;

    this.slope = olsSlope;
    this.intercept = olsIntercept;

    const slopeSlider = document.getElementById('lr-slope');
    const interceptSlider = document.getElementById('lr-intercept');
    if (slopeSlider && interceptSlider) {
      slopeSlider.value = olsSlope;
      interceptSlider.value = olsIntercept;
      document.getElementById('lr-slope-val').textContent = olsSlope.toFixed(2);
      document.getElementById('lr-intercept-val').textContent = olsIntercept.toFixed(2);
    }

    this.updateCalculations();
    this.draw();
  }

  updateCalculations() {
    const n = this.points.length;
    if (n === 0) return;

    const xMean = this.points.reduce((acc, p) => acc + p.x, 0) / n;
    const yMean = this.points.reduce((acc, p) => acc + p.y, 0) / n;

    let num = 0;
    let den = 0;
    let rss = 0;

    this.points.forEach(p => {
      num += (p.x - xMean) * (p.y - yMean);
      den += Math.pow(p.x - xMean, 2);
      const yPred = this.slope * p.x + this.intercept;
      rss += Math.pow(p.y - yPred, 2);
    });

    const mse = rss / n;

    const sign = this.intercept >= 0 ? '+' : '-';
    const eqStr = `y = ${this.slope.toFixed(2)}x ${sign} ${Math.abs(this.intercept).toFixed(2)}`;
    const eqDisplay = document.getElementById('lr-equation-display');
    if (eqDisplay) eqDisplay.textContent = eqStr;

    document.getElementById('lr-xmean').textContent = xMean.toFixed(2);
    document.getElementById('lr-ymean').textContent = yMean.toFixed(2);
    document.getElementById('lr-num').textContent = num.toFixed(2);
    document.getElementById('lr-den').textContent = den.toFixed(2);
    document.getElementById('lr-rss').textContent = rss.toFixed(2);
    document.getElementById('lr-mse').textContent = mse.toFixed(2);

    this.updatePrediction();
  }

  updatePrediction() {
    const predOut = document.getElementById('lr-pred-output');
    if (predOut) {
      const predY = this.slope * this.predictX + this.intercept;
      predOut.textContent = predY.toFixed(2);
    }
  }

  dataToCanvas(x, y) {
    const padding = 45;
    const w = this.canvas.width - padding * 2;
    const h = this.canvas.height - padding * 2;

    const cx = padding + ((x - this.xMin) / (this.xMax - this.xMin)) * w;
    const cy = this.canvas.height - padding - ((y - this.yMin) / (this.yMax - this.yMin)) * h;
    return { cx, cy };
  }

  canvasToData(cx, cy) {
    const padding = 45;
    const w = this.canvas.width - padding * 2;
    const h = this.canvas.height - padding * 2;

    const x = this.xMin + ((cx - padding) / w) * (this.xMax - this.xMin);
    const y = this.yMin + ((this.canvas.height - padding - cy) / h) * (this.yMax - this.yMin);
    return { x, y };
  }

  draw() {
    const ctx = this.ctx;
    const padding = 45;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid lines & Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = this.xMin; x <= this.xMax; x++) {
      const { cx } = this.dataToCanvas(x, 0);
      ctx.beginPath();
      ctx.moveTo(cx, padding / 2);
      ctx.lineTo(cx, this.canvas.height - padding);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(x.toString(), cx, this.canvas.height - padding + 18);
    }

    for (let y = this.yMin; y <= this.yMax; y += 2) {
      const { cy } = this.dataToCanvas(0, y);
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(this.canvas.width - padding / 2, cy);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(y.toString(), padding - 10, cy + 4);
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

    // Axis labels
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Feature X ➔', this.canvas.width - padding / 2, orig.cy - 10);
    ctx.fillText('Target Y ⬆', orig.cx + 70, padding / 2 + 10);

    // Draw Residual dashed lines
    this.points.forEach(p => {
      const predY = this.slope * p.x + this.intercept;
      const ptCanvas = this.dataToCanvas(p.x, p.y);
      const lineCanvas = this.dataToCanvas(p.x, predY);

      ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(ptCanvas.cx, ptCanvas.cy);
      ctx.lineTo(lineCanvas.cx, lineCanvas.cy);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw Regression Line
    const ptLeft = this.dataToCanvas(this.xMin, this.slope * this.xMin + this.intercept);
    const ptRight = this.dataToCanvas(this.xMax, this.slope * this.xMax + this.intercept);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ptLeft.cx, ptLeft.cy);
    ctx.lineTo(ptRight.cx, ptRight.cy);
    ctx.stroke();

    // Draw Data Points
    this.points.forEach((p, idx) => {
      const { cx, cy } = this.dataToCanvas(p.x, p.y);
      ctx.fillStyle = '#4ade80';
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Label point
      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`(${p.x}, ${p.y})`, cx + 8, cy - 4);
    });

    // Draw Prediction point if within bounds
    if (this.predictX >= this.xMin && this.predictX <= this.xMax) {
      const predY = this.slope * this.predictX + this.intercept;
      if (predY >= this.yMin && predY <= this.yMax) {
        const predCanvas = this.dataToCanvas(this.predictX, predY);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(predCanvas.cx, predCanvas.cy, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`Pred (${this.predictX}, ${predY.toFixed(1)})`, predCanvas.cx + 10, predCanvas.cy + 4);
      }
    }
  }
}

window.LinearRegressionLab = LinearRegressionLab;
