// Interactive Support Vector Machine & Kernel Trick Visual Lab

class SVMLab {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeMode = 'linear'; // 'linear', 'nonlinear_3d', or 'lili_jiang'

    // Mode 1: Linear points
    this.linearPoints = [
      // Class +1 (Blue circles)
      { x: 2.0, y: 5.5, label: 1 },
      { x: 2.5, y: 7.0, label: 1 },
      { x: 3.5, y: 6.0, label: 1 },
      { x: 1.5, y: 8.0, label: 1 },
      { x: 3.0, y: 8.5, label: 1 },
      // Class -1 (Red squares)
      { x: 6.0, y: 2.5, label: -1 },
      { x: 7.0, y: 3.5, label: -1 },
      { x: 5.5, y: 4.0, label: -1 },
      { x: 7.5, y: 2.0, label: -1 },
      { x: 8.0, y: 4.5, label: -1 }
    ];

    // Linear boundary parameters
    this.angleDeg = 45; // angle of normal vector w
    this.offset = 5.0; // hyperplane bias position

    // Mode 3: Lili Jiang vector inputs
    this.vecX = [2, 3, 4];
    this.vecY = [3, 4, 5];
    this.polyDegree = 2;

    this.renderLayout();
    this.initCanvas();
    this.attachEvents();
    this.update();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="svm-tabs-nav">
        <button class="tab-btn ${this.activeMode === 'linear' ? 'active' : ''}" id="svm-tab-linear">1. Linear SVM & Maximal Margin</button>
        <button class="tab-btn ${this.activeMode === 'nonlinear_3d' ? 'active' : ''}" id="svm-tab-3d">2. Non-Linear 2D ➔ 3D (z = x² + y²)</button>
        <button class="tab-btn ${this.activeMode === 'lili_jiang' ? 'active' : ''}" id="svm-tab-kernel">3. Lili Jiang's Kernel Trick (Slide 144)</button>
      </div>

      <div id="svm-view-container">
        <!-- Rendered based on mode -->
      </div>
    `;
  }

  initCanvas() {
    // Dynamic based on view
  }

  attachEvents() {
    document.getElementById('svm-tab-linear').addEventListener('click', () => {
      this.activeMode = 'linear';
      this.updateTabs();
    });

    document.getElementById('svm-tab-3d').addEventListener('click', () => {
      this.activeMode = 'nonlinear_3d';
      this.updateTabs();
    });

    document.getElementById('svm-tab-kernel').addEventListener('click', () => {
      this.activeMode = 'lili_jiang';
      this.updateTabs();
    });
  }

  updateTabs() {
    document.querySelectorAll('.svm-tabs-nav .tab-btn').forEach(btn => btn.classList.remove('active'));
    if (this.activeMode === 'linear') document.getElementById('svm-tab-linear').classList.add('active');
    else if (this.activeMode === 'nonlinear_3d') document.getElementById('svm-tab-3d').classList.add('active');
    else document.getElementById('svm-tab-kernel').classList.add('active');

    this.update();
  }

  update() {
    const viewContainer = document.getElementById('svm-view-container');
    if (!viewContainer) return;

    if (this.activeMode === 'linear') {
      this.renderLinearView(viewContainer);
    } else if (this.activeMode === 'nonlinear_3d') {
      this.renderNonlinear3DView(viewContainer);
    } else {
      this.renderLiliJiangView(viewContainer);
    }
  }

  // =================== MODE 1: LINEAR SVM ===================
  renderLinearView(container) {
    container.innerHTML = `
      <div class="lab-grid">
        <div class="lab-canvas-card">
          <div class="canvas-header">
            <h3>Hyperplane, Support Vectors & Margin Gutters</h3>
            <div class="canvas-actions">
              <button class="btn btn-sm btn-primary" id="svm-optimal-btn">Snap to Maximal Margin</button>
            </div>
          </div>
          <div class="canvas-wrapper">
            <canvas id="svm-linear-canvas" width="600" height="420"></canvas>
            <div class="canvas-hint">Rotate hyperplane or shift bias to inspect margin width</div>
          </div>
          <div class="knn-legend">
            <span class="legend-item"><span class="color-dot dot-class1"></span> Class +1</span>
            <span class="legend-item"><span class="color-dot dot-class2"></span> Class -1</span>
            <span class="legend-item"><span class="sv-ring-legend"></span> Support Vectors (Border cases)</span>
          </div>
        </div>

        <div class="lab-controls-card">
          <h3>Hyperplane Geometry</h3>

          <div class="control-group">
            <div class="slider-header">
              <label for="svm-angle">Hyperplane Angle (θ):</label>
              <span class="badge" id="svm-angle-val">${this.angleDeg}°</span>
            </div>
            <input type="range" id="svm-angle" min="10" max="80" step="1" value="${this.angleDeg}">
          </div>

          <div class="control-group">
            <div class="slider-header">
              <label for="svm-offset">Hyperplane Position / Bias:</label>
              <span class="badge" id="svm-offset-val">${this.offset.toFixed(2)}</span>
            </div>
            <input type="range" id="svm-offset" min="2.0" max="8.0" step="0.1" value="${this.offset}">
          </div>

          <div class="equation-box">
            <div class="eq-title">Hyperplane Formula (Slide 128):</div>
            <div class="eq-math" id="svm-eq-text">w · x + b = 0</div>
            <div class="margin-math" id="svm-margin-text">Margin = 2 / ||w|| = <strong>1.82</strong></div>
          </div>

          <div class="svm-theory-box">
            <h4>Core Exam Pointers (Slide 117, 128, 132):</h4>
            <p>• <strong>Hyperplane:</strong> The decision boundary dividing classes (straight line in 2D).</p>
            <p>• <strong>Support Vectors:</strong> The extreme points closest to the hyperplane. ONLY these points define the margin and hyperplane position!</p>
            <p>• <strong>Margin:</strong> Distance between parallel boundary gutters. Distance between support vectors and hyperplane should be <em>as far as possible</em> (Maximal Margin).</p>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('svm-linear-canvas');
    const ctx = canvas.getContext('2d');

    const angleSlider = document.getElementById('svm-angle');
    const offsetSlider = document.getElementById('svm-offset');

    angleSlider.addEventListener('input', (e) => {
      this.angleDeg = parseFloat(e.target.value);
      document.getElementById('svm-angle-val').textContent = `${this.angleDeg}°`;
      this.drawLinearCanvas(canvas, ctx);
    });

    offsetSlider.addEventListener('input', (e) => {
      this.offset = parseFloat(e.target.value);
      document.getElementById('svm-offset-val').textContent = this.offset.toFixed(2);
      this.drawLinearCanvas(canvas, ctx);
    });

    document.getElementById('svm-optimal-btn').addEventListener('click', () => {
      this.angleDeg = 45;
      this.offset = 5.2;
      angleSlider.value = this.angleDeg;
      offsetSlider.value = this.offset;
      document.getElementById('svm-angle-val').textContent = `${this.angleDeg}°`;
      document.getElementById('svm-offset-val').textContent = this.offset.toFixed(2);
      this.drawLinearCanvas(canvas, ctx);
    });

    this.drawLinearCanvas(canvas, ctx);
  }

  drawLinearCanvas(canvas, ctx) {
    const padding = 45;
    const w = canvas.width - padding * 2;
    const h = canvas.height - padding * 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rad = (this.angleDeg * Math.PI) / 180;
    const nx = Math.cos(rad);
    const ny = Math.sin(rad);

    // Compute projection of points along normal vector n
    const projected = this.linearPoints.map(p => ({
      ...p,
      proj: p.x * nx + p.y * ny
    }));

    // Find support vectors closest to the hyperplane boundary
    const posPoints = projected.filter(p => p.label === 1);
    const negPoints = projected.filter(p => p.label === -1);

    const minPos = Math.min(...posPoints.map(p => p.proj));
    const maxNeg = Math.max(...negPoints.map(p => p.proj));

    // Current hyperplane offset = this.offset
    const marginHalf = Math.max(0.4, (minPos - maxNeg) / 2);
    const currentMargin = (marginHalf * 2).toFixed(2);

    const marginElem = document.getElementById('svm-margin-text');
    if (marginElem) {
      marginElem.innerHTML = `Margin Width 2/||w|| = <strong>${currentMargin}</strong>`;
    }

    const toCanvas = (x, y) => ({
      cx: padding + (x / 10) * w,
      cy: canvas.height - padding - (y / 10) * h
    });

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i += 2) {
      const p1 = toCanvas(i, 0);
      ctx.beginPath();
      ctx.moveTo(p1.cx, padding / 2);
      ctx.lineTo(p1.cx, canvas.height - padding);
      ctx.stroke();

      const p2 = toCanvas(0, i);
      ctx.beginPath();
      ctx.moveTo(padding, p2.cy);
      ctx.lineTo(canvas.width - padding / 2, p2.cy);
      ctx.stroke();
    }

    // Draw Margin Gutter Band (shaded)
    // Line: nx*x + ny*y = this.offset
    // Positive margin: nx*x + ny*y = this.offset - marginHalf
    // Negative margin: nx*x + ny*y = this.offset + marginHalf
    const drawHyperplaneLine = (cVal, color, dash = [], lineWidth = 2) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(dash);

      // x = (cVal - ny*y) / nx
      const y0 = 0;
      const x0 = (cVal - ny * y0) / nx;
      const y1 = 10;
      const x1 = (cVal - ny * y1) / nx;

      const p0 = toCanvas(x0, y0);
      const p1 = toCanvas(x1, y1);

      ctx.beginPath();
      ctx.moveTo(p0.cx, p0.cy);
      ctx.lineTo(p1.cx, p1.cy);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Shaded margin gutter
    drawHyperplaneLine(this.offset - marginHalf, 'rgba(56, 189, 248, 0.6)', [6, 4], 2);
    drawHyperplaneLine(this.offset + marginHalf, 'rgba(239, 68, 68, 0.6)', [6, 4], 2);
    drawHyperplaneLine(this.offset, '#fbbf24', [], 3); // Main decision boundary

    // Label the Hyperplane
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px monospace';
    const midPoint = toCanvas((this.offset - ny * 5) / nx, 5);
    ctx.fillText('Hyperplane: w·x + b = 0', midPoint.cx + 8, midPoint.cy - 10);

    // Draw Points and highlight Support Vectors
    projected.forEach(p => {
      const { cx, cy } = toCanvas(p.x, p.y);
      const isPosSV = p.label === 1 && Math.abs(p.proj - minPos) < 0.35;
      const isNegSV = p.label === -1 && Math.abs(p.proj - maxNeg) < 0.35;
      const isSV = isPosSV || isNegSV;

      if (isSV) {
        // Glowing Support Vector Ring
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText('SV', cx + 16, cy + 4);
      }

      if (p.label === 1) {
        // Blue circle
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        // Red square
        ctx.fillStyle = '#f87171';
        ctx.fillRect(cx - 7, cy - 7, 14, 14);
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx - 7, cy - 7, 14, 14);
      }
    });
  }

  // =================== MODE 2: 2D TO 3D KERNEL MAPPING ===================
  renderNonlinear3DView(container) {
    container.innerHTML = `
      <div class="lab-grid">
        <div class="lab-canvas-card">
          <div class="canvas-header">
            <h3>Slide 134-135: Non-Linear 2D Space ➔ 3D Transformation (z = x² + y²)</h3>
          </div>
          <div class="canvas-wrapper">
            <canvas id="svm-3d-canvas" width="600" height="420"></canvas>
            <div class="canvas-hint">Watch how circular data becomes linearly separable at height threshold</div>
          </div>
          <div class="knn-legend">
            <span class="legend-item"><span class="color-dot dot-class2"></span> Inner Red Cluster (x² + y² < 9)</span>
            <span class="legend-item"><span class="color-dot dot-class1"></span> Outer Blue Ring (x² + y² > 16)</span>
            <span class="legend-item"><span class="color-dot dot-query"></span> 2D Hyperplane Plane (z = 12)</span>
          </div>
        </div>

        <div class="lab-controls-card">
          <h3>The Higher-Dimensional Elevation</h3>
          <div class="equation-box">
            <div class="eq-title">Slide 134 Transformation:</div>
            <div class="eq-math">z = x² + y²</div>
            <p style="margin-top: 8px; font-size: 0.9rem; color: var(--text-secondary);">
              In 2D (x, y), the inner red circle and outer blue ring cannot be separated by ANY straight line.
              By creating a 3rd axis z = x² + y², the inner points stay near the bottom (z < 9), while the outer points rise high into the bowl (z > 16).
            </p>
          </div>

          <div class="stage-flow-pipeline" style="flex-direction: column; gap: 10px;">
            <div class="stage-step" style="width: 100%;">
              <span class="stage-name">Step 1: Non-Linearly Separable (2D)</span>
              <span class="stage-formula">Points in circular arrangement</span>
            </div>
            <div class="stage-arrow" style="transform: rotate(90deg); align-self: center;">➔</div>
            <div class="stage-step" style="width: 100%;">
              <span class="stage-name">Step 2: Add Dimension z = x² + y²</span>
              <span class="stage-formula">Transforms plane into a 3D paraboloid bowl</span>
            </div>
            <div class="stage-arrow" style="transform: rotate(90deg); align-self: center;">➔</div>
            <div class="stage-step" style="width: 100%;">
              <span class="stage-name">Step 3: Linear Hyperplane (3D)</span>
              <span class="stage-formula">A flat 2D sheet z = 12 cuts cleanly between them!</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('svm-3d-canvas');
    const ctx = canvas.getContext('2d');
    this.draw3DCanvas(canvas, ctx);
  }

  draw3DCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Split canvas into two views: Left (2D Top View), Right (3D Isometric Bowl View)
    const midX = canvas.width / 2;

    // ----- Left Panel: 2D Original Space -----
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(10, 10, midX - 20, canvas.height - 20);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(10, 10, midX - 20, canvas.height - 20);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('2D Input Space (x, y)', midX / 2, 35);
    ctx.fillStyle = '#ef4444';
    ctx.font = '11px sans-serif';
    ctx.fillText('❌ Impossible to separate linearly', midX / 2, 55);

    const c2d = { x: midX / 2, y: canvas.height / 2 + 10 };

    // Generate concentric points
    const innerPoints = [];
    const outerPoints = [];

    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
      innerPoints.push({ x: Math.cos(a) * 2.2, y: Math.sin(a) * 2.2 });
      outerPoints.push({ x: Math.cos(a) * 5.0, y: Math.sin(a) * 5.0 });
    }

    // Draw 2D Points
    innerPoints.forEach(p => {
      ctx.fillStyle = '#f87171';
      ctx.beginPath();
      ctx.arc(c2d.x + p.x * 14, c2d.y + p.y * 14, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    outerPoints.forEach(p => {
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(c2d.x + p.x * 14, c2d.y + p.y * 14, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // ----- Right Panel: 3D Feature Space (z = x² + y²) -----
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(midX + 10, 10, midX - 20, canvas.height - 20);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(midX + 10, 10, midX - 20, canvas.height - 20);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('3D Feature Space (x, y, z = x²+y²)', midX + midX / 2, 35);
    ctx.fillStyle = '#22c55e';
    ctx.font = '11px sans-serif';
    ctx.fillText('✔ Linearly Separable by Flat Hyperplane!', midX + midX / 2, 55);

    const c3d = { x: midX + midX / 2, y: canvas.height / 2 + 50 };

    // Isometric projection: isoX = x - y*0.6, isoY = -(z*4) + (x + y)*0.3
    const project3D = (x, y, z) => ({
      px: c3d.x + (x - y) * 12,
      py: c3d.y - z * 5 + (x + y) * 4
    });

    // Draw Paraboloid mesh lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let r = 1; r <= 5; r += 1.5) {
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += Math.PI / 16) {
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        const z = x * x + y * y;
        const pt = project3D(x, y, z);
        if (a === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.stroke();
    }

    // Draw Horizontal Separating Hyperplane Plane (z = 12)
    const cutZ = 12;
    const planeCorners = [
      project3D(-5.5, -5.5, cutZ),
      project3D(5.5, -5.5, cutZ),
      project3D(5.5, 5.5, cutZ),
      project3D(-5.5, 5.5, cutZ)
    ];

    ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(planeCorners[0].px, planeCorners[0].py);
    ctx.lineTo(planeCorners[1].px, planeCorners[1].py);
    ctx.lineTo(planeCorners[2].px, planeCorners[2].py);
    ctx.lineTo(planeCorners[3].px, planeCorners[3].py);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Separating Hyperplane (z = 12)', planeCorners[1].px - 20, planeCorners[1].py - 6);

    // Draw 3D Points
    innerPoints.forEach(p => {
      const z = p.x * p.x + p.y * p.y;
      const pt = project3D(p.x, p.y, z);
      ctx.fillStyle = '#f87171';
      ctx.beginPath();
      ctx.arc(pt.px, pt.py, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#7f1d1d';
      ctx.stroke();
    });

    outerPoints.forEach(p => {
      const z = p.x * p.x + p.y * p.y;
      const pt = project3D(p.x, p.y, z);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(pt.px, pt.py, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0369a1';
      ctx.stroke();
    });
  }

  // =================== MODE 3: LILI JIANG KERNEL TRICK ===================
  renderLiliJiangView(container) {
    // x = (2, 3, 4), y = (3, 4, 5)
    const dot = this.vecX[0]*this.vecY[0] + this.vecX[1]*this.vecY[1] + this.vecX[2]*this.vecY[2]; // 38
    const kernelVal = Math.pow(dot, this.polyDegree); // 38^2 = 1444

    // 9D coordinate expansion
    const fX = [
      this.vecX[0]*this.vecX[0], this.vecX[0]*this.vecX[1], this.vecX[0]*this.vecX[2],
      this.vecX[1]*this.vecX[0], this.vecX[1]*this.vecX[1], this.vecX[1]*this.vecX[2],
      this.vecX[2]*this.vecX[0], this.vecX[2]*this.vecX[1], this.vecX[2]*this.vecX[2]
    ];

    const fY = [
      this.vecY[0]*this.vecY[0], this.vecY[0]*this.vecY[1], this.vecY[0]*this.vecY[2],
      this.vecY[1]*this.vecY[0], this.vecY[1]*this.vecY[1], this.vecY[1]*this.vecY[2],
      this.vecY[2]*this.vecY[0], this.vecY[2]*this.vecY[1], this.vecY[2]*this.vecY[2]
    ];

    const products = fX.map((fx, i) => fx * fY[i]);
    const sum9D = products.reduce((acc, v) => acc + v, 0);

    container.innerHTML = `
      <div class="lab-grid">
        <div class="lab-canvas-card">
          <div class="canvas-header">
            <h3>Lili Jiang's Equation: K(x, y) = &lt;f(x), f(y)&gt; (Slides 143-144)</h3>
          </div>

          <div class="kernel-compare-grid">
            <div class="method-card method-kernel">
              <div class="method-badge badge-pass">Method A: The Kernel Trick (1 Step)</div>
              <h4>K(x, y) = (x · y)²</h4>
              <p>Compute low-dimensional dot product, then raise to power d:</p>
              <div class="code-box">
                x · y = (${this.vecX[0]}×${this.vecY[0]}) + (${this.vecX[1]}×${this.vecY[1]}) + (${this.vecX[2]}×${this.vecY[2]})<br>
                x · y = ${this.vecX[0]*this.vecY[0]} + ${this.vecX[1]*this.vecY[1]} + ${this.vecX[2]*this.vecY[2]} = <strong>${dot}</strong><br>
                K(x, y) = (${dot})² = <strong class="badge badge-accent" style="font-size: 1.2rem;">${kernelVal}</strong>
              </div>
              <div class="complexity-tag">Complexity: O(d) — Fast & Scalable!</div>
            </div>

            <div class="method-card method-direct">
              <div class="method-badge badge-warning">Method B: Direct 9D Coordinate Projection</div>
              <h4>f(x) · f(y) in 9-Dimensional Space</h4>
              <p>Expand every combination (x₁x₁, x₁x₂, ..., x₃x₃):</p>
              <div class="code-box" style="font-size: 0.82rem;">
                f(${this.vecX.join(', ')}) = (${fX.join(', ')})<br>
                f(${this.vecY.join(', ')}) = (${fY.join(', ')})<br>
                Dot Product = (${products.join(' + ')})<br>
                = <strong class="badge badge-accent" style="font-size: 1.2rem;">${sum9D}</strong>
              </div>
              <div class="complexity-tag">Complexity: O(d²) — Heavy & Redundant!</div>
            </div>
          </div>

          <div class="conclusion-banner">
            <h3>Verdict from Slide 144:</h3>
            <p>
              Both methods yield the <strong>exact same scalar result (${kernelVal})</strong>!
              However, Method B required projecting 3 dimensions into 9 dimensions, whereas the <strong>Kernel Trick</strong> computed it instantly in 3D space.
            </p>
          </div>
        </div>

        <div class="lab-controls-card">
          <h3>Interactive Vector Inputs</h3>

          <div class="vector-input-group">
            <label>Vector x (3D):</label>
            <div class="vec-row">
              <input type="number" id="vec-x0" value="${this.vecX[0]}" style="width: 60px;">
              <input type="number" id="vec-x1" value="${this.vecX[1]}" style="width: 60px;">
              <input type="number" id="vec-x2" value="${this.vecX[2]}" style="width: 60px;">
            </div>
          </div>

          <div class="vector-input-group">
            <label>Vector y (3D):</label>
            <div class="vec-row">
              <input type="number" id="vec-y0" value="${this.vecY[0]}" style="width: 60px;">
              <input type="number" id="vec-y1" value="${this.vecY[1]}" style="width: 60px;">
              <input type="number" id="vec-y2" value="${this.vecY[2]}" style="width: 60px;">
            </div>
          </div>

          <div class="vector-input-group">
            <label>Polynomial Degree d:</label>
            <input type="number" id="vec-deg" value="${this.polyDegree}" min="1" max="5" style="width: 60px;">
          </div>

          <button class="btn btn-sm btn-secondary" id="vec-reset-btn">Reset PDF Values [2,3,4] & [3,4,5]</button>

          <div class="svm-theory-box" style="margin-top: 15px;">
            <h4>5 Kernel Types in Slide 145-146:</h4>
            <p>1. <strong>Linear:</strong> K(x₁, x₂) = x₁ · x₂</p>
            <p>2. <strong>Polynomial:</strong> K(x₁, x₂) = (x₁ · x₂ + 1)ᵈ</p>
            <p>3. <strong>Gaussian (RBF):</strong> k(x₁, xₙ) = e^(-γ ||x₁ - xₙ||²)</p>
            <p>4. <strong>Exponential:</strong> k(x, y) = exp(-||x - y|| / (2σ²))</p>
            <p>5. <strong>Laplacian:</strong> k(x, y) = exp(-||x - y|| / σ)</p>
          </div>
        </div>
      </div>
    `;

    // Attach vector input events
    const updateInputs = () => {
      this.vecX = [
        parseFloat(document.getElementById('vec-x0').value) || 0,
        parseFloat(document.getElementById('vec-x1').value) || 0,
        parseFloat(document.getElementById('vec-x2').value) || 0
      ];
      this.vecY = [
        parseFloat(document.getElementById('vec-y0').value) || 0,
        parseFloat(document.getElementById('vec-y1').value) || 0,
        parseFloat(document.getElementById('vec-y2').value) || 0
      ];
      this.polyDegree = parseInt(document.getElementById('vec-deg').value) || 2;
      this.renderLiliJiangView(container);
    };

    ['vec-x0', 'vec-x1', 'vec-x2', 'vec-y0', 'vec-y1', 'vec-y2', 'vec-deg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', updateInputs);
    });

    document.getElementById('vec-reset-btn').addEventListener('click', () => {
      this.vecX = [2, 3, 4];
      this.vecY = [3, 4, 5];
      this.polyDegree = 2;
      this.renderLiliJiangView(container);
    });
  }
}

window.SVMLab = SVMLab;
