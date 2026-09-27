// ML Module 2 Exam Command Center - Main Application Controller

class MLModule2App {
  constructor() {
    this.currentTab = 'dashboard';
    this.currentTopicId = 'intro_supervised';
    this.currentLabId = 'linear_reg';
    this.currentNumericalId = 'linear_regression';
    this.currentCompId = 'linear_vs_logistic';
    this.currentQuizLevel = 'level1';
    this.scenarioIndex = 0;

    // Numerical Lab Progress State: { [problemId]: currentStepIndex }
    this.numericalProgress = {};

    // Exam Mode State
    this.examTimer = null;
    this.examSecondsRemaining = 25 * 60; // 25 minutes
    this.examCurrentIndex = 0;
    this.examUserAnswers = {}; // { [questionId]: selectedIndex }
    this.examFlagged = new Set();
    this.isExamActive = false;

    // Quiz Level State
    this.quizCurrentIndex = 0;
    this.quizScore = 0;
    this.quizAnswers = {};

    this.init();
  }

  init() {
    // Set theme
    document.documentElement.setAttribute('data-theme', window.appState.state.theme);

    this.bindGlobalEvents();
    this.renderMasterMap();
    this.renderDashboard();
    this.renderLearnMode();
    this.initVisualLabs();
    this.renderNumericalLab();
    this.renderAlgorithmCards();
    this.renderComparisons();
    this.renderScenarioGame();
    this.renderQuizMode();
    this.renderFinalRevision();

    // Check if URL has tab hash
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`view-${hash}`)) {
      this.switchTab(hash);
    } else {
      this.switchTab('dashboard');
    }
  }

  bindGlobalEvents() {
    // Tab buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const newTheme = window.appState.toggleTheme();
        themeBtn.innerHTML = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
      });
    }

    // Reset Progress Button in Dashboard
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your learning and quiz progress?')) {
          window.appState.resetAllProgress();
          this.renderDashboard();
          this.renderLearnMode();
          alert('Progress has been reset.');
        }
      });
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    window.location.hash = tabId;

    // Update active nav button
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    // Update active view section
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === `view-${tabId}`);
    });

    // Tab specific activations
    if (tabId === 'dashboard') {
      this.renderDashboard();
    } else if (tabId === 'visual-lab') {
      this.switchVisualLab(this.currentLabId);
    }
  }

  // =================== 1. DASHBOARD & MASTER MAP ===================
  renderDashboard() {
    const stats = window.appState.calculateStats();

    // Update progress stats
    const pctElem = document.getElementById('dash-progress-pct');
    if (pctElem) pctElem.textContent = `${stats.completionRate}%`;

    const barFill = document.getElementById('dash-progress-bar-fill');
    if (barFill) barFill.style.width = `${stats.completionRate}%`;

    const statSummary = document.getElementById('dash-stat-summary');
    if (statSummary) {
      statSummary.innerHTML = `
        <span>Mastered: <strong>${stats.mastered} / ${stats.totalTopics}</strong></span>
        <span>Practiced: <strong>${stats.practiced}</strong></span>
        <span>Learning: <strong>${stats.learning}</strong></span>
        <span>Quiz Avg: <strong>${stats.avgQuizScore}%</strong></span>
      `;
    }

    // Weak topics list
    const weakList = document.getElementById('dash-weak-topics-list');
    if (weakList) {
      const weakTopics = window.appState.state.weakTopics;
      if (weakTopics.length === 0) {
        weakList.innerHTML = `<div class="text-muted" style="font-size: 0.85rem;">No weak topics detected yet! Take a quiz or the mock exam to identify focus areas.</div>`;
      } else {
        weakList.innerHTML = weakTopics.map(tId => {
          const t = TOPICS_DATA.find(x => x.id === tId);
          const name = t ? t.title : tId;
          return `
            <div class="weak-topic-item">
              <span>⚠️ ${name}</span>
              <a href="javascript:void(0)" onclick="window.mlApp.jumpToTopic('${tId}')">Revise Now ➔</a>
            </div>
          `;
        }).join('');
      }
    }
  }

  renderMasterMap() {
    const mapContainer = document.getElementById('master-map-tree');
    if (!mapContainer) return;

    mapContainer.innerHTML = `
      <div class="map-node-tree">
        <!-- Root -->
        <div class="map-level">
          <div class="map-node root-node" onclick="window.mlApp.jumpToTopic('intro_supervised')">
            <div class="map-node-title">SUPERVISED LEARNING</div>
            <div class="map-node-desc">Labeled Data (x, y) • Variable Types • Bias-Variance</div>
          </div>
        </div>

        <!-- Level 1: Regression vs Classification -->
        <div class="map-level" style="gap: 60px;">
          <div class="map-node branch-node" onclick="window.mlApp.jumpToTopic('linear_regression')">
            <div class="map-node-title">📈 REGRESSION</div>
            <div class="map-node-desc">Predict Continuous Quantities (Y ∈ ℝ)</div>
          </div>
          <div class="map-node branch-node" onclick="window.mlApp.jumpToTopic('classification_types')">
            <div class="map-node-title">🏷️ CLASSIFICATION</div>
            <div class="map-node-desc">Predict Discrete Labels & Categories</div>
          </div>
        </div>

        <!-- Level 2: Sub-categories -->
        <div class="map-level">
          <!-- Regression Sub-nodes -->
          <div class="map-node" onclick="window.mlApp.jumpToTopic('linear_regression')">
            <div class="map-node-title">Linear Regression</div>
            <div class="map-node-desc">OLS • Slope a • Intercept b • RSS</div>
          </div>
          <div class="map-node" onclick="window.mlApp.jumpToTopic('nonlinear_regression')">
            <div class="map-node-title">Nonlinear Regression</div>
            <div class="map-node-desc">Polynomial • Exponential • Logarithmic</div>
          </div>

          <!-- Classification Sub-nodes -->
          <div class="map-node" onclick="window.mlApp.jumpToTopic('logistic_regression')">
            <div class="map-node-title">Logistic Regression</div>
            <div class="map-node-desc">Sigmoid Function • Threshold 0.5</div>
          </div>
          <div class="map-node" onclick="window.mlApp.jumpToTopic('naive_bayes')">
            <div class="map-node-title">Naïve Bayes</div>
            <div class="map-node-desc">Bayes' Rule • Feature Independence</div>
          </div>
          <div class="map-node" onclick="window.mlApp.jumpToTopic('knn')">
            <div class="map-node-title">KNN</div>
            <div class="map-node-desc">Lazy Learner • Euclidean Distance • K=5</div>
          </div>
          <div class="map-node" onclick="window.mlApp.jumpToTopic('svm')">
            <div class="map-node-title">SVM & Kernels</div>
            <div class="map-node-desc">Maximal Margin • 2/||w|| • Lili Jiang 1444</div>
          </div>
          <div class="map-node" onclick="window.mlApp.jumpToTopic('decision_trees')">
            <div class="map-node-title">Decision Trees</div>
            <div class="map-node-desc">ID3 (Entropy/Gain) • CART (Gini) • Pruning</div>
          </div>
          <div class="map-node" onclick="window.mlApp.jumpToTopic('random_forest_apps')">
            <div class="map-node-title">Random Forest</div>
            <div class="map-node-desc">Ensemble • Cures DT Overfitting (Slide 182)</div>
          </div>
        </div>
      </div>
    `;
  }

  jumpToTopic(topicId) {
    this.currentTopicId = topicId;
    this.switchTab('learn');
    this.renderLearnMode();
  }

  jumpToLab(labId) {
    this.currentLabId = labId;
    this.switchTab('visual-lab');
    this.switchVisualLab(labId);
  }

  // =================== 2. LEARN MODE ===================
  renderLearnMode() {
    const sidebar = document.getElementById('learn-topics-sidebar');
    const viewer = document.getElementById('learn-topic-viewer');
    if (!sidebar || !viewer) return;

    // Render sidebar
    sidebar.innerHTML = TOPICS_DATA.map(t => {
      const status = window.appState.state.topicProgress[t.id] || 'not-started';
      const isActive = t.id === this.currentTopicId;
      return `
        <div class="topic-nav-item ${isActive ? 'active' : ''}" onclick="window.mlApp.selectTopic('${t.id}')">
          <span>${t.title}</span>
          <span class="topic-status-dot status-${status}" title="Status: ${status}"></span>
        </div>
      `;
    }).join('');

    // Render active topic A-K
    const topic = TOPICS_DATA.find(t => t.id === this.currentTopicId) || TOPICS_DATA[0];
    const currentStatus = window.appState.state.topicProgress[topic.id] || 'not-started';

    viewer.innerHTML = `
      <div class="topic-header-bar">
        <div>
          <h2>${topic.title}</h2>
          <div class="topic-meta">
            <span class="badge badge-accent">${topic.category}</span>
            <span class="badge">${topic.pdfPages}</span>
          </div>
        </div>
        <div class="status-dropdown">
          <label style="font-size: 0.8rem; color: var(--text-muted); margin-right: 6px;">Mastery:</label>
          <select id="topic-status-select" onchange="window.mlApp.updateTopicStatus('${topic.id}', this.value)">
            <option value="not-started" ${currentStatus === 'not-started' ? 'selected' : ''}>⚪ Not Started</option>
            <option value="learning" ${currentStatus === 'learning' ? 'selected' : ''}>🟡 Learning</option>
            <option value="practiced" ${currentStatus === 'practiced' ? 'selected' : ''}>🔵 Practiced</option>
            <option value="mastered" ${currentStatus === 'mastered' ? 'selected' : ''}>🟢 Mastered</option>
          </select>
        </div>
      </div>

      <div class="ak-sections-container">
        <!-- A. What is it? -->
        <div class="ak-card">
          <div class="ak-card-title"><span>A. What is it?</span></div>
          <div class="ak-card-body">${topic.sections.A_what}</div>
        </div>

        <!-- B. Why do we need it? -->
        <div class="ak-card">
          <div class="ak-card-title"><span>B. Why do we need it?</span></div>
          <div class="ak-card-body">${topic.sections.B_why}</div>
        </div>

        <!-- C. Intuition -->
        <div class="ak-card">
          <div class="ak-card-title"><span>C. Intuition</span></div>
          <div class="ak-card-body">${topic.sections.C_intuition}</div>
        </div>

        <!-- D. How it works -->
        <div class="ak-card">
          <div class="ak-card-title"><span>D. How it works</span></div>
          <div class="ak-card-body">${topic.sections.D_how.replace(/\\n/g, '<br>')}</div>
        </div>

        <!-- E. Algorithm / Steps -->
        <div class="ak-card">
          <div class="ak-card-title"><span>E. Algorithm / Steps</span></div>
          <div class="ak-card-body">
            <ol>
              ${topic.sections.E_algorithm.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>

        <!-- F. Formula -->
        <div class="ak-card">
          <div class="ak-card-title"><span>F. Formula</span></div>
          <div class="ak-card-body">
            <div class="formula-block">${topic.sections.F_formula}</div>
          </div>
        </div>

        <!-- G. Example from the PDF -->
        <div class="ak-card">
          <div class="ak-card-title"><span>G. Example from the PDF</span></div>
          <div class="ak-card-body">
            <div class="example-box">${topic.sections.G_example.replace(/\\n/g, '<br>')}</div>
          </div>
        </div>

        <!-- H. Visual Explanation -->
        <div class="ak-card">
          <div class="ak-card-title"><span>H. Visual Explanation</span></div>
          <div class="ak-card-body">
            <p>${topic.sections.H_visual}</p>
            <div style="margin-top: 10px;">
              <button class="btn btn-sm btn-primary" onclick="window.mlApp.jumpToRelatedLab('${topic.id}')">
                Open in Interactive Visual Lab ➔
              </button>
            </div>
          </div>
        </div>

        <!-- I. Exam-Important Points -->
        <div class="ak-card">
          <div class="ak-card-title"><span>I. Exam-Important Points</span></div>
          <div class="ak-card-body">
            <div class="exam-points-box">
              <ul>
                ${topic.sections.I_examPoints.map(pt => `<li>${pt}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- J. Common Confusion / Comparison -->
        <div class="ak-card">
          <div class="ak-card-title"><span>J. Common Confusion / Comparison</span></div>
          <div class="ak-card-body">${topic.sections.J_confusion}</div>
        </div>

        <!-- K. Quick Recall Question -->
        <div class="ak-card">
          <div class="ak-card-title"><span>K. Quick Recall Question</span></div>
          <div class="ak-card-body">
            <div class="quick-recall-box">
              <p><strong>Question:</strong> ${topic.sections.K_recall.question}</p>
              <button class="btn btn-sm btn-secondary" style="margin-top: 8px;" onclick="document.getElementById('recall-ans-${topic.id}').classList.toggle('visible')">
                Show / Hide Answer
              </button>
              <div class="quick-recall-answer" id="recall-ans-${topic.id}">
                ${topic.sections.K_recall.answer}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  selectTopic(topicId) {
    this.currentTopicId = topicId;
    this.renderLearnMode();
  }

  updateTopicStatus(topicId, status) {
    window.appState.setTopicStatus(topicId, status);
    this.renderDashboard();
    this.renderLearnMode();
  }

  jumpToRelatedLab(topicId) {
    if (topicId.includes('linear_regression')) this.jumpToLab('linear_reg');
    else if (topicId.includes('logistic_regression')) this.jumpToLab('logistic_reg');
    else if (topicId.includes('knn')) this.jumpToLab('knn_lab');
    else if (topicId.includes('decision_trees')) this.jumpToLab('dt_lab');
    else if (topicId.includes('svm')) this.jumpToLab('svm_lab');
    else this.jumpToLab('linear_reg');
  }

  // =================== 3. INTERACTIVE VISUAL LAB ===================
  initVisualLabs() {
    // Tab switching for visual labs
    document.querySelectorAll('.lab-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const labId = btn.getAttribute('data-lab');
        this.switchVisualLab(labId);
      });
    });
  }

  switchVisualLab(labId) {
    this.currentLabId = labId;
    document.querySelectorAll('.lab-nav-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lab') === labId);
    });

    const mount = document.getElementById('visual-lab-mount');
    if (!mount) return;

    if (labId === 'linear_reg') {
      window.activeLab = new LinearRegressionLab('visual-lab-mount');
    } else if (labId === 'logistic_reg') {
      window.activeLab = new LogisticRegressionLab('visual-lab-mount');
    } else if (labId === 'knn_lab') {
      window.activeLab = new KNNLab('visual-lab-mount');
    } else if (labId === 'dt_lab') {
      window.activeLab = new DecisionTreeLab('visual-lab-mount');
    } else if (labId === 'svm_lab') {
      window.activeLab = new SVMLab('visual-lab-mount');
    }
  }

  // =================== 4. NUMERICAL LAB ===================
  renderNumericalLab() {
    const sidebar = document.getElementById('numerical-sidebar');
    const content = document.getElementById('numerical-content');
    if (!sidebar || !content) return;

    sidebar.innerHTML = NUMERICAL_PROBLEMS.map(p => {
      const isActive = p.id === this.currentNumericalId;
      return `
        <div class="topic-nav-item ${isActive ? 'active' : ''}" onclick="window.mlApp.selectNumericalTrack('${p.id}')">
          <span>${p.title.split(':')[0]}</span>
          <span class="badge badge-accent">${p.pdfRef}</span>
        </div>
      `;
    }).join('');

    const problem = NUMERICAL_PROBLEMS.find(p => p.id === this.currentNumericalId) || NUMERICAL_PROBLEMS[0];
    const currentStep = this.numericalProgress[problem.id] || 1;

    content.innerHTML = `
      <div class="numerical-header" style="margin-bottom: 20px;">
        <h2>${problem.title}</h2>
        <span class="badge badge-accent">${problem.pdfRef}</span>
        <p style="margin-top: 8px; color: var(--text-secondary);">${problem.scenario}</p>
      </div>

      <div class="steps-flow">
        ${problem.steps.map(step => {
          const isUnlocked = step.stepNum <= currentStep;
          const isCompleted = step.stepNum < currentStep;
          return `
            <div class="step-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}" id="step-card-${step.stepNum}">
              <div class="step-header">
                <h4>${step.title}</h4>
                ${isCompleted ? '<span class="badge badge-pass">✔ Completed</span>' : `<span class="badge">Step ${step.stepNum} of ${problem.steps.length}</span>`}
              </div>

              <p style="font-size: 0.92rem; margin-bottom: 12px;">${step.instruction}</p>

              <div class="step-input-group">
                ${step.fields.map(field => `
                  <div class="step-input-row">
                    <label for="field-${field.id}">${field.label}:</label>
                    <input type="${field.isString ? 'text' : 'number'}" step="any" id="field-${field.id}" placeholder="Enter answer">
                  </div>
                `).join('')}
              </div>

              <div class="step-actions">
                <button class="btn btn-sm btn-primary" onclick="window.mlApp.checkNumericalStep('${problem.id}', ${step.stepNum})">
                  Check Answer
                </button>
                <button class="btn btn-sm btn-secondary" onclick="document.getElementById('hint-${step.stepNum}').classList.toggle('visible')">
                  Show Hint
                </button>
              </div>

              <div class="quick-recall-answer" id="hint-${step.stepNum}">
                💡 <strong>Hint:</strong> ${step.hint}
              </div>

              <div class="step-feedback" id="feedback-${step.stepNum}"></div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  selectNumericalTrack(probId) {
    this.currentNumericalId = probId;
    this.renderNumericalLab();
  }

  checkNumericalStep(probId, stepNum) {
    const problem = NUMERICAL_PROBLEMS.find(p => p.id === probId);
    if (!problem) return;
    const step = problem.steps.find(s => s.stepNum === stepNum);
    if (!step) return;

    let allCorrect = true;
    step.fields.forEach(field => {
      const input = document.getElementById(`field-${field.id}`);
      if (!input) return;
      const userVal = input.value.trim();

      if (field.isString) {
        if (userVal.toLowerCase() !== field.expected.toLowerCase()) {
          allCorrect = false;
        }
      } else {
        const numVal = parseFloat(userVal);
        if (isNaN(numVal) || Math.abs(numVal - field.expected) > (field.tolerance || 0.05)) {
          allCorrect = false;
        }
      }
    });

    const feedbackElem = document.getElementById(`feedback-${stepNum}`);
    if (!feedbackElem) return;

    if (allCorrect) {
      feedbackElem.className = 'step-feedback show success';
      feedbackElem.innerHTML = `
        <strong>🎉 Correct!</strong> ${step.solutionExplanation}
      `;

      // Advance step if this was the current step
      const current = this.numericalProgress[probId] || 1;
      if (stepNum === current && current < problem.steps.length) {
        this.numericalProgress[probId] = current + 1;
        setTimeout(() => {
          this.renderNumericalLab();
          const nextCard = document.getElementById(`step-card-${current + 1}`);
          if (nextCard) nextCard.scrollIntoView({ behavior: 'smooth' });
        }, 1200);
      }
    } else {
      feedbackElem.className = 'step-feedback show error';
      feedbackElem.innerHTML = `
        <strong>❌ Not quite.</strong> Double-check your values. Look at the hint or verify the formula from the PDF!
      `;
    }
  }

  // =================== 5. ALGORITHM CARDS ===================
  renderAlgorithmCards() {
    const grid = document.getElementById('algo-cards-container');
    if (!grid) return;

    grid.innerHTML = ALGORITHM_CARDS.map(card => `
      <div class="algo-card" data-type="${card.type.toLowerCase()}">
        <div class="algo-card-header">
          <div>
            <div class="algo-card-title">${card.name}</div>
            <div class="text-muted" style="font-size: 0.75rem;">${card.pdfRef}</div>
          </div>
          <span class="badge badge-accent">${card.type}</span>
        </div>

        <div class="algo-section-block">
          <strong>WHAT?</strong> ${card.what}
        </div>

        <div class="algo-section-block">
          <strong>HOW?</strong> ${card.how}
        </div>

        <div class="algo-section-block">
          <strong>KEY FORMULA:</strong>
          <div class="formula-block" style="font-size: 0.78rem; padding: 8px;">${card.keyFormula}</div>
        </div>

        <div class="algo-section-block">
          <strong>EXAM TRAPS:</strong>
          <ul style="padding-left: 18px; margin-top: 4px; color: #f87171;">
            ${card.examTraps.map(trap => `<li>${trap}</li>`).join('')}
          </ul>
        </div>

        <div class="algo-section-block">
          <strong>WHEN TO USE:</strong> ${card.whenToUse}
        </div>
      </div>
    `).join('');

    // Filtering events
    document.querySelectorAll('.card-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.card-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        document.querySelectorAll('.algo-card').forEach(card => {
          if (filter === 'all') card.style.display = 'flex';
          else card.style.display = card.getAttribute('data-type').includes(filter) ? 'flex' : 'none';
        });
      });
    });
  }

  // =================== 6. COMPARISONS ===================
  renderComparisons() {
    const nav = document.getElementById('comp-tabs-nav');
    const tableContainer = document.getElementById('comp-table-container');
    if (!nav || !tableContainer) return;

    nav.innerHTML = COMPARISONS_DATA.map(comp => `
      <button class="tab-btn ${comp.id === this.currentCompId ? 'active' : ''}" onclick="window.mlApp.selectComparison('${comp.id}')">
        ${comp.title}
      </button>
    `).join('');

    const comp = COMPARISONS_DATA.find(c => c.id === this.currentCompId) || COMPARISONS_DATA[0];

    tableContainer.innerHTML = `
      <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <h3>${comp.title}</h3>
        <span class="badge badge-accent">${comp.pdfRef}</span>
      </div>
      <div class="comparison-table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              ${comp.headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${comp.rows.map(r => `
              <tr>
                <td><strong>${r.attribute}</strong></td>
                <td>${r.col1}</td>
                <td>${r.col2}</td>
                ${r.col3 ? `<td>${r.col3}</td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  selectComparison(compId) {
    this.currentCompId = compId;
    this.renderComparisons();
  }

  // =================== 7. "WHICH ALGORITHM?" GAME ===================
  renderScenarioGame() {
    const card = document.getElementById('scenario-game-card');
    if (!card) return;

    const scenario = SCENARIOS_DATA[this.scenarioIndex];
    const scoreState = window.appState.state.gameScore;

    card.innerHTML = `
      <div class="scenario-header">
        <span class="badge">Scenario ${this.scenarioIndex + 1} of ${SCENARIOS_DATA.length}</span>
        <div class="streak-pill">🔥 Streak: ${scoreState.streak} (Best: ${scoreState.bestStreak})</div>
      </div>

      <div class="scenario-prompt">"${scenario.scenario}"</div>

      <div class="scenario-options-grid">
        ${scenario.options.map((opt, idx) => `
          <button class="scenario-opt-btn" id="scenario-opt-${idx}" onclick="window.mlApp.chooseScenarioAnswer(${idx})">
            ${opt}
          </button>
        `).join('')}
      </div>

      <div class="scenario-feedback-card" id="scenario-feedback"></div>
    `;
  }

  chooseScenarioAnswer(chosenIdx) {
    const scenario = SCENARIOS_DATA[this.scenarioIndex];
    const feedback = document.getElementById('scenario-feedback');
    const isCorrect = chosenIdx === scenario.correctIndex;

    // Disable all options and show colors
    scenario.options.forEach((_, idx) => {
      const btn = document.getElementById(`scenario-opt-${idx}`);
      if (!btn) return;
      btn.disabled = true;
      if (idx === scenario.correctIndex) btn.classList.add('correct');
      else if (idx === chosenIdx) btn.classList.add('wrong');
    });

    window.appState.recordGameAnswer(isCorrect);

    feedback.className = 'scenario-feedback-card show';
    feedback.innerHTML = `
      <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 6px; color: ${isCorrect ? '#4ade80' : '#f87171'};">
        ${isCorrect ? '✔ Correct Choice!' : '❌ Incorrect Selection'}
      </div>
      <p style="font-size: 0.9rem; line-height: 1.5;">${scenario.explanation}</p>
      <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
        <button class="btn btn-primary" onclick="window.mlApp.nextScenario()">Next Scenario ➔</button>
      </div>
    `;
  }

  nextScenario() {
    this.scenarioIndex = (this.scenarioIndex + 1) % SCENARIOS_DATA.length;
    this.renderScenarioGame();
  }

  // =================== 8. QUIZ MODE ===================
  renderQuizMode() {
    const levelNav = document.getElementById('quiz-level-nav');
    const container = document.getElementById('quiz-content-container');
    if (!levelNav || !container) return;

    levelNav.innerHTML = Object.entries(QUIZ_LEVELS).map(([key, lvl]) => `
      <button class="tab-btn ${key === this.currentQuizLevel ? 'active' : ''}" onclick="window.mlApp.selectQuizLevel('${key}')">
        ${lvl.name}
      </button>
    `).join('');

    const level = QUIZ_LEVELS[this.currentQuizLevel];
    const q = level.questions[this.quizCurrentIndex];

    container.innerHTML = `
      <div class="exam-main-panel">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3>${level.name}</h3>
            <span class="text-muted" style="font-size: 0.82rem;">${level.description}</span>
          </div>
          <span class="badge">Question ${this.quizCurrentIndex + 1} of ${level.questions.length}</span>
        </div>

        <div class="scenario-prompt" style="margin-bottom: 20px;">
          ${q.question}
        </div>

        ${q.options ? `
          <div class="scenario-options-grid" style="grid-template-columns: 1fr;">
            ${q.options.map((opt, idx) => `
              <button class="scenario-opt-btn" id="quiz-opt-${idx}" onclick="window.mlApp.submitQuizAnswer(${idx})">
                ${opt}
              </button>
            `).join('')}
          </div>
        ` : q.type === 'num' ? `
          <div style="display: flex; gap: 10px; align-items: center;">
            <input type="number" step="any" id="quiz-num-input" placeholder="Enter numerical value" style="padding: 10px; background: var(--bg-secondary); color: #fff; border: 1px solid var(--border-medium); border-radius: var(--radius-sm); font-size: 1rem;">
            <button class="btn btn-primary" onclick="window.mlApp.submitQuizNumAnswer()">Submit Value</button>
          </div>
        ` : `
          <div>
            <textarea id="quiz-short-input" rows="4" placeholder="Write your explanation using PDF keywords..." style="width: 100%; padding: 12px; background: var(--bg-secondary); color: #fff; border: 1px solid var(--border-medium); border-radius: var(--radius-md); font-family: var(--font-sans);"></textarea>
            <button class="btn btn-primary" style="margin-top: 10px;" onclick="window.mlApp.submitQuizShortAnswer()">Submit Explanation</button>
          </div>
        `}

        <div class="scenario-feedback-card" id="quiz-feedback"></div>
      </div>
    `;
  }

  selectQuizLevel(lvlKey) {
    this.currentQuizLevel = lvlKey;
    this.quizCurrentIndex = 0;
    this.quizScore = 0;
    this.renderQuizMode();
  }

  submitQuizAnswer(chosenIdx) {
    const q = QUIZ_LEVELS[this.currentQuizLevel].questions[this.quizCurrentIndex];
    const isCorrect = chosenIdx === q.correct;
    if (isCorrect) this.quizScore++;

    q.options.forEach((_, idx) => {
      const btn = document.getElementById(`quiz-opt-${idx}`);
      if (!btn) return;
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add('correct');
      else if (idx === chosenIdx) btn.classList.add('wrong');
    });

    this.showQuizFeedback(isCorrect, q.explanation);
  }

  submitQuizNumAnswer() {
    const q = QUIZ_LEVELS[this.currentQuizLevel].questions[this.quizCurrentIndex];
    const input = document.getElementById('quiz-num-input');
    const val = parseFloat(input.value);
    const isCorrect = !isNaN(val) && Math.abs(val - q.correct) <= (q.tolerance || 0.05);
    if (isCorrect) this.quizScore++;

    this.showQuizFeedback(isCorrect, q.explanation);
  }

  submitQuizShortAnswer() {
    const q = QUIZ_LEVELS[this.currentQuizLevel].questions[this.quizCurrentIndex];
    const input = document.getElementById('quiz-short-input');
    const text = (input.value || '').toLowerCase();

    let matchCount = 0;
    q.expectedKeywords.forEach(kw => {
      if (text.includes(kw.toLowerCase())) matchCount++;
    });

    const isCorrect = matchCount >= q.minKeywordsMatch;
    if (isCorrect) this.quizScore++;

    const feedback = `
      Matched <strong>${matchCount} / ${q.expectedKeywords.length}</strong> required keywords (${q.expectedKeywords.join(', ')}).<br>
      <div style="margin-top: 8px;"><strong>Expected Model Answer:</strong><br>${q.modelAnswer}</div>
    `;
    this.showQuizFeedback(isCorrect, feedback);
  }

  showQuizFeedback(isCorrect, text) {
    const feedback = document.getElementById('quiz-feedback');
    const totalQ = QUIZ_LEVELS[this.currentQuizLevel].questions.length;

    feedback.className = 'scenario-feedback-card show';
    feedback.innerHTML = `
      <div style="font-weight: 700; color: ${isCorrect ? '#4ade80' : '#f87171'}; margin-bottom: 6px;">
        ${isCorrect ? '✔ Correct!' : '❌ Incorrect'}
      </div>
      <p style="font-size: 0.9rem;">${text}</p>
      <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
        <button class="btn btn-primary" onclick="window.mlApp.nextQuizQuestion()">
          ${this.quizCurrentIndex + 1 < totalQ ? 'Next Question ➔' : 'Complete Quiz'}
        </button>
      </div>
    `;
  }

  nextQuizQuestion() {
    const totalQ = QUIZ_LEVELS[this.currentQuizLevel].questions.length;
    if (this.quizCurrentIndex + 1 < totalQ) {
      this.quizCurrentIndex++;
      this.renderQuizMode();
    } else {
      // Quiz completed
      window.appState.recordQuizScore(this.currentQuizLevel, this.quizScore, totalQ);
      this.renderQuizSummary();
    }
  }

  renderQuizSummary() {
    const container = document.getElementById('quiz-content-container');
    const totalQ = QUIZ_LEVELS[this.currentQuizLevel].questions.length;
    const pct = Math.round((this.quizScore / totalQ) * 100);

    container.innerHTML = `
      <div class="scorecard-hero">
        <h2>${QUIZ_LEVELS[this.currentQuizLevel].name} Completed!</h2>
        <div class="scorecard-score" style="margin: 16px 0;">${this.quizScore} / ${totalQ}</div>
        <p style="font-size: 1.1rem; color: #38bdf8;">Accuracy: <strong>${pct}%</strong></p>
        <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-secondary" onclick="window.mlApp.selectQuizLevel('${this.currentQuizLevel}')">Retry Quiz</button>
          <button class="btn btn-primary" onclick="window.mlApp.switchTab('exam')">Take Mock Exam ➔</button>
        </div>
      </div>
    `;
  }

  // =================== 9. EXAM SIMULATOR ===================
  startExam() {
    this.isExamActive = true;
    this.examSecondsRemaining = 25 * 60;
    this.examCurrentIndex = 0;
    this.examUserAnswers = {};
    this.examFlagged.clear();

    if (this.examTimer) clearInterval(this.examTimer);
    this.examTimer = setInterval(() => {
      this.examSecondsRemaining--;
      this.updateExamTimerDisplay();
      if (this.examSecondsRemaining <= 0) {
        clearInterval(this.examTimer);
        this.submitExam();
      }
    }, 1000);

    this.renderExamQuestion();
  }

  updateExamTimerDisplay() {
    const mins = Math.floor(this.examSecondsRemaining / 60);
    const secs = this.examSecondsRemaining % 60;
    const timerElem = document.getElementById('exam-timer-val');
    if (timerElem) {
      timerElem.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }

  renderExamQuestion() {
    const container = document.getElementById('exam-mount');
    if (!container) return;

    const q = EXAM_QUESTIONS[this.examCurrentIndex];
    const totalQ = EXAM_QUESTIONS.length;
    const isAnswered = this.examUserAnswers[q.id] !== undefined;
    const isFlagged = this.examFlagged.has(q.id);

    container.innerHTML = `
      <div class="exam-layout">
        <div class="exam-main-panel">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <span class="badge badge-accent">Question ${this.examCurrentIndex + 1} of ${totalQ}</span>
            <span class="badge">${q.topicName}</span>
          </div>

          <div class="scenario-prompt" style="font-size: 1.15rem; margin-bottom: 24px;">
            ${q.question}
          </div>

          <div class="scenario-options-grid" style="grid-template-columns: 1fr; gap: 12px;">
            ${q.options.map((opt, idx) => {
              const selected = this.examUserAnswers[q.id] === idx;
              return `
                <button class="scenario-opt-btn ${selected ? 'correct' : ''}" style="${selected ? 'border-color: var(--accent-primary); background: rgba(99,102,241,0.2);' : ''}" onclick="window.mlApp.selectExamAnswer('${q.id}', ${idx})">
                  ${opt}
                </button>
              `;
            }).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 30px;">
            <button class="btn btn-secondary" onclick="window.mlApp.toggleExamFlag('${q.id}')">
              ${isFlagged ? '🚩 Unflag' : '🏳️ Flag for Review'}
            </button>
            <div style="display: flex; gap: 10px;">
              <button class="btn btn-secondary" onclick="window.mlApp.prevExamQuestion()" ${this.examCurrentIndex === 0 ? 'disabled' : ''}>
                ⬅ Previous
              </button>
              <button class="btn btn-primary" onclick="window.mlApp.nextExamQuestion()">
                ${this.examCurrentIndex + 1 < totalQ ? 'Next ➔' : 'Review & Submit'}
              </button>
            </div>
          </div>
        </div>

        <div class="exam-sidebar">
          <div class="exam-timer-box">
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Time Remaining</span>
            <div class="timer-digits" id="exam-timer-val">25:00</div>
          </div>

          <h4>Question Palette</h4>
          <div class="question-palette">
            ${EXAM_QUESTIONS.map((item, idx) => {
              const answered = this.examUserAnswers[item.id] !== undefined;
              const current = idx === this.examCurrentIndex;
              const flagged = this.examFlagged.has(item.id);
              return `
                <button class="palette-btn ${current ? 'current' : ''} ${answered ? 'answered' : ''} ${flagged ? 'flagged' : ''}" onclick="window.mlApp.gotoExamQuestion(${idx})">
                  ${idx + 1}
                </button>
              `;
            }).join('')}
          </div>

          <button class="btn btn-accent" style="margin-top: 10px;" onclick="window.mlApp.submitExam()">
            Finish & Submit Exam
          </button>
        </div>
      </div>
    `;

    this.updateExamTimerDisplay();
  }

  selectExamAnswer(qId, optIdx) {
    this.examUserAnswers[qId] = optIdx;
    this.renderExamQuestion();
  }

  toggleExamFlag(qId) {
    if (this.examFlagged.has(qId)) this.examFlagged.delete(qId);
    else this.examFlagged.add(qId);
    this.renderExamQuestion();
  }

  prevExamQuestion() {
    if (this.examCurrentIndex > 0) {
      this.examCurrentIndex--;
      this.renderExamQuestion();
    }
  }

  nextExamQuestion() {
    if (this.examCurrentIndex + 1 < EXAM_QUESTIONS.length) {
      this.examCurrentIndex++;
      this.renderExamQuestion();
    } else {
      if (confirm('You have reached the end of the exam. Would you like to submit your answers now?')) {
        this.submitExam();
      }
    }
  }

  gotoExamQuestion(idx) {
    this.examCurrentIndex = idx;
    this.renderExamQuestion();
  }

  submitExam() {
    if (this.examTimer) clearInterval(this.examTimer);
    this.isExamActive = false;

    let score = 0;
    const total = EXAM_QUESTIONS.length;
    const topicStats = {};

    EXAM_QUESTIONS.forEach(q => {
      if (!topicStats[q.topicId]) {
        topicStats[q.topicId] = { name: q.topicName, correct: 0, total: 0 };
      }
      topicStats[q.topicId].total++;

      const userAns = this.examUserAnswers[q.id];
      if (userAns !== undefined && userAns === q.correct) {
        score++;
        topicStats[q.topicId].correct++;
      }
    });

    const percentage = Math.round((score / total) * 100);
    const weakTopics = [];
    const strongTopics = [];

    for (const [tId, stats] of Object.entries(topicStats)) {
      const topicPct = Math.round((stats.correct / stats.total) * 100);
      if (topicPct < 60) weakTopics.push(tId);
      else if (topicPct >= 80) strongTopics.push(tId);
    }

    const examResult = {
      timestamp: new Date().toISOString(),
      score,
      total,
      percentage,
      topicStats,
      weakTopics
    };

    window.appState.recordExamAttempt(examResult);
    this.renderExamScorecard(examResult);
  }

  renderExamScorecard(res) {
    const container = document.getElementById('exam-mount');
    if (!container) return;

    let grade = 'A+';
    if (res.percentage < 50) grade = 'F';
    else if (res.percentage < 65) grade = 'C';
    else if (res.percentage < 80) grade = 'B';
    else if (res.percentage < 90) grade = 'A';

    container.innerHTML = `
      <div class="scorecard-hero">
        <h2>Exam Complete — Detailed Performance Report</h2>
        <div class="scorecard-score">${res.score} / ${res.total}</div>
        <p style="font-size: 1.25rem;">Grade: <strong>${grade}</strong> (${res.percentage}% Accuracy)</p>
      </div>

      <div class="lab-grid" style="grid-template-columns: 1fr 1fr; margin-top: 24px;">
        <div class="dash-card">
          <h3>Topic-Wise Breakdown</h3>
          <div class="topic-breakdown-grid" style="grid-template-columns: 1fr;">
            ${Object.entries(res.topicStats).map(([tId, st]) => {
              const pct = Math.round((st.correct / st.total) * 100);
              const isWeak = pct < 60;
              return `
                <div class="topic-breakdown-card" style="${isWeak ? 'border-left: 3px solid #ef4444;' : 'border-left: 3px solid #22c55e;'}">
                  <div style="display: flex; justify-content: space-between;">
                    <strong>${st.name}</strong>
                    <span>${st.correct} / ${st.total} (${pct}%)</span>
                  </div>
                  <div class="progress-bar-track" style="height: 6px;">
                    <div class="progress-bar-fill" style="width: ${pct}%; background: ${isWeak ? '#ef4444' : '#22c55e'};"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="dash-card">
          <h3>Priority Revision Recommendations</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 12px;">
            Based on your answers, here are the topics you must revise immediately before your exam:
          </p>
          <div class="weak-topics-list">
            ${res.weakTopics.length === 0 ? `
              <div class="badge badge-pass" style="padding: 12px; font-size: 0.95rem;">
                🌟 Excellent! No weak topics found. You are fully prepared!
              </div>
            ` : res.weakTopics.map(tId => {
              const t = TOPICS_DATA.find(x => x.id === tId);
              return `
                <div class="weak-topic-item">
                  <span>🚨 ${t ? t.title : tId}</span>
                  <button class="btn btn-sm btn-primary" onclick="window.mlApp.jumpToTopic('${tId}')">
                    Review Topic ➔
                  </button>
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button class="btn btn-primary" onclick="window.mlApp.switchTab('revision')">Open 30-Min Revision</button>
            <button class="btn btn-secondary" onclick="window.mlApp.startExam()">Retake Exam</button>
          </div>
        </div>
      </div>
    `;
  }

  // =================== 10. FINAL REVISION ===================
  renderFinalRevision() {
    const mount30 = document.getElementById('rev-30-mount');
    const mount5 = document.getElementById('rev-5-mount');
    if (!mount30 || !mount5) return;

    // 30-Minute Revision
    mount30.innerHTML = REVISION_30_MIN.map(item => `
      <div class="dash-card" style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <h4>${item.topic}</h4>
          <span class="badge badge-accent">${item.pdfRef}</span>
        </div>
        <ul style="padding-left: 20px; font-size: 0.9rem; line-height: 1.6;">
          ${item.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    // 5-Minute Before Exam
    mount5.innerHTML = `
      <div class="dash-card" style="margin-bottom: 20px; border-left: 4px solid var(--accent-gold);">
        <h3>⚡ 10 Golden Last-Minute Exam Rules</h3>
        <ol style="padding-left: 22px; font-size: 0.92rem; line-height: 1.7; margin-top: 8px;">
          ${REVISION_5_MIN.goldenRules.map(rule => `<li><strong>${rule}</strong></li>`).join('')}
        </ol>
      </div>

      <div class="dash-card" style="margin-bottom: 20px;">
        <h3>📐 Essential Exam Formulas Cheat Sheet</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; margin-top: 12px;">
          ${REVISION_5_MIN.formulas.map(f => `
            <div style="background: #060911; padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.78rem; color: var(--text-muted);">${f.name}</div>
              <code style="color: #38bdf8; font-size: 0.88rem; display: block; margin-top: 4px;">${f.math}</code>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="dash-card">
        <h3>🔢 Must-Remember Magic Numbers from PDF Solved Examples</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 12px;">
          ${REVISION_5_MIN.magicNumbers.map(m => `
            <div style="background: rgba(99, 102, 241, 0.08); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid rgba(99, 102, 241, 0.2);">
              <div style="font-weight: 700; font-size: 0.88rem; color: var(--accent-secondary);">${m.item}</div>
              <div style="font-size: 0.85rem; color: var(--text-primary); margin-top: 2px;">${m.val}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Revision Sub-tab switcher
    document.querySelectorAll('.rev-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rev-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-rev');
        document.getElementById('rev-30-view').style.display = mode === '30' ? 'block' : 'none';
        document.getElementById('rev-5-view').style.display = mode === '5' ? 'block' : 'none';
      });
    });
  }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.mlApp = new MLModule2App();
});
