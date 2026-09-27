// High-Yield 30-Minute Revision & 5-Minute Before Exam Cram Sheets
// Condensed directly from all 187 slides of the PDF.

const REVISION_30_MIN = [
  {
    topic: "1. Supervised Learning & Variable Types",
    pdfRef: "Slides 2-14",
    highlights: [
      "Supervised Learning: Trained on labeled training data (inputs x and true outputs y) to predict outputs for unseen data.",
      "Categorical: Distinct labels with no inherent order (Blood groups, Marital status).",
      "Numerical: Quantities as numbers; Discrete (counts) or Continuous (measurements).",
      "Binary: Categorical with exactly 2 outcomes (Spam/Ham, 0/1).",
      "Interval: Numerical with equal intervals but NO TRUE ZERO (0°C is not absence of temperature; dates). Ratios NOT valid!",
      "Ratio: Numerical with a TRUE ZERO POINT (0 kg = no weight, $0 = no income). Ratios ARE valid!",
      "Dummy Variables: Categorical converted to binary (0/1) via one-hot encoding for ML models."
    ]
  },
  {
    topic: "2. Terminology & Bias-Variance Tradeoff",
    pdfRef: "Slides 15-30",
    highlights: [
      "Training vs Testing: Training data learns parameters; Testing evaluates generalization without showing labels.",
      "Loss Functions: MSE = (1/n) Σ(y - ŷ)² (Regression); Cross-Entropy (Classification).",
      "Optimization: Gradient Descent iteratively updates parameters to minimize loss.",
      "Model Selection & Complexity Parameters: Regularization penalty λ, Kernel bandwidth σ, Number of basis functions.",
      "Underfitting (High Bias): Model too simple; misses underlying pattern; poor on both train & test.",
      "Overfitting (High Variance): Model too complex; fits noise; perfect on train, fails on test.",
      "Total Error Equation: Error = Bias² + Variance + Irreducible Error."
    ]
  },
  {
    topic: "3. Linear & Non-Linear Regression",
    pdfRef: "Slides 31-56",
    highlights: [
      "Linear Regression Form: E(Y|X) is linear. Univariate: Y = β₀ + β₁X + ε. Multivariate: Y = β₀ + Σ β_j X_j + ε.",
      "Slope: a = Σ(x - x̄)(y - ȳ) / Σ(x - x̄)² (Covariance / Variance).",
      "Intercept: b = ȳ - a*x̄ (Passes through centroid).",
      "Residuals & Error: e_i = y_i - ŷ_i. RSS = Σ(y_i - ŷ_i)². MSE = RSS / n.",
      "PDF Numerical: x=[1..5], y=[3..11] ➔ x̄=3, ȳ=7, a=20/10=2, b=7-6=1 ➔ y = 2x + 1. For x=6, y=13. RSS=0.",
      "Non-Linear Regression: Used when relationship is curved. Polynomial: y = ax₁² + bx₂² + cx₁x₂ + dx₁ + ex₂ + f (Slide 55). Exponential: y = ae^(bx). Logarithmic: y = a + b*ln(x)."
    ]
  },
  {
    topic: "4. Classification Types & Real-World Domains",
    pdfRef: "Slides 57-66",
    highlights: [
      "Binary: 2 mutually exclusive classes. Native algorithms: Logistic Regression, SVM.",
      "Multi-Class: ≥3 mutually exclusive classes. Native: Naive Bayes, KNN, Random Forest.",
      "Multi-Class Conversion Strategies for Binary Classifiers:",
      "• One-vs-Rest (OvR / OvA): N classes ➔ N binary classifiers.",
      "• One-vs-One (OvO): N classes ➔ N*(N - 1) / 2 classifiers. Majority voting decides. Works BEST for SVM!",
      "Multi-Label: 0 or more non-exclusive classes per instance. Requires Multi-label DT, Multi-label RF.",
      "Real-World Domains in PDF: Healthcare (COVID-19 diagnosis), Education (document classification), Agriculture (seed-land suitability)."
    ]
  },
  {
    topic: "5. Logistic Regression",
    pdfRef: "Slides 67-74",
    highlights: [
      "Purpose: Predicts probability of categorical dependent variable using independent variables.",
      "Sigmoid Formula: P(Y=1|X) = 1 / (1 + e^-z), where linear score z = β₀ + β₁X.",
      "Decision Rule: If P > 0.5 ➔ Class 1, else Class 0. Boundary occurs at z = 0.",
      "Parameter Estimation: Maximum Likelihood Estimation (MLE), NOT OLS!",
      "PDF Numerical (Study Hours): β₀ = -4, β₁ = 0.8.",
      "• X = 2: z = -2.4, P = 0.083 ➔ Fail",
      "• X = 4: z = -0.8, P = 0.310 ➔ Fail",
      "• X = 6: z = +0.8, P = 0.690 ➔ Pass",
      "• X = 8: z = +2.4, P = 0.916 ➔ Pass",
      "• X = 10: z = +4.0, P = 0.982 ➔ Pass"
    ]
  },
  {
    topic: "6. Naïve Bayes Classifier",
    pdfRef: "Slides 75-100",
    highlights: [
      "Definition: Probabilistic classifier based on Bayes' Theorem with feature independence assumption.",
      "Why 'Naïve'? Assumes all features conditionally independent given class. Why 'Bayes'? Uses Bayes' rule.",
      "Formula: P(A|B) = [P(B|A) * P(A)] / P(B) ➔ Posterior = (Likelihood * Prior) / Evidence.",
      "Classification Rule: ŷ = argmax_c [ P(c) * Π P(x_j | c) ]. Denominator P(X) can be omitted for ranking.",
      "PDF Car Theft (10 cars): Red SUV Domestic ➔ Unnormalized: Stolen=0.024, Not Stolen=0.036. Normalized: 40% vs 60% ➔ Predict NOT STOLEN.",
      "Continuous Features: Modeled with Gaussian distribution using class mean and variance."
    ]
  },
  {
    topic: "7. K-Nearest Neighbour (KNN)",
    pdfRef: "Slides 101-115",
    highlights: [
      "Type: Non-parametric, Lazy Learner (stores cases, delays all calculations to query time).",
      "Steps: Choose K ➔ Compute Euclidean distance to all points ➔ Sort ➔ Take top K ➔ Majority vote.",
      "Euclidean Distance: d(p, q) = √[ (x₂ - x₁)² + (y₂ - y₁)² ].",
      "Choosing K: Most preferred K = 5. Choose ODD number for binary to avoid ties. Small K overfits (noise); large K underfits.",
      "PDF Iris Numerical: Query (5.2, 3.1). Top neighbours: (5.1, 3.3, Setosa, d=0.22), (5.4, 3.4, Setosa, d=0.36), (5.3, 3.7, Setosa, d=0.608). For K=5 ➔ Setosa wins majority (3 Setosa, 1 Versicolor, 1 Virginica)."
    ]
  },
  {
    topic: "8. Support Vector Machine & Kernels",
    pdfRef: "Slides 116-147",
    highlights: [
      "Hyperplane: Decision boundary w·x + b = 0. Line in 2D, plane in 3D, hyperplane in n-D.",
      "Support Vectors: Extreme data points closest to the hyperplane that define the boundary.",
      "Margin: Distance between support vectors = 2 / ||w||. Maximizing margin minimizes overfitting.",
      "Non-Linear SVM: Maps data to higher dimension (e.g. z = x² + y² in Slide 134) where linear hyperplane cuts data.",
      "Lili Jiang's Equation: K(x, y) = <f(x), f(y)>. Calculates inner product in higher dim without coordinate expansion!",
      "PDF Lili Jiang Example: x=(2,3,4), y=(3,4,5) ➔ x·y = 38 ➔ K(x, y) = (38)² = 1444.",
      "5 Kernel Formulas in PDF:",
      "1. Linear: x₁ · x₂",
      "2. Polynomial: (x₁ · x₂ + 1)ᵈ",
      "3. Gaussian (RBF): e^(-γ ||x₁ - xₙ||²)",
      "4. Exponential: exp( - ||x - y|| / (2σ²) )",
      "5. Laplacian: exp( - ||x - y|| / σ )"
    ]
  },
  {
    topic: "9. Decision Trees, ID3, CART & Pruning",
    pdfRef: "Slides 148-187",
    highlights: [
      "Anatomy: Root Node (top, entire population), Decision Nodes (sub-splits), Leaf Nodes (terminal classes).",
      "Algorithms: ID3 (Entropy & Information Gain), C4.5 (Gain Ratio), CART (Gini Index), CHAID, MARS.",
      "Entropy: H(S) = - Σ p_i * log₂(p_i). Pure node = 0; Maximum binary = 1.0 (at p=0.5).",
      "Information Gain: Gain(S, A) = H(S) - Σ (|S_v|/|S|) H(S_v). Expected reduction in entropy.",
      "Gini Index: Gini = 1 - Σ p_i². Pure node = 0; Maximum binary = 0.5 (at 50/50).",
      "PDF PlayTennis 14 Days: H(S) = 0.940. Gain(S, Humidity) = 0.151, Gain(S, Wind) = 0.048 ➔ ID3 picks Humidity!",
      "Pruning: Removes unnecessary decision nodes starting from leaf nodes to prevent overfitting.",
      "2 Pruning Methods: Cost Complexity Pruning and Reduced Error Pruning (uses separate validation set V)."
    ]
  },
  {
    topic: "10. Random Forest & Applications",
    pdfRef: "Slides 2, 61, 65, 182",
    highlights: [
      "Ensemble of Decision Trees: Resolves the overfitting disadvantage of single decision trees (Slide 182).",
      "Mechanism: Bootstrap Aggregation (Bagging) + Random Feature Subset selection at each split + Majority voting.",
      "Syllabus 4 Applications: House price prediction (regression), Medical diagnosis / COVID-19 (classification), Fault detection in machines (SVM), Financial risk / loan approval (Decision Trees / Random Forest)."
    ]
  }
];

const REVISION_5_MIN = {
  formulas: [
    { name: "Total Prediction Error", math: "Total Error = Bias² + Variance + Irreducible Error" },
    { name: "Linear Regression Slope", math: "a = Σ(x - x̄)(y - ȳ) / Σ(x - x̄)² = Cov(X,Y) / Var(X)" },
    { name: "Linear Regression Intercept", math: "b = ȳ - a * x̄" },
    { name: "Residual Sum of Squares", math: "RSS = Σ(y_i - ŷ_i)²   |   MSE = RSS / n" },
    { name: "Logistic Sigmoid Function", math: "P(Y=1|X) = 1 / (1 + e^-z),   z = β₀ + β₁X" },
    { name: "Bayes' Theorem", math: "P(A|B) = [P(B|A) * P(A)] / P(B)   |   Posterior = (Likelihood * Prior) / Evidence" },
    { name: "Euclidean Distance", math: "d(p, q) = √[ Σ(p_i - q_i)² ]" },
    { name: "SVM Margin Width", math: "Margin = 2 / ||w||" },
    { name: "Lili Jiang's Kernel Equation", math: "K(x, y) = < f(x), f(y) >" },
    { name: "Gaussian (RBF) Kernel", math: "k(x₁, xₙ) = e^(-γ ||x₁ - xₙ||²)" },
    { name: "Laplacian Kernel", math: "k(x, y) = exp( - ||x - y|| / σ )" },
    { name: "Exponential Kernel", math: "k(x, y) = exp( - ||x - y|| / (2σ²) )" },
    { name: "Entropy", math: "H(S) = - Σ p_i * log₂(p_i)   (0 = pure, 1.0 = binary 50/50)" },
    { name: "Information Gain", math: "Gain(S, A) = H(S) - Σ [ (|S_v| / |S|) * H(S_v) ]" },
    { name: "Gini Index (CART)", math: "Gini = 1 - Σ (p_i)²   (0 = pure, 0.5 = binary 50/50)" },
    { name: "One-vs-One Classifiers", math: "Number of Classifiers = N * (N - 1) / 2" }
  ],
  magicNumbers: [
    { item: "PlayTennis Base Entropy", val: "0.940 (9 Yes, 5 No out of 14)" },
    { item: "PlayTennis Humidity Gain", val: "0.151 (Beats Wind 0.048 ➔ Chosen as root)" },
    { item: "Linear Regression Example", val: "y = 2x + 1 (For x=6 ➔ y=13, RSS=0)" },
    { item: "Logistic Study Hours z=0", val: "X = 5 hours is the 50% decision boundary" },
    { item: "Car Theft Result", val: "Red SUV Domestic ➔ 60% NOT Stolen vs 40% Stolen" },
    { item: "Lili Jiang Vector Scalar", val: "1444 for x=(2,3,4) & y=(3,4,5) using (x·y)²" },
    { item: "Iris Query Classification", val: "(5.2, 3.1) ➔ Setosa for K=1, 2, and 5" }
  ],
  goldenRules: [
    "Interval = NO true zero (Temperature °C). Ratio = HAS true zero (Weight, Height, Income).",
    "High Bias = Underfitting. High Variance = Overfitting.",
    "Logistic Regression is a CLASSIFICATION algorithm, NOT regression.",
    "KNN is NON-PARAMETRIC and a LAZY LEARNER. Most preferred K = 5.",
    "OvO uses N(N-1)/2 classifiers and works BEST for SVM.",
    "Support vectors are ONLY the extreme points on the margin gutters.",
    "ID3 uses Information Gain (Entropy). CART uses Gini Index.",
    "Random Forest directly cures the overfitting issue of Decision Trees.",
    "Pruning trims branches starting from the LEAF nodes using a Validation set V."
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REVISION_30_MIN, REVISION_5_MIN };
}
