// Algorithm Revision Cards Database
// Faithful to PDF definitions, formulas, pros/cons, and exam traps.

const ALGORITHM_CARDS = [
  {
    id: "linear_regression",
    name: "Linear Regression",
    type: "Regression",
    nature: "Parametric, Generative/Discriminative (Conditional)",
    pdfRef: "Slides 31-50",
    what: "Assumes that the regression function E(Y|X) is linear in the inputs. Models continuous target Y as a linear combination of features X.",
    why: "Provides a foundational, interpretable benchmark for predicting quantitative numerical values (e.g. house prices).",
    input: "Numerical features X₁, X₂, ..., Xₚ (continuous or dummy-encoded categorical).",
    output: "Continuous scalar prediction ŷ ∈ (-∞, ∞).",
    how: "Minimizes Residual Sum of Squares (RSS) using Ordinary Least Squares (OLS) or Gradient Descent.",
    keyFormula: `Univariate: Y = β₀ + β₁X + ε
Slope: a = Σ(x - x̄)(y - ȳ) / Σ(x - x̄)²
Intercept: b = ȳ - a * x̄
RSS = Σ(y_i - ŷ_i)²`,
    keyTerms: [
      "Univariate (1 input)", "Multivariate (p > 1 inputs)", "Regression coefficients (weights)", "Residuals", "RSS", "MSE", "Irreducible error ε"
    ],
    advantages: [
      "Highly interpretable coefficients.",
      "Fast closed-form analytical solution via OLS.",
      "Low variance when relationship is truly linear."
    ],
    limitations: [
      "Cannot capture non-linear relationships without manual feature expansion.",
      "Vulnerable to outliers.",
      "Prone to high bias if true relationship is complex."
    ],
    examTraps: [
      "Remember: Univariate has ONE feature; Multivariate has multiple features.",
      "Slope is Covariance(X, Y) divided by Variance(X). Do NOT invert numerator and denominator!",
      "The line always passes through the centroid point (x̄, ȳ)."
    ],
    whenToUse: "Predicting house price, salary, temperature, sales numbers where continuous linear trend exists.",
    relatedAlgorithms: ["Non-linear Regression", "Logistic Regression", "Ridge/Lasso Regularization"]
  },
  {
    id: "nonlinear_regression",
    name: "Non-Linear Regression",
    type: "Regression",
    nature: "Parametric / Non-parametric",
    pdfRef: "Slides 51-56",
    what: "Regression where relationship between dependent and independent variables is modeled as a non-linear curve (polynomial, exponential, logarithmic).",
    why: "Linear regression fails when data has curvature, growth plateaus, or saturation effects.",
    input: "Continuous numerical features.",
    output: "Continuous scalar prediction ŷ.",
    how: "Fits non-linear mathematical equations (e.g. higher degree polynomials or basis expansions) to minimize residuals.",
    keyFormula: `Polynomial Form (Slide 55):
y = a*x₁² + b*x₂² + c*x₁x₂ + d*x₁ + e*x₂ + f
Exponential: y = a * e^(bx)
Logarithmic: y = a + b * ln(x)`,
    keyTerms: [
      "Polynomial regression", "Exponential curve", "Logarithmic curve", "Curvilinear relationship", "Basis functions"
    ],
    advantages: [
      "Fits complex, curved real-world relationships.",
      "Much lower bias than simple linear models on curved data."
    ],
    limitations: [
      "High degree polynomials overfit drastically (high variance).",
      "Less mathematically intuitive coefficient interpretations."
    ],
    examTraps: [
      "Slide 55 specifically highlights the 2-variable quadratic formula: a*x1^2 + b*x2^2 + c*x1*x2 + d*x1 + e*x2 + f.",
      "Nonlinear in features, but still linear in parameters if solved with polynomial basis."
    ],
    whenToUse: "Physical systems, biological growth, saturation models, accelerating cost functions.",
    relatedAlgorithms: ["Linear Regression", "Polynomial SVM", "Decision Tree Regressor"]
  },
  {
    id: "logistic_regression",
    name: "Logistic Regression",
    type: "Classification",
    nature: "Parametric, Discriminative",
    pdfRef: "Slides 67-74",
    what: "Supervised classification technique used for predicting a categorical dependent variable by mapping linear scores into probabilities using the Sigmoid function.",
    why: "Linear regression cannot bound predictions to [0, 1]. Logistic regression guarantees calibrated probabilities.",
    input: "Numerical or dummy-encoded categorical features.",
    output: "Probability P ∈ [0, 1] mapped to discrete class (0 or 1) via a decision threshold.",
    how: "Computes linear combination z = β₀ + β₁X, applies Sigmoid function P = 1/(1+e^-z), and classifies as 1 if P > threshold (default 0.5).",
    keyFormula: `Sigmoid Function:
P(Y = 1 | X) = 1 / (1 + e^-(β₀ + β₁X))

Decision Rule:
If P > 0.5 ➔ Class 1, else Class 0`,
    keyTerms: [
      "Sigmoid / Logistic function", "S-shaped curve", "Threshold value (0.5)", "Maximum Likelihood Estimation (MLE)", "Cross-Entropy Loss", "Odds / Log-odds"
    ],
    advantages: [
      "Outputs probabilistic confidence scores, not just hard labels.",
      "Efficient and fast training via gradient descent.",
      "Less prone to overfitting in low dimensions."
    ],
    limitations: [
      "Natively binary only (requires OvR or OvO for multi-class).",
      "Assumes linear decision boundary in feature space."
    ],
    examTraps: [
      "Despite containing 'Regression' in the name, it is strictly a CLASSIFICATION algorithm!",
      "Parameters are estimated via Maximum Likelihood Estimation (MLE), NOT OLS!",
      "At z = 0, P is exactly 0.5."
    ],
    whenToUse: "Binary problems: Exam pass/fail, disease presence/absence, spam detection, customer churn.",
    relatedAlgorithms: ["Linear Regression", "Linear SVM", "Naive Bayes"]
  },
  {
    id: "naive_bayes",
    name: "Naïve Bayes Classifier",
    type: "Classification",
    nature: "Generative, Probabilistic",
    pdfRef: "Slides 75-100",
    what: "Supervised probabilistic classifier based on Bayes' Theorem with the strong ('naïve') assumption of conditional independence between all features given the class.",
    why: "Extremely fast, requires minimal training data, scales gracefully to thousands of features (text, NLP).",
    input: "Categorical or continuous features (continuous handled via Gaussian distributions).",
    output: "Discrete class label with highest posterior probability.",
    how: "Constructs frequency and likelihood tables from training data. For new data, multiplies prior by all feature likelihoods; chooses class with maximum posterior (MAP).",
    keyFormula: `Bayes' Theorem:
P(A | B) = [P(B | A) * P(A)] / P(B)

Naïve Bayes Classification Rule:
ŷ = argmax_c [ P(C) * Π P(x_j | C) ]`,
    keyTerms: [
      "Posterior P(A|B)", "Likelihood P(B|A)", "Prior P(A)", "Evidence P(B)", "Conditional independence", "MAP rule", "Gaussian Naive Bayes"
    ],
    advantages: [
      "Extremely fast training and prediction.",
      "Handles high-dimensional data very well.",
      "Works well with small sample sizes if independence holds approximately."
    ],
    limitations: [
      "Feature independence assumption is almost never strictly true in reality ('naïve').",
      "Zero frequency issue if a category is missing in training data."
    ],
    examTraps: [
      "Why 'Naïve'? Because it assumes all features are independent given the class.",
      "Why 'Bayes'? Because it uses Bayes' Rule.",
      "The denominator P(X) can be ignored when ranking classes because it is identical for all candidate classes."
    ],
    whenToUse: "Spam filtration, sentiment analysis, document classification, medical screening.",
    relatedAlgorithms: ["Logistic Regression", "Decision Trees", "KNN"]
  },
  {
    id: "knn",
    name: "K-Nearest Neighbour (KNN)",
    type: "Classification & Regression",
    nature: "Non-parametric, Lazy Learner, Instance-based",
    pdfRef: "Slides 101-115",
    what: "One of the simplest machine learning algorithms that stores all historical instances and classifies new inputs based on similarity (distance measure).",
    why: "Zero training time, highly intuitive geometric decision boundaries, naturally handles multi-class data.",
    input: "Continuous numerical features (or normalized attributes).",
    output: "Discrete class label (majority vote) or mean value (regression).",
    how: "Select K ➔ Compute Euclidean distance to all stored points ➔ Sort distances ➔ Pick top K points ➔ Plurality/majority vote.",
    keyFormula: `Euclidean Distance:
d(p, q) = √[ (x₂ - x₁)² + (y₂ - y₁)² ] = √[ Σ(p_i - q_i)² ]

Optimal K:
K = 5 (most preferred), choose ODD number for binary`,
    keyTerms: [
      "Lazy learner", "Non-parametric", "Euclidean distance", "K parameter", "Majority vote", "Instance-based learning"
    ],
    advantages: [
      "Simple to understand and implement.",
      "Zero training phase (instantly ready).",
      "Naturally multi-class."
    ],
    limitations: [
      "Computationally expensive at test time: computes distance to EVERY point in dataset.",
      "Sensitive to irrelevant features and scale (requires normalization).",
      "Suffers heavily from curse of dimensionality."
    ],
    examTraps: [
      "KNN does NOT learn any weights or explicit model during training (Lazy Learner).",
      "Small K ➔ Overfitting (high variance, sensitive to noise).",
      "Large K ➔ Underfitting (high bias, smooths boundaries).",
      "Always pick an ODD K for binary classification to prevent ties!"
    ],
    whenToUse: "Low-dimensional data, recommendation systems, baseline classification, handwriting digits.",
    relatedAlgorithms: ["Radius Neighbors", "SVM", "K-Means (clustering)"]
  },
  {
    id: "svm",
    name: "Support Vector Machine (SVM)",
    type: "Classification (natively binary, extensible to multi-class)",
    nature: "Non-probabilistic, Maximal Margin, Kernel-based",
    pdfRef: "Slides 116-147",
    what: "Finds the optimal hyperplane that segregates data classes with the maximum possible margin.",
    why: "Maximal margin provides the strongest theoretical guarantee against overfitting on unseen data.",
    input: "Continuous numerical features (or transformed feature spaces).",
    output: "Discrete class label (-1 or +1).",
    how: "Identifies extreme support vectors on margin boundaries. Maximizes margin 2/||w||. If non-linear, uses Kernel functions to map data into higher dimensions without computing coordinates directly.",
    keyFormula: `Hyperplane: w · x + b = 0
Margin: 2 / ||w||
Lili Jiang's Equation: K(x, y) = <f(x), f(y)>
Kernels:
• Linear: x₁ · x₂
• Polynomial: (x₁ · x₂ + 1)ᵈ
• Gaussian: exp(-γ ||x₁ - xₙ||²)
• Exponential: exp(-||x - y|| / (2σ²))
• Laplacian: exp(-||x - y|| / σ)`,
    keyTerms: [
      "Hyperplane", "Support Vectors", "Margin", "Maximal Margin Classifier", "Kernel Method", "Kernel Trick", "Lili Jiang's equation (1444)", "RBF"
    ],
    advantages: [
      "Effective in high-dimensional spaces.",
      "Memory efficient: decision boundary depends ONLY on support vectors, not all data.",
      "Versatile via custom kernel functions."
    ],
    limitations: [
      "High computational cost for very large datasets.",
      "Natively binary (requires OvO or OvR for multi-class; OvO works best).",
      "Sensitive to choice of kernel and regularization parameters."
    ],
    examTraps: [
      "Support vectors are NOT all points; they are ONLY the extreme data points lying on the margin boundaries!",
      "The 2D to 3D mapping equation in Slide 134 is: z = x² + y².",
      "Memorize the 5 kernel formulas and Lili Jiang's equation for 5 marks!"
    ],
    whenToUse: "Face detection, image classification, text categorization, bioinformatics (Slide 119).",
    relatedAlgorithms: ["Logistic Regression", "Perceptron", "Kernel Ridge Regression"]
  },
  {
    id: "decision_trees",
    name: "Decision Trees (ID3 & CART)",
    type: "Classification & Regression",
    nature: "Non-parametric, Hierarchical, Greedy recursive",
    pdfRef: "Slides 148-187",
    what: "A graphical tree structure where internal nodes represent attribute tests, branches represent test outcomes, and leaf nodes hold target class labels.",
    why: "Follows human decision-making processes, handles both numerical and categorical data with minimal preprocessing, and produces transparent rules.",
    input: "Categorical and numerical attributes.",
    output: "Class label (mode) or numerical value (mean).",
    how: "Greedy top-down recursive splitting. ID3 uses Information Gain (Entropy reduction). CART uses Gini Index. Pruning is applied to prevent overfitting.",
    keyFormula: `Entropy:
H(S) = - Σ [ p_i * log₂(p_i) ]

Information Gain:
Gain(S, A) = Entropy(S) - Σ [ (|S_v|/|S|) * Entropy(S_v) ]

Gini Index:
Gini = 1 - Σ (p_i)²`,
    keyTerms: [
      "Root Node", "Decision Node", "Leaf Node", "Sub-tree / Branch", "ID3", "C4.5", "CART", "Entropy", "Information Gain", "Gini Index", "Pruning", "Cost Complexity Pruning", "Reduced Error Pruning"
    ],
    advantages: [
      "Simple to understand; mimics human reasoning (Slide 182).",
      "Less requirement of data cleaning compared to other algorithms (Slide 182).",
      "Handles non-linear relationships naturally."
    ],
    limitations: [
      "Decision trees contain lots of layers, making them complex (Slide 182).",
      "Prone to overfitting (Slide 182).",
      "Computational complexity increases for many class labels (Slide 182)."
    ],
    examTraps: [
      "ID3 uses Information Gain (multi-way categorical splits).",
      "CART uses Gini Index (strictly binary splits).",
      "Entropy is 0 for pure nodes, 1 for 50/50 binary splits.",
      "Pruning trims branches starting from LEAF nodes toward the root using a separate Validation set V!",
      "Know the two pruning methods: Cost Complexity Pruning and Reduced Error Pruning (Slide 185)."
    ],
    whenToUse: "Bank loan approval, customer segmentation, credit risk, medical diagnosis decision trees.",
    relatedAlgorithms: ["Random Forest", "C4.5", "Gradient Boosted Trees (GBDT)"]
  },
  {
    id: "random_forest",
    name: "Random Forest",
    type: "Classification & Regression",
    nature: "Ensemble, Bagging",
    pdfRef: "Slides 2, 61, 65, 182",
    what: "An ensemble of decorrelated decision trees trained on bootstrap samples of training data with random feature selection at each split, aggregated via majority voting.",
    why: "Directly solves the primary disadvantage of Decision Trees cited in Slide 182: 'The decision tree may have an overfitting issue, which can be resolved using the Random Forest algorithm.'",
    input: "High-dimensional categorical and numerical data.",
    output: "Majority vote of classes (classification) or average prediction (regression).",
    how: "1. Bootstrap sampling (bagging) with replacement. 2. Random subset of features chosen at each candidate split. 3. Trees grown deep without pruning. 4. Aggregate predictions.",
    keyFormula: `Ensemble Prediction:
ŷ = mode( T₁(x), T₂(x), ..., T_B(x) )

Variance Reduction:
Var(Ensemble) = ρ*σ² + [(1-ρ)/B]*σ²`,
    keyTerms: [
      "Ensemble learning", "Bootstrap Aggregation (Bagging)", "Random feature selection", "Majority voting", "Variance reduction", "Out-of-bag error"
    ],
    advantages: [
      "Significantly higher accuracy and robustness than individual trees.",
      "Overcomes decision tree overfitting.",
      "Naturally supports multi-class and multi-label problems (Slide 61, 65)."
    ],
    limitations: [
      "Black box nature; loses the clean interpretability of a single decision tree.",
      "Slower training and inference due to evaluating hundreds of trees."
    ],
    examTraps: [
      "In the syllabus (Slide 2), Decision Trees and Random Forest are paired together.",
      "Random Forest combines bagging with RANDOM FEATURE SUBSETS at each split (not just data bagging).",
      "Trees are NOT pruned in Random Forest!"
    ],
    whenToUse: "Financial risk prediction, multi-label text/vision classification, complex predictive pipelines where interpretability is secondary to accuracy.",
    relatedAlgorithms: ["Decision Trees", "Extra Trees", "Gradient Boosting"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALGORITHM_CARDS };
}
