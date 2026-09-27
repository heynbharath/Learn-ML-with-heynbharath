# 🧠 ML Module 2 Exam Command Center

> **100% Course PDF Ground Truth** — An interactive, high-yield exam preparation platform built directly from the 187-page `ML Module 2 - v1.pdf`.

Designed for rapid mastery, visualization, calculation practice, recall, and self-testing before exam time.

---

## 🚀 Live Demo & Quick Run

Run locally in any modern browser:

```bash
# Clone the repository
git clone https://github.com/heynbharath/Learn-ML-with-heynbharath.git
cd Learn-ML-with-heynbharath

# Start a local web server (Python 3)
python3 -m http.server 8080

# Open in your browser
open http://localhost:8080
```

---

## 🎯 Key Features

### 1. 🗺️ Master Concept Map
- Interactive, clickable structural hierarchy mapping all **12 modules** across Supervised Learning (Regression & Classification).
- One-click navigation to the complete curriculum, definitions, and formulas.

### 2. 📖 Learning Mode (Strict A–K Structure)
Every topic is structured rigorously to mirror exam expectations:
- **A.** What is it?
- **B.** Why do we need it?
- **C.** Intuition
- **D.** How it works
- **E.** Algorithm / Steps
- **F.** Formulas (with KaTeX rendering)
- **G.** Examples from the Course PDF
- **H.** Visual Explanation
- **I.** Exam-Important Points & Faculty Terminology
- **J.** Common Confusions & Distinctions
- **K.** Quick Recall Questions with hidden/reveal answers

### 3. 🧪 Interactive Visual Lab
No static diagrams — dynamic, mathematical HTML5 Canvas playgrounds:
- **📈 Linear Regression (OLS & Residuals):** Manipulate slope $a$ and intercept $b$ on the PDF dataset $([1,3], [2,5], [3,7], [4,9], [5,11])$, inspect live residual error lines, real-time RSS / MSE calculations, and snap to optimal OLS fit $(a=2, b=1, RSS=0)$.
- **📉 Logistic Regression (Sigmoid & Threshold):** Interactive S-curve, dynamic probability mapping $z = \beta_0 + \beta_1 X$, threshold classification slider, and PDF benchmark calculations ($X=2..10$ study hours).
- **🎯 K-Nearest Neighbour (KNN 2D):** Complete 15-sample Iris flower dataset (Setosa, Versicolor, Virginica), draggable query point $(5.2, 3.1)$, real-time Euclidean distance ranking, radius circle, and live voting tally.
- **🌳 Decision Tree (ID3 & CART):** Complete 14-day PlayTennis dataset ($S=[9+, 5-]$), interactive split selection across Outlook, Temperature, Humidity, and Wind, with live step-by-step Entropy / Information Gain (ID3) and Gini Index (CART) calculations.
- **⚡ Support Vector Machine & Kernel Trick:**
  - 2D Linear Maximal Margin with automatic Support Vector identification.
  - Non-linear separation with 2D $\to$ 3D paraboloid elevation ($z = x^2 + y^2$).
  - **Lili Jiang Kernel Trick Playground:** Exact calculation showing how $\phi(x) \cdot \phi(y) = (x \cdot y)^2 = 1444$ avoids high-dimensional computation.

### 4. 🧮 Numerical Lab (Progressive Step-by-Step Solver)
Step-by-step guided practice with instant numerical validation and hints:
1. **Track 1:** Simple Linear Regression OLS ($a=2, b=1, \hat{y}_{x=6}=13, RSS=0$).
2. **Track 2:** Logistic Regression Probabilities & Decision Boundary ($\beta_0=-4, \beta_1=0.8$).
3. **Track 3:** Naïve Bayes Car Theft Classification (10 samples, Red/SUV/Domestic).
4. **Track 4:** Multi-Class Classification Classifiers ($N=3 \implies \text{OvR}=3, \text{OvO}=3$).
5. **Track 5:** KNN Classification on Iris Dataset ($K=5$ vote on query point $(5.2, 3.1)$).
6. **Track 6:** SVM Kernel Calculation ($x=(2,3,4), y=(3,4,5) \implies 1444$).

### 5. 🃏 Algorithm Revision Flashcards
Quick revision cards detailing:
- *What, Why, Input, Output, How, Key Formula, Key Terms, Exam Traps, and When to Use* across Linear Regression, Logistic Regression, KNN, Naïve Bayes, Decision Trees (ID3/CART), Random Forest, Linear SVM, and Non-Linear Kernel SVM.

### 6. ⚖️ High-Yield Comparison Matrices
Side-by-side matrices comparing:
- Linear Regression vs. Logistic Regression
- ID3 vs. CART
- Decision Tree vs. Random Forest
- KNN vs. SVM
- Linear SVM vs. Non-linear SVM
- Classification vs. Regression
- Binary vs. Multi-Class vs. Multi-Label

### 7. 🎮 "Which Algorithm?" Scenario Arena
10 realistic problem statements taken directly from course slides with streak counters, instant feedback, and technical rationales.

### 8. 📝 Tiered Quiz Mode
- **Level 1:** Core Definitions & Terminology
- **Level 2:** Conceptual & Theoretical Distinctions
- **Level 3:** Application Scenarios
- **Level 4:** Numerical Calculations
- **Level 5:** Exam-Style 2–5 Mark Short Answers with keyword matching

### 9. 🎯 Exam Simulator (Mock Exam)
- 25-minute timed test with 20 questions across all 12 modules.
- Question palette with flag-for-review capability.
- Distraction-free (no answers revealed during test).
- Automated post-exam scorecard with topic-by-topic breakdown and priority revision recommendations.

### 10. ⚡ Final Revision Mode
- **30-Minute Comprehensive Revision:** High-yield summaries covering all algorithms, steps, and traps.
- **5-Minute Before Exam Cram:** 10 Golden Rules, must-remember magic numbers ($1444$, $0.940$, $0.151$, $0.048$, $a=2, b=1$), and the essential formulas cheat sheet.

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, ES6+ JavaScript (Zero framework dependencies, lightweight and blazing fast).
- **Math Engine:** KaTeX for LaTeX formula rendering.
- **Storage:** LocalStorage persistence for user mastery status, quiz streaks, and weak topic tracking.
- **Assets:** High-resolution extracted course figures and dynamic Canvas vector visualizations.

---

## 📜 Syllabus & PDF Ground Truth

All content, formulas, datasets, and examples are strictly derived from **ML Module 2 - v1.pdf**:
1. Introduction to Supervised Learning (Slides 1–25)
2. Classification: Binary, Multi-Class & Multi-Label (Slides 26–39, 58–63)
3. Linear Regression & Ordinary Least Squares (Slides 40–54)
4. Nonlinear Regression (Slides 55–57)
5. Logistic Regression (Slides 64–79)
6. Naïve Bayes Classification (Slides 80–99)
7. K-Nearest Neighbour (KNN) (Slides 100–123)
8. Support Vector Machine (Linear, Margin & Kernels) (Slides 124–154)
9. Decision Trees (ID3, Entropy & Information Gain) (Slides 155–174)
10. CART & Gini Index (Slides 175–180)
11. Random Forest & Overfitting Remedy (Slides 181–183)
12. Model Selection, Bias-Variance Tradeoff & Applications (Slides 184–187)

---

Developed with ❤️ for Machine Learning exam preparation.
