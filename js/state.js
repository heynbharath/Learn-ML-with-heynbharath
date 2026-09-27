// ML Module 2 State Management with LocalStorage persistence

const STATE_KEY = 'ML_MODULE2_EXAM_PREP_V1';

const defaultState = {
  theme: 'dark',
  activeTab: 'dashboard',
  currentTopic: 'intro_supervised',
  currentLab: 'linear_reg',
  currentNumericalTrack: 'linear_regression',
  topicProgress: {
    intro_supervised: 'not-started',
    ml_terminology: 'not-started',
    model_selection_bias_variance: 'not-started',
    linear_regression: 'not-started',
    nonlinear_regression: 'not-started',
    classification_types: 'not-started',
    logistic_regression: 'not-started',
    naive_bayes: 'not-started',
    knn: 'not-started',
    svm: 'not-started',
    decision_trees: 'not-started',
    random_forest_apps: 'not-started'
  },
  quizScores: {
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    level5: null
  },
  examHistory: [],
  gameScore: {
    correct: 0,
    total: 0,
    streak: 0,
    bestStreak: 0
  },
  weakTopics: []
};

class StateManager {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STATE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          topicProgress: { ...defaultState.topicProgress, ...(parsed.topicProgress || {}) },
          quizScores: { ...defaultState.quizScores, ...(parsed.quizScores || {}) }
        };
      }
    } catch (e) {
      console.warn('LocalStorage not available, using in-memory state', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  saveState() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state to LocalStorage', e);
    }
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.saveState();
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme() {
    const nextTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    return nextTheme;
  }

  setTopicStatus(topicId, status) {
    if (this.state.topicProgress[topicId] !== undefined) {
      this.state.topicProgress[topicId] = status;
      this.updateWeakTopics();
      this.saveState();
    }
  }

  recordQuizScore(level, score, total) {
    this.state.quizScores[level] = {
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date().toISOString()
    };
    this.saveState();
  }

  recordExamAttempt(examResult) {
    this.state.examHistory.push(examResult);
    if (examResult.weakTopics && examResult.weakTopics.length > 0) {
      examResult.weakTopics.forEach(wt => {
        if (!this.state.weakTopics.includes(wt)) {
          this.state.weakTopics.push(wt);
        }
      });
    }
    this.saveState();
  }

  recordGameAnswer(isCorrect) {
    this.state.gameScore.total += 1;
    if (isCorrect) {
      this.state.gameScore.correct += 1;
      this.state.gameScore.streak += 1;
      if (this.state.gameScore.streak > this.state.gameScore.bestStreak) {
        this.state.gameScore.bestStreak = this.state.gameScore.streak;
      }
    } else {
      this.state.gameScore.streak = 0;
    }
    this.saveState();
  }

  updateWeakTopics() {
    const weak = [];
    // If topic is marked not-started or student had low score in exam
    for (const [tId, status] of Object.entries(this.state.topicProgress)) {
      if (status === 'learning' || status === 'not-started') {
        // can be considered needing focus
      }
    }
    // Also include from latest exam if any
    const latestExam = this.state.examHistory[this.state.examHistory.length - 1];
    if (latestExam && latestExam.weakTopics) {
      latestExam.weakTopics.forEach(wt => {
        if (!weak.includes(wt)) weak.push(wt);
      });
    }
    this.state.weakTopics = weak;
  }

  calculateStats() {
    const totalTopics = Object.keys(this.state.topicProgress).length;
    let mastered = 0;
    let practiced = 0;
    let learning = 0;
    let notStarted = 0;

    Object.values(this.state.topicProgress).forEach(status => {
      if (status === 'mastered') mastered++;
      else if (status === 'practiced') practiced++;
      else if (status === 'learning') learning++;
      else notStarted++;
    });

    const completionRate = Math.round(((mastered * 1 + practiced * 0.7 + learning * 0.3) / totalTopics) * 100);

    // Quiz average
    const quizzes = Object.values(this.state.quizScores).filter(q => q !== null);
    const avgQuizScore = quizzes.length > 0
      ? Math.round(quizzes.reduce((acc, q) => acc + q.percentage, 0) / quizzes.length)
      : 0;

    return {
      totalTopics,
      mastered,
      practiced,
      learning,
      notStarted,
      completionRate,
      avgQuizScore,
      totalQuizzesTaken: quizzes.length,
      examCount: this.state.examHistory.length
    };
  }

  resetAllProgress() {
    this.state = JSON.parse(JSON.stringify(defaultState));
    this.saveState();
  }
}

window.appState = new StateManager();
