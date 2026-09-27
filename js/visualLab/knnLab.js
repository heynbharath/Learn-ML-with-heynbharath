// Interactive K-Nearest Neighbour (KNN) Visual Lab with Iris Dataset

class KNNLab {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    // 15 Iris Training instances from PDF Slide 109
    this.dataset = [
      { id: 1, sl: 5.3, sw: 3.7, species: "Setosa" },
      { id: 2, sl: 5.1, sw: 3.8, species: "Setosa" },
      { id: 3, sl: 7.2, sw: 3.0, species: "Virginica" },
      { id: 4, sl: 5.4, sw: 3.4, species: "Setosa" },
      { id: 5, sl: 5.1, sw: 3.3, species: "Setosa" },
      { id: 6, sl: 5.4, sw: 3.9, species: "Setosa" },
      { id: 7, sl: 7.4, sw: 2.8, species: "Virginica" },
      { id: 8, sl: 6.1, sw: 2.8, species: "Versicolor" },
      { id: 9, sl: 7.3, sw: 2.9, species: "Virginica" },
      { id: 10, sl: 6.0, sw: 2.7, species: "Versicolor" },
      { id: 11, sl: 5.8, sw: 2.8, species: "Virginica" },
      { id: 12, sl: 6.3, sw: 2.3, species: "Versicolor" },
      { id: 13, sl: 5.1, sw: 2.5, species: "Versicolor" },
      { id: 14, sl: 6.3, sw: 2.5, species: "Versicolor" },
      { id: 15, sl: 5.5, sw: 2.4, species: "Versicolor" }
    ];

    // PDF Slide 110 Query point: (5.2, 3.1)
    this.queryPoint = { sl: 5.2, sw: 3.1 };
    this.k = 5;
    this.isDragging = false;

    this.xMin = 4.8;
    this.xMax = 7.8;
    this.yMin = 2.0;
    this.yMax = 4.2;

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
            <h3>Iris 2D Feature Space (Sepal Length vs Sepal Width)</h3>
            <div class="canvas-actions">
              <button class="btn btn-sm btn-secondary" id="knn-reset-btn">Reset to PDF Query (5.2, 3.1)</button>
            </div>
          </div>
          <div class="canvas-wrapper">
            <canvas id="knn-canvas" width="600" height="420"></canvas>
            <div class="canvas-hint">Drag the Gold Query Point or click anywhere on the canvas</div>
          </div>

          <div class="knn-legend">
            <span class="legend-item"><span class="color-dot dot-setosa"></span> Setosa</span>
            <span class="legend-item"><span class="color-dot dot-versicolor"></span> Versicolor</span>
            <span class="legend-item"><span class="color-dot dot-virginica"></span> Virginica</span>
            <span class="legend-item"><span class="color-dot dot-query"></span> Query Point</span>
          </div>
        </div>

        <div class="lab-controls-card">
          <h3>KNN Neighborhood & Voting</h3>

          <div class="control-group">
            <div class="slider-header">
              <label for="knn-k-slider">Value of K (Neighbors):</label>
              <span class="badge badge-accent" id="knn-k-val">${this.k}</span>
            </div>
            <input type="range" id="knn-k-slider" min="1" max="15" step="1" value="${this.k}">
            <small class="text-muted">Choose odd K to prevent ties in binary sub-votes</small>
          </div>

          <div class="prediction-box">
            <h4>Majority Voting Result</h4>
            <div class="voting-display" id="knn-vote-tally">
              <!-- Populated dynamically -->
            </div>
            <div class="winner-banner" id="knn-winner-banner">
              Predicted Class: <strong id="knn-winner-class">Setosa</strong>
            </div>
          </div>

          <div class="ranking-table-box">
            <h4>Euclidean Distance Ranking (Top K Highlighted)</h4>
            <div class="table-scroll">
              <table class="benchmark-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>SL (x₁)</th>
                    <th>SW (y₁)</th>
                    <th>Species</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody id="knn-ranking-tbody">
                  <!-- Populated dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initCanvas() {
    this.canvas = document.getElementById('knn-canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  attachEvents() {
    const kSlider = document.getElementById('knn-k-slider');
    kSlider.addEventListener('input', (e) => {
      this.k = parseInt(e.target.value);
      document.getElementById('knn-k-val').textContent = this.k;
      this.update();
    });

    document.getElementById('knn-reset-btn').addEventListener('click', () => {
      this.queryPoint = { sl: 5.2, sw: 3.1 };
      this.k = 5;
      kSlider.value = 5;
      document.getElementById('knn-k-val').textContent = 5;
      this.update();
    });

    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const { cx, cy } = this.dataToCanvas(this.queryPoint.sl, this.queryPoint.sw);
      const dist = Math.hypot(cx - mouseX, cy - mouseY);
      if (dist < 18) {
        this.isDragging = true;
      } else {
        const { x, y } = this.canvasToData(mouseX, mouseY);
        this.queryPoint = {
          sl: Math.max(this.xMin, Math.min(this.xMax, parseFloat(x.toFixed(2)))),
          sw: Math.max(this.yMin, Math.min(this.yMax, parseFloat(y.toFixed(2))))
        };
        this.update();
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const { x, y } = this.canvasToData(mouseX, mouseY);
      this.queryPoint = {
        sl: Math.max(this.xMin, Math.min(this.xMax, parseFloat(x.toFixed(2)))),
        sw: Math.max(this.yMin, Math.min(this.yMax, parseFloat(y.toFixed(2))))
      };
      this.update();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  computeDistances() {
    return this.dataset.map(p => {
      // Euclidean distance formula from Slide 106: d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
      const d = Math.sqrt(
        Math.pow(p.sl - this.queryPoint.sl, 2) +
        Math.pow(p.sw - this.queryPoint.sw, 2)
      );
      return { ...p, distance: d };
    }).sort((a, b) => a.distance - b.distance);
  }

  update() {
    const sorted = this.computeDistances();
    const nearestK = sorted.slice(0, this.k);

    // Vote tally
    const votes = { Setosa: 0, Versicolor: 0, Virginica: 0 };
    nearestK.forEach(item => {
      votes[item.species] = (votes[item.species] || 0) + 1;
    });

    // Find majority winner
    let winner = "Setosa";
    let maxVotes = -1;
    for (const [species, count] of Object.entries(votes)) {
      if (count > maxVotes) {
        maxVotes = count;
        winner = species;
      }
    }

    // Update vote display
    const voteDisplay = document.getElementById('knn-vote-tally');
    if (voteDisplay) {
      voteDisplay.innerHTML = `
        <div class="vote-chip chip-setosa">Setosa: <strong>${votes.Setosa}</strong></div>
        <div class="vote-chip chip-versicolor">Versicolor: <strong>${votes.Versicolor}</strong></div>
        <div class="vote-chip chip-virginica">Virginica: <strong>${votes.Virginica}</strong></div>
      `;
    }

    const winnerClass = document.getElementById('knn-winner-class');
    if (winnerClass) {
      winnerClass.textContent = `${winner} (${maxVotes} / ${this.k} votes)`;
      winnerClass.className = `winner-${winner.toLowerCase()}`;
    }

    // Update ranking table
    const tbody = document.getElementById('knn-ranking-tbody');
    if (tbody) {
      tbody.innerHTML = sorted.map((p, idx) => {
        const isNeighbor = idx < this.k;
        return `
          <tr class="${isNeighbor ? 'neighbor-highlight' : ''}">
            <td><strong>#${idx + 1}</strong></td>
            <td>${p.sl.toFixed(1)}</td>
            <td>${p.sw.toFixed(1)}</td>
            <td><span class="species-tag species-${p.species.toLowerCase()}">${p.species}</span></td>
            <td><strong>${p.distance.toFixed(3)}</strong></td>
          </tr>
        `;
      }).join('');
    }

    this.draw(nearestK);
  }

  dataToCanvas(x, y) {
    const padding = 50;
    const w = this.canvas.width - padding * 2;
    const h = this.canvas.height - padding * 2;

    const cx = padding + ((x - this.xMin) / (this.xMax - this.xMin)) * w;
    const cy = this.canvas.height - padding - ((y - this.yMin) / (this.yMax - this.yMin)) * h;
    return { cx, cy };
  }

  canvasToData(cx, cy) {
    const padding = 50;
    const w = this.canvas.width - padding * 2;
    const h = this.canvas.height - padding * 2;

    const x = this.xMin + ((cx - padding) / w) * (this.xMax - this.xMin);
    const y = this.yMin + ((this.canvas.height - padding - cy) / h) * (this.yMax - this.yMin);
    return { x, y };
  }

  getSpeciesColor(species) {
    switch (species) {
      case 'Setosa': return '#22c55e';
      case 'Versicolor': return '#f97316';
      case 'Virginica': return '#a855f7';
      default: return '#94a3b8';
    }
  }

  draw(nearestK) {
    const ctx = this.ctx;
    const padding = 50;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let x = 5.0; x <= 7.5; x += 0.5) {
      const { cx } = this.dataToCanvas(x, 0);
      ctx.beginPath();
      ctx.moveTo(cx, padding / 2);
      ctx.lineTo(cx, this.canvas.height - padding);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(x.toFixed(1), cx, this.canvas.height - padding + 18);
    }

    for (let y = 2.0; y <= 4.0; y += 0.5) {
      const { cy } = this.dataToCanvas(0, y);
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(this.canvas.width - padding / 2, cy);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(y.toFixed(1), padding - 10, cy + 4);
    }

    // Axes
    const orig = this.dataToCanvas(this.xMin, this.yMin);
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
    ctx.fillText('Sepal Length (cm) ➔', this.canvas.width - padding / 2, orig.cy - 10);
    ctx.fillText('Sepal Width (cm) ⬆', orig.cx + 120, padding / 2 + 10);

    const qCanvas = this.dataToCanvas(this.queryPoint.sl, this.queryPoint.sw);

    // Draw neighbor bounding circle if k > 0
    if (nearestK && nearestK.length > 0) {
      const maxKDist = nearestK[nearestK.length - 1].distance;
      const samplePt = this.dataToCanvas(this.queryPoint.sl + maxKDist, this.queryPoint.sw);
      const pixelRadius = Math.abs(samplePt.cx - qCanvas.cx);

      ctx.fillStyle = 'rgba(250, 204, 21, 0.08)';
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(qCanvas.cx, qCanvas.cy, pixelRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Draw connection lines to K nearest
    nearestK.forEach(item => {
      const ptCanvas = this.dataToCanvas(item.sl, item.sw);
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(qCanvas.cx, qCanvas.cy);
      ctx.lineTo(ptCanvas.cx, ptCanvas.cy);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw Training Data Points
    this.dataset.forEach(item => {
      const { cx, cy } = this.dataToCanvas(item.sl, item.sw);
      const isNearest = nearestK.some(nk => nk.id === item.id);
      const color = this.getSpeciesColor(item.species);

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, isNearest ? 8 : 6, 0, Math.PI * 2);
      ctx.fill();

      if (isNearest) {
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(item.id.toString(), cx, cy + 3);
    });

    // Draw Query Point
    ctx.fillStyle = '#eab308';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(qCanvas.cx, qCanvas.cy, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Query (${this.queryPoint.sl}, ${this.queryPoint.sw})`, qCanvas.cx + 14, qCanvas.cy + 4);
  }
}

window.KNNLab = KNNLab;
