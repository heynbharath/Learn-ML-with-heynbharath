// Interactive Decision Tree Split & Impurity Lab (ID3 & CART)

class DecisionTreeLab {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.metricMode = 'id3'; // 'id3' (Entropy/IG) or 'cart' (Gini Index)
    this.selectedAttribute = 'Humidity'; // Default matches PDF Slide 180

    // Mitchell's 14-day PlayTennis Dataset from Slide 156
    this.dataset = [
      { day: 'D1', outlook: 'Sunny', temp: 'Hot', humidity: 'High', wind: 'Weak', play: 'No' },
      { day: 'D2', outlook: 'Sunny', temp: 'Hot', humidity: 'High', wind: 'Strong', play: 'No' },
      { day: 'D3', outlook: 'Overcast', temp: 'Hot', humidity: 'High', wind: 'Weak', play: 'Yes' },
      { day: 'D4', outlook: 'Rain', temp: 'Mild', humidity: 'High', wind: 'Weak', play: 'Yes' },
      { day: 'D5', outlook: 'Rain', temp: 'Cool', humidity: 'Normal', wind: 'Weak', play: 'Yes' },
      { day: 'D6', outlook: 'Rain', temp: 'Cool', humidity: 'Normal', wind: 'Strong', play: 'No' },
      { day: 'D7', outlook: 'Overcast', temp: 'Cool', humidity: 'Normal', wind: 'Strong', play: 'Yes' },
      { day: 'D8', outlook: 'Sunny', temp: 'Mild', humidity: 'High', wind: 'Weak', play: 'No' },
      { day: 'D9', outlook: 'Sunny', temp: 'Cool', humidity: 'Normal', wind: 'Weak', play: 'Yes' },
      { day: 'D10', outlook: 'Rain', temp: 'Mild', humidity: 'Normal', wind: 'Weak', play: 'Yes' },
      { day: 'D11', outlook: 'Sunny', temp: 'Mild', humidity: 'Normal', wind: 'Strong', play: 'Yes' },
      { day: 'D12', outlook: 'Overcast', temp: 'Mild', humidity: 'High', wind: 'Strong', play: 'Yes' },
      { day: 'D13', outlook: 'Overcast', temp: 'Hot', humidity: 'Normal', wind: 'Weak', play: 'Yes' },
      { day: 'D14', outlook: 'Rain', temp: 'Mild', humidity: 'High', wind: 'Strong', play: 'No' }
    ];

    this.renderLayout();
    this.attachEvents();
    this.update();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="lab-grid">
        <div class="lab-canvas-card">
          <div class="canvas-header">
            <h3>Decision Tree Split Visualizer (PlayTennis Dataset)</h3>
            <div class="canvas-actions">
              <div class="segmented-control">
                <button class="seg-btn ${this.metricMode === 'id3' ? 'active' : ''}" id="dt-mode-id3">ID3 (Entropy & Gain)</button>
                <button class="seg-btn ${this.metricMode === 'cart' ? 'active' : ''}" id="dt-mode-cart">CART (Gini Index)</button>
              </div>
            </div>
          </div>

          <div class="attribute-selector-bar">
            <span class="selector-label">Choose Split Attribute:</span>
            <button class="attr-btn ${this.selectedAttribute === 'Humidity' ? 'active' : ''}" data-attr="Humidity">Humidity (PDF Fig 3.3)</button>
            <button class="attr-btn ${this.selectedAttribute === 'Wind' ? 'active' : ''}" data-attr="Wind">Wind (PDF Fig 3.3)</button>
            <button class="attr-btn ${this.selectedAttribute === 'Outlook' ? 'active' : ''}" data-attr="Outlook">Outlook</button>
            <button class="attr-btn ${this.selectedAttribute === 'Temperature' ? 'active' : ''}" data-attr="Temperature">Temperature</button>
          </div>

          <div class="tree-split-diagram" id="dt-split-diagram">
            <!-- Tree node cards rendered here -->
          </div>

          <div class="attribute-comparison-chart-box">
            <h4>Attribute Ranking Comparison for Root Split</h4>
            <div class="gain-bars-container" id="dt-gain-bars">
              <!-- Rendered dynamically -->
            </div>
          </div>
        </div>

        <div class="lab-controls-card">
          <h3>Mathematical Breakdown</h3>

          <div class="formula-banner" id="dt-formula-banner">
            <!-- Formula displayed based on mode -->
          </div>

          <div class="step-calc-box" id="dt-step-calc">
            <!-- Step by step math -->
          </div>

          <div class="dataset-preview-toggle">
            <details>
              <summary>View Complete Mitchell 14-Day Dataset (Slide 156)</summary>
              <div class="table-scroll table-mini">
                <table class="benchmark-table">
                  <thead>
                    <tr><th>Day</th><th>Outlook</th><th>Temp</th><th>Humidity</th><th>Wind</th><th>Play</th></tr>
                  </thead>
                  <tbody>
                    ${this.dataset.map(d => `
                      <tr>
                        <td>${d.day}</td>
                        <td>${d.outlook}</td>
                        <td>${d.temp}</td>
                        <td>${d.humidity}</td>
                        <td>${d.wind}</td>
                        <td><span class="badge ${d.play === 'Yes' ? 'badge-pass' : 'badge-fail'}">${d.play}</span></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    document.getElementById('dt-mode-id3').addEventListener('click', () => {
      this.metricMode = 'id3';
      document.getElementById('dt-mode-id3').classList.add('active');
      document.getElementById('dt-mode-cart').classList.remove('active');
      this.update();
    });

    document.getElementById('dt-mode-cart').addEventListener('click', () => {
      this.metricMode = 'cart';
      document.getElementById('dt-mode-cart').classList.add('active');
      document.getElementById('dt-mode-id3').classList.remove('active');
      this.update();
    });

    this.container.querySelectorAll('.attr-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.container.querySelectorAll('.attr-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedAttribute = btn.getAttribute('data-attr');
        this.update();
      });
    });
  }

  calcEntropy(pos, neg) {
    const total = pos + neg;
    if (total === 0 || pos === 0 || neg === 0) return 0;
    const p1 = pos / total;
    const p2 = neg / total;
    return - (p1 * Math.log2(p1) + p2 * Math.log2(p2));
  }

  calcGini(pos, neg) {
    const total = pos + neg;
    if (total === 0) return 0;
    const p1 = pos / total;
    const p2 = neg / total;
    return 1 - (p1 * p1 + p2 * p2);
  }

  evaluateAttribute(attrName) {
    const attrKey = attrName.toLowerCase();
    const groups = {};

    this.dataset.forEach(d => {
      const val = d[attrKey];
      if (!groups[val]) groups[val] = { yes: 0, no: 0, total: 0 };
      if (d.play === 'Yes') groups[val].yes++;
      else groups[val].no++;
      groups[val].total++;
    });

    const totalSamples = this.dataset.length; // 14
    let weightedEntropy = 0;
    let weightedGini = 0;

    const branches = [];
    for (const [val, counts] of Object.entries(groups)) {
      const entropy = this.calcEntropy(counts.yes, counts.no);
      const gini = this.calcGini(counts.yes, counts.no);
      const weight = counts.total / totalSamples;

      weightedEntropy += weight * entropy;
      weightedGini += weight * gini;

      branches.push({
        value: val,
        yes: counts.yes,
        no: counts.no,
        total: counts.total,
        entropy,
        gini,
        weight
      });
    }

    const basePos = this.dataset.filter(d => d.play === 'Yes').length; // 9
    const baseNeg = this.dataset.filter(d => d.play === 'No').length; // 5
    const baseEntropy = this.calcEntropy(basePos, baseNeg); // ~0.940
    const baseGini = this.calcGini(basePos, baseNeg); // 1 - (9/14)^2 - (5/14)^2 ≈ 0.459

    const infoGain = baseEntropy - weightedEntropy;
    const giniGain = baseGini - weightedGini;

    return {
      attrName,
      branches,
      baseEntropy,
      baseGini,
      weightedEntropy,
      weightedGini,
      infoGain,
      giniGain
    };
  }

  update() {
    const isID3 = this.metricMode === 'id3';
    const evalResult = this.evaluateAttribute(this.selectedAttribute);

    // Update formula banner
    const formulaBanner = document.getElementById('dt-formula-banner');
    if (formulaBanner) {
      if (isID3) {
        formulaBanner.innerHTML = `
          <strong>ID3 Metric: Information Gain (Entropy Reduction)</strong>
          <code>H(S) = - Σ p_i log₂(p_i)</code>
          <code>Gain(S, A) = H(S) - Σ (|S_v|/|S|) * H(S_v)</code>
        `;
      } else {
        formulaBanner.innerHTML = `
          <strong>CART Metric: Gini Impurity Index</strong>
          <code>Gini = 1 - Σ (p_i)²</code>
          <code>Gini_split = Σ (|S_v|/|S|) * Gini(S_v)</code>
        `;
      }
    }

    // Render tree split diagram
    const treeDiagram = document.getElementById('dt-split-diagram');
    if (treeDiagram) {
      treeDiagram.innerHTML = `
        <div class="tree-root-card">
          <div class="node-title">Root Node (Entire Dataset S)</div>
          <div class="node-counts">14 Days: [9+, 5-]</div>
          <div class="node-metric">
            ${isID3
              ? `Entropy <strong>H(S) = ${evalResult.baseEntropy.toFixed(3)}</strong>`
              : `Gini <strong>G(S) = ${evalResult.baseGini.toFixed(3)}</strong>`}
          </div>
        </div>

        <div class="tree-connector">
          <div class="connector-line"></div>
          <div class="split-badge">Split on <strong>${this.selectedAttribute}</strong></div>
        </div>

        <div class="tree-branches-row">
          ${evalResult.branches.map(b => `
            <div class="tree-branch-card">
              <div class="branch-label">${this.selectedAttribute} = <strong>${b.value}</strong></div>
              <div class="branch-counts">${b.total} days: [${b.yes}+, ${b.no}-]</div>
              <div class="branch-metric">
                ${isID3
                  ? `Entropy = <strong>${b.entropy.toFixed(3)}</strong>`
                  : `Gini = <strong>${b.gini.toFixed(3)}</strong>`}
              </div>
              <div class="branch-weight">Weight: ${b.total}/14 (${(b.weight * 100).toFixed(1)}%)</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Step by step math panel
    const stepCalc = document.getElementById('dt-step-calc');
    if (stepCalc) {
      if (isID3) {
        stepCalc.innerHTML = `
          <h4>Step-by-Step ID3 Information Gain Calculation:</h4>
          <div class="calc-step">
            <strong>1. Base Entropy of Parent Node S:</strong>
            <p>H(S) = -(9/14)log₂(9/14) - (5/14)log₂(5/14) = <strong>0.940</strong> (Slide 180)</p>
          </div>
          <div class="calc-step">
            <strong>2. Subsets Entropies for ${this.selectedAttribute}:</strong>
            ${evalResult.branches.map(b => `
              <p>• H(S_${b.value}) = -(${b.yes}/${b.total})log₂(${b.yes}/${b.total}) - (${b.no}/${b.total})log₂(${b.no}/${b.total}) = <strong>${b.entropy.toFixed(3)}</strong></p>
            `).join('')}
          </div>
          <div class="calc-step">
            <strong>3. Weighted Average Subset Entropy:</strong>
            <p>Σ (|S_v|/|S|) * H(S_v) = ${evalResult.branches.map(b => `(${b.total}/14)*${b.entropy.toFixed(3)}`).join(' + ')} = <strong>${evalResult.weightedEntropy.toFixed(3)}</strong></p>
          </div>
          <div class="calc-step highlight">
            <strong>4. Information Gain Gain(S, ${this.selectedAttribute}):</strong>
            <p>Gain = H(S) - Weighted Entropy = ${evalResult.baseEntropy.toFixed(3)} - ${evalResult.weightedEntropy.toFixed(3)} = <strong class="badge badge-pass" style="font-size: 1.1rem;">${evalResult.infoGain.toFixed(3)}</strong></p>
          </div>
        `;
      } else {
        stepCalc.innerHTML = `
          <h4>Step-by-Step CART Gini Impurity Calculation:</h4>
          <div class="calc-step">
            <strong>1. Base Gini of Parent Node S:</strong>
            <p>Gini(S) = 1 - [(9/14)² + (5/14)²] = 1 - [0.413 + 0.128] = <strong>${evalResult.baseGini.toFixed(3)}</strong></p>
          </div>
          <div class="calc-step">
            <strong>2. Subsets Gini for ${this.selectedAttribute}:</strong>
            ${evalResult.branches.map(b => `
              <p>• Gini(S_${b.value}) = 1 - [(${b.yes}/${b.total})² + (${b.no}/${b.total})²] = <strong>${b.gini.toFixed(3)}</strong></p>
            `).join('')}
          </div>
          <div class="calc-step">
            <strong>3. Weighted Gini of the Split:</strong>
            <p>Gini_split = ${evalResult.branches.map(b => `(${b.total}/14)*${b.gini.toFixed(3)}`).join(' + ')} = <strong>${evalResult.weightedGini.toFixed(3)}</strong></p>
          </div>
          <div class="calc-step highlight">
            <strong>4. Gini Reduction (Impurity Drop):</strong>
            <p>ΔGini = ${evalResult.baseGini.toFixed(3)} - ${evalResult.weightedGini.toFixed(3)} = <strong class="badge badge-pass" style="font-size: 1.1rem;">${evalResult.giniGain.toFixed(3)}</strong></p>
          </div>
        `;
      }
    }

    // Comparison bars across all attributes
    const allAttributes = ['Outlook', 'Humidity', 'Wind', 'Temperature'];
    const comparisons = allAttributes.map(attr => this.evaluateAttribute(attr));

    const gainBars = document.getElementById('dt-gain-bars');
    if (gainBars) {
      const maxScore = isID3
        ? Math.max(...comparisons.map(c => c.infoGain))
        : Math.max(...comparisons.map(c => c.giniGain));

      gainBars.innerHTML = comparisons.map(c => {
        const score = isID3 ? c.infoGain : c.giniGain;
        const pct = (score / (maxScore || 1)) * 100;
        const isBest = score === maxScore;
        const isSelected = c.attrName === this.selectedAttribute;

        return `
          <div class="gain-bar-row ${isSelected ? 'selected-attr' : ''}">
            <div class="gain-attr-name">
              ${c.attrName} ${isBest ? '👑 <span class="badge badge-accent">Best</span>' : ''}
            </div>
            <div class="gain-bar-track">
              <div class="gain-bar-fill ${isBest ? 'fill-best' : ''}" style="width: ${Math.max(8, pct)}%;">
                <span class="gain-score-val">${score.toFixed(3)}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

window.DecisionTreeLab = DecisionTreeLab;
