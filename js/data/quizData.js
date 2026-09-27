// Comprehensive Quiz & Exam Question Bank
// Generated strictly from the 187-page PDF.

const QUIZ_LEVELS = {
  level1: {
    name: "Level 1: Basic Definitions",
    description: "Fundamental terminology, variable types, and core machine learning definitions.",
    questions: [
      {
        id: "l1_q1",
        type: "mcq",
        question: "According to the PDF, what is Supervised Learning?",
        options: [
          "Learning where algorithms find hidden patterns in unlabeled data without guidance",
          "Learning in which machines are trained with well 'Labeled' training data, and on the basis of that data, machine predict the output",
          "Learning via trial and error using agent rewards and penalties",
          "Learning by clustering numerical features based on centroid distance"
        ],
        correct: 1,
        pdfRef: "Slide 3",
        explanation: "Slide 3 defines Supervised Learning as the type of machine learning in which machines are trained with well 'Labeled' training data and on the basis of that data, predict the output."
      },
      {
        id: "l1_q2",
        type: "mcq",
        question: "Which of the following is an Interval variable?",
        options: [
          "Income in dollars ($0 means no income)",
          "Temperature in Celsius or Fahrenheit (0°C does not mean 'no temperature')",
          "Weight in kilograms (0 kg means no weight)",
          "Height in meters (0 m means no height)"
        ],
        correct: 1,
        pdfRef: "Slide 12",
        explanation: "Slide 12: Interval variables are numerical with meaningful intervals, but have NO true zero point (e.g. 0°C does not mean absence of temperature)."
      },
      {
        id: "l1_q3",
        type: "tf",
        question: "True or False: In a Ratio variable, zero represents the complete absence of the measured quantity.",
        options: ["True", "False"],
        correct: 0,
        pdfRef: "Slide 13",
        explanation: "Slide 13: Ratio variables have a meaningful zero point, allowing both differences and ratios to be calculated (e.g. Weight: 0 kg means no weight)."
      },
      {
        id: "l1_q4",
        type: "mcq",
        question: "What is the process of converting a categorical variable with k categories into binary columns called in the PDF?",
        options: [
          "Ordinal Ranking",
          "Dummy encoding (Dummy Variables)",
          "Kernel Mapping",
          "Bootstrap Aggregation"
        ],
        correct: 1,
        pdfRef: "Slide 14",
        explanation: "Slide 14: Categorical variables converted into numerical binary form are called Dummy Variables (also called dummy encoding or one-hot encoding)."
      },
      {
        id: "l1_q5",
        type: "fill",
        question: "The function that measures how well the model's predictions match the actual labels by calculating the difference between predicted and actual output is the _____ function.",
        options: ["Loss", "Hypothesis", "Kernel", "Pruning"],
        correct: 0,
        pdfRef: "Slide 18",
        explanation: "Slide 18: Loss Function (Cost Function) measures how well predictions match actual labels."
      },
      {
        id: "l1_q6",
        type: "mcq",
        question: "What are the extreme data points/vectors closest to the hyperplane in an SVM called?",
        options: [
          "Centroids",
          "Support Vectors",
          "Basis Functions",
          "Leaf Nodes"
        ],
        correct: 1,
        pdfRef: "Slide 117, 128",
        explanation: "Slide 117 & 128: These extreme cases are called Support Vectors, and the algorithm is termed Support Vector Machine."
      },
      {
        id: "l1_q7",
        type: "mcq",
        question: "In Decision Trees, what is a terminal node that does NOT get divided further called?",
        options: [
          "Root Node",
          "Decision Node",
          "Leaf Node",
          "Branch"
        ],
        correct: 2,
        pdfRef: "Slide 151",
        explanation: "Slide 151: Leaf Node (or Terminal Node) represents the final class label and does not split further."
      },
      {
        id: "l1_q8",
        type: "tf",
        question: "True or False: KNN is an Eager Learner that learns mathematical model parameters during training time.",
        options: ["True", "False"],
        correct: 1,
        pdfRef: "Slide 101",
        explanation: "Slide 101: KNN is a Lazy Learner (it does not learn during training; it stores the dataset and performs all distance calculations at query time)."
      },
      {
        id: "l1_q9",
        type: "mcq",
        question: "What is the optimal or most preferred value of K in the KNN algorithm cited in Slide 115?",
        options: ["K = 1", "K = 2", "K = 5", "K = 50"],
        correct: 2,
        pdfRef: "Slide 115",
        explanation: "Slide 115 explicitly notes: 'The most preferred value for K is 5.'"
      },
      {
        id: "l1_q10",
        type: "fill",
        question: "The process of deleting unnecessary decision nodes from a tree in order to get an optimal decision tree and prevent overfitting is known as _____.",
        options: ["Pruning", "Boosting", "Encoding", "Splitting"],
        correct: 0,
        pdfRef: "Slide 184-186",
        explanation: "Slide 185-186: Pruning is the technique that decreases the size of the learning tree without reducing accuracy."
      }
    ]
  },
  level2: {
    name: "Level 2: Conceptual Understanding",
    description: "Bias-variance tradeoff, kernel tricks, entropy, and multi-class conversion strategies.",
    questions: [
      {
        id: "l2_q1",
        type: "mcq",
        question: "According to Slide 27, what is the formula for Total Prediction Error?",
        options: [
          "Error = Bias + Variance",
          "Error = Bias² + Variance + Irreducible Error",
          "Error = RSS / n - Variance",
          "Error = Covariance(X, Y) / Variance(X)"
        ],
        correct: 1,
        pdfRef: "Slide 27",
        explanation: "Slide 27 explicitly states: Error = Bias² + Variance + Irreducible Error."
      },
      {
        id: "l2_q2",
        type: "mcq",
        question: "A model that is too simple and has very few parameters will typically have:",
        options: [
          "High variance and low bias (Overfitting)",
          "High bias and low variance (Underfitting)",
          "Low bias and low variance (Ideal)",
          "Zero irreducible error"
        ],
        correct: 1,
        pdfRef: "Slide 28",
        explanation: "Slide 28: 'If the model is too simple and has very few parameters then it may have high bias and low variance.'"
      },
      {
        id: "l2_q3",
        type: "mcq",
        question: "How many binary classifiers are trained for N classes using the One-versus-One (OvO) approach?",
        options: [
          "N classifiers",
          "N * (N - 1) / 2 classifiers",
          "2^N classifiers",
          "N - 1 classifiers"
        ],
        correct: 1,
        pdfRef: "Slide 62",
        explanation: "Slide 62 explicitly gives: For N labels, we will have N * (N - 1) / 2 binary classifiers, and notes this works best for SVM!"
      },
      {
        id: "l2_q4",
        type: "mcq",
        question: "Why is the Naïve Bayes classifier described as 'Naïve'?",
        options: [
          "Because it cannot handle numbers",
          "Because it assumes the occurrence of a certain feature is completely independent of the occurrence of other features",
          "Because it does not use a loss function",
          "Because it only works for binary classes"
        ],
        correct: 1,
        pdfRef: "Slide 76",
        explanation: "Slide 76: 'It is called Naïve because it assumes that the occurrence of a certain feature is independent of the occurrence of other features.'"
      },
      {
        id: "l2_q5",
        type: "mcq",
        question: "When is Entropy H(X) equal to zero in a decision tree node?",
        options: [
          "When the probability of each class is exactly 0.5 (perfect randomness)",
          "When the probability of the class is either 0 or 1 (pure node)",
          "When there are infinite classes",
          "When the dataset has high noise"
        ],
        correct: 1,
        pdfRef: "Slide 163, 167",
        explanation: "Slide 163 & 167: Entropy H(X) is zero when the probability is either 0 or 1 (pure node, all instances belong to the same class)."
      },
      {
        id: "l2_q6",
        type: "mcq",
        question: "What is the transformation equation used in Slide 134 to map 2D non-linear points into 3D space for SVM separation?",
        options: [
          "z = x + y",
          "z = x² + y²",
          "z = log(x) * log(y)",
          "z = 1 / (1 + e^-x)"
        ],
        correct: 1,
        pdfRef: "Slide 134",
        explanation: "Slide 134 specifically uses: z = x² + y² to elevate 2D points into a 3D bowl where a flat 2D plane separates them."
      },
      {
        id: "l2_q7",
        type: "mcq",
        question: "In Decision Tree construction, Information Gain Gain(S, A) represents:",
        options: [
          "An increase in dataset randomness",
          "The expected decrease/reduction in entropy caused by partitioning on attribute A",
          "The number of leaf nodes created",
          "The ratio of covariance to variance"
        ],
        correct: 1,
        pdfRef: "Slide 169-170",
        explanation: "Slide 169-170: Information gain is a decrease in entropy; a measure of the effectiveness of an attribute in classifying training data."
      },
      {
        id: "l2_q8",
        type: "tf",
        question: "True or False: According to Slide 65, standard binary or multi-class models CANNOT be used directly to perform multi-label classification without specialized algorithms.",
        options: ["True", "False"],
        correct: 0,
        pdfRef: "Slide 65",
        explanation: "Slide 65 explicitly notes: 'It is not possible to use multi-class or binary classification models to perform multi-label classification. However, specialized versions like Multi-label DT, Multi-label RF exist.'"
      },
      {
        id: "l2_q9",
        type: "mcq",
        question: "What are the two tree pruning techniques explicitly listed in Slide 185?",
        options: [
          "Forward Pruning and Backward Pruning",
          "Cost Complexity Pruning and Reduced Error Pruning",
          "Entropy Pruning and Gini Pruning",
          "Linear Pruning and Kernel Pruning"
        ],
        correct: 1,
        pdfRef: "Slide 185",
        explanation: "Slide 185 lists: 1. Cost Complexity Pruning, 2. Reduced Error Pruning."
      },
      {
        id: "l2_q10",
        type: "mcq",
        question: "What is Lili Jiang's equation of the Kernel function in Slide 143?",
        options: [
          "K(x, y) = x + y",
          "K(x, y) = < f(x), f(y) >",
          "K(x, y) = ||x - y||²",
          "K(x, y) = 1 - Σ p_i²"
        ],
        correct: 1,
        pdfRef: "Slide 143",
        explanation: "Slide 143 states: 'Lili Jiang's equation of kernel which is: K(x, y) = < f(x), f(y) > where < x, y > is the dot product.'"
      }
    ]
  },
  level3: {
    name: "Level 3: Applications & Comparisons",
    description: "Real-world domain matching, algorithm pros and cons, and exam case studies.",
    questions: [
      {
        id: "l3_q1",
        type: "mcq",
        question: "In Slide 59, which machine learning application domain used classification to 'predict whether a person had COVID-19 or not'?",
        options: [
          "Healthcare",
          "Education",
          "Sustainable agriculture",
          "E-commerce"
        ],
        correct: 0,
        pdfRef: "Slide 59",
        explanation: "Slide 59 highlights Healthcare: 'During the COVID-19 pandemic, ML models were implemented to efficiently predict whether a person had COVID-19 or not.'"
      },
      {
        id: "l3_q2",
        type: "mcq",
        question: "In Sustainable Agriculture (Slide 59), classification models are used for:",
        options: [
          "Predicting daily temperature in Celsius",
          "Predicting which type of land is suitable for a given type of seed",
          "Estimating market tractor sale prices",
          "Classifying satellite image camera models"
        ],
        correct: 1,
        pdfRef: "Slide 59",
        explanation: "Slide 59: 'Sustainable agriculture: By using classification models to predict which type of land is suitable for a given type of seed.'"
      },
      {
        id: "l3_q3",
        type: "mcq",
        question: "According to Slide 182, what algorithm is specifically identified to resolve the overfitting issue of Decision Trees?",
        options: [
          "Linear Regression",
          "Random Forest",
          "Naïve Bayes",
          "K-Means"
        ],
        correct: 1,
        pdfRef: "Slide 182",
        explanation: "Slide 182: 'It may have an overfitting issue, which can be resolved using the Random Forest algorithm.'"
      },
      {
        id: "l3_q4",
        type: "mcq",
        question: "Which of the following is NOT an advantage of Decision Trees cited in Slide 182?",
        options: [
          "It is simple to understand as it follows the human decision process",
          "There is less requirement of data cleaning compared to other algorithms",
          "It never overfits and always has zero variance",
          "It helps to think about all possible outcomes for a problem"
        ],
        correct: 2,
        pdfRef: "Slide 182",
        explanation: "Slide 182 lists advantages: human-like logic, solves decision problems, less data cleaning. Overfitting is cited as a DISADVANTAGE, not an advantage!"
      },
      {
        id: "l3_q5",
        type: "mcq",
        question: "According to Slide 62, which multi-class strategy 'works best for SVM and other kernel-based algorithms'?",
        options: [
          "One-versus-Rest (OvR)",
          "One-versus-One (OvO)",
          "Direct Multi-Label Regression",
          "K-Means clustering"
        ],
        correct: 1,
        pdfRef: "Slide 62",
        explanation: "Slide 62 explicitly states: 'One-vs-one approach works best for SVM and other kernel-based algorithms.'"
      },
      {
        id: "l3_q6",
        type: "mcq",
        question: "Which two algorithms from the PDF are natively designed for binary classification but require transformation strategies for multi-class?",
        options: [
          "Naïve Bayes and KNN",
          "Logistic Regression and Support Vector Machines",
          "Random Forest and Decision Trees",
          "Linear Regression and Polynomial Basis"
        ],
        correct: 1,
        pdfRef: "Slide 60, 62",
        explanation: "Slide 60 & 62: Logistic Regression and Support Vector Machines are natively designed for binary classifications and do not support multi-class by default."
      },
      {
        id: "l3_q7",
        type: "mcq",
        question: "In Slide 119, which of the following real-world applications is explicitly cited for Support Vector Machines?",
        options: [
          "Face detection, image classification, text categorization",
          "Sorting mail in postal boxes only",
          "Predicting rainfall quantity in inches",
          "Calculating interest rates on credit cards"
        ],
        correct: 0,
        pdfRef: "Slide 119",
        explanation: "Slide 119: 'SVM algorithm can be used for Face detection, image classification, text categorization.'"
      },
      {
        id: "l3_q8",
        type: "mcq",
        question: "Which decision tree algorithm uses the Gini index as its attribute selection metric according to Slide 157 and 181?",
        options: [
          "ID3",
          "C4.5",
          "CART (Classification And Regression Tree)",
          "CHAID"
        ],
        correct: 2,
        pdfRef: "Slide 157, 181",
        explanation: "Slide 157 & 181: CART uses the Gini Index as its measure of impurity."
      }
    ]
  },
  level4: {
    name: "Level 4: Numerical Calculations",
    description: "Calculations based directly on the PDF tables, formulas, and slide examples.",
    questions: [
      {
        id: "l4_q1",
        type: "num",
        question: "In the Linear Regression dataset from Slide 41 (x = [1, 2, 3, 4, 5], y = [3, 5, 7, 9, 11]), what is the calculated slope 'a'?",
        correct: 2,
        tolerance: 0.05,
        pdfRef: "Slide 43",
        explanation: "Numerator = 20, Denominator = 10. Slope a = 20 / 10 = 2 (Slide 43)."
      },
      {
        id: "l4_q2",
        type: "num",
        question: "Using the regression model y = 2x + 1 from Slide 44, what is the predicted value of y for x = 6?",
        correct: 13,
        tolerance: 0.1,
        pdfRef: "Slide 46",
        explanation: "y = 2(6) + 1 = 12 + 1 = 13 (Slide 46)."
      },
      {
        id: "l4_q3",
        type: "num",
        question: "In the Logistic Regression exam passing problem (Slide 73), with β₀ = -4 and β₁ = 0.8, what is the linear score z for X = 6 hours?",
        correct: 0.8,
        tolerance: 0.05,
        pdfRef: "Slide 73",
        explanation: "z = -4 + 0.8(6) = -4 + 4.8 = +0.8 (Slide 73)."
      },
      {
        id: "l4_q4",
        type: "num",
        question: "In the Car Theft Naïve Bayes problem (Slide 89), what is the calculated UNNORMALIZED posterior probability for Stolen = Yes for a Red SUV Domestic car?",
        correct: 0.024,
        tolerance: 0.002,
        pdfRef: "Slide 89",
        explanation: "P(Yes) * P(Red|Yes) * P(SUV|Yes) * P(Domestic|Yes) = 0.5 * 0.6 * 0.2 * 0.4 = 0.024 (Slide 89)."
      },
      {
        id: "l4_q5",
        type: "num",
        question: "In the Lili Jiang Kernel illustration (Slide 144) with x = (2, 3, 4) and y = (3, 4, 5), what is the scalar result of K(x, y) = (x · y)²?",
        correct: 1444,
        tolerance: 1,
        pdfRef: "Slide 144",
        explanation: "x · y = (2*3 + 3*4 + 4*5) = 6 + 12 + 20 = 38. K(x, y) = (38)² = 1444 (Slide 144)."
      },
      {
        id: "l4_q6",
        type: "num",
        question: "In the PlayTennis dataset (Slide 180), what is the base entropy H(S) for the 14 days with 9 positive and 5 negative examples?",
        correct: 0.940,
        tolerance: 0.01,
        pdfRef: "Slide 180",
        explanation: "H(S) = -(9/14)log₂(9/14) - (5/14)log₂(5/14) = 0.940 (Slide 180)."
      },
      {
        id: "l4_q7",
        type: "num",
        question: "In Slide 180, what is the calculated Information Gain for the Humidity attribute Gain(S, Humidity)?",
        correct: 0.151,
        tolerance: 0.005,
        pdfRef: "Slide 180",
        explanation: "Gain(S, Humidity) = 0.940 - (7/14)(0.985) - (7/14)(0.592) = 0.151 (Slide 180)."
      },
      {
        id: "l4_q8",
        type: "num",
        question: "What is the Gini index for a binary node where the probability of class 1 is p₁ = 0.5 and class 2 is p₂ = 0.5?",
        correct: 0.5,
        tolerance: 0.01,
        pdfRef: "Slide 181",
        explanation: "Gini = 1 - (p₁² + p₂²) = 1 - (0.5² + 0.5²) = 1 - (0.25 + 0.25) = 0.5 (Slide 181)."
      }
    ]
  },
  level5: {
    name: "Level 5: Exam-Style Multi-Mark Questions",
    description: "Rigorous exam formats including Matching, Short Answers (keyword-checked), and Multi-step questions.",
    questions: [
      {
        id: "l5_q1",
        type: "short_answer",
        marks: 3,
        question: "Define Support Vectors and Hyperplane in SVM. Why is it important to maximize the margin?",
        expectedKeywords: ["hyperplane", "decision boundary", "support vectors", "extreme points", "margin", "generalization", "overfitting"],
        minKeywordsMatch: 3,
        modelAnswer: "A Hyperplane is a decision boundary that segregates n-dimensional space into classes (w·x + b = 0). Support Vectors are the extreme data points closest to the hyperplane that determine its position. Maximizing the margin (distance 2/||w|| between classes) is crucial because a wider margin improves generalization capability and minimizes the risk of overfitting on unseen data (Slides 117, 128, 132)."
      },
      {
        id: "l5_q2",
        type: "short_answer",
        marks: 3,
        question: "Explain the Bias-Variance Tradeoff and state the formula for Total Prediction Error.",
        expectedKeywords: ["bias", "variance", "total error", "irreducible error", "underfitting", "overfitting", "complexity"],
        minKeywordsMatch: 3,
        modelAnswer: "Bias refers to error from overly simplistic assumptions, leading to underfitting. Variance refers to sensitivity to small fluctuations/noise in training data, leading to overfitting. Total Error = Bias² + Variance + Irreducible Error. As model complexity increases, bias decreases while variance increases, requiring an optimal balance to minimize test error (Slides 25-28)."
      },
      {
        id: "l5_q3",
        type: "short_answer",
        marks: 3,
        question: "Explain why the Naïve Bayes algorithm is called 'Naïve' and 'Bayes'.",
        expectedKeywords: ["naïve", "independent", "features", "bayes", "theorem", "conditional probability"],
        minKeywordsMatch: 3,
        modelAnswer: "It is called 'Naïve' because it assumes that the occurrence of each feature is completely independent of the occurrence of other features given the class. It is called 'Bayes' because it is built upon the mathematical principle of Bayes' Theorem of conditional probability (Slide 76-77)."
      },
      {
        id: "l5_q4",
        type: "mcq",
        question: "Which of the following formulas correctly represents the Gaussian Kernel from Slide 146?",
        options: [
          "k(x₁, xₙ) = e^(-γ ||x₁ - xₙ||²)",
          "k(x, y) = exp(-||x - y|| / σ)",
          "K(x₁, x₂) = (x₁ · x₂ + 1)ᵈ",
          "K(x, y) = x · y + c"
        ],
        correct: 0,
        pdfRef: "Slide 146",
        explanation: "Slide 146 specifically states: Gaussian Kernel: k(x₁, xₙ) = e^(-γ ||x₁ - xₙ||²)."
      },
      {
        id: "l5_q5",
        type: "mcq",
        question: "In Decision Trees, what is the key difference between ID3 and CART regarding attribute selection?",
        options: [
          "ID3 uses Gini Index, while CART uses Information Gain",
          "ID3 uses Information Gain (Entropy reduction), while CART uses Gini Index",
          "ID3 uses Euclidean distance, while CART uses Sigmoid loss",
          "ID3 handles regression only, while CART handles text only"
        ],
        correct: 1,
        pdfRef: "Slide 157, 169, 181",
        explanation: "Slide 157, 169, 181: ID3 uses Information Gain based on Entropy. CART uses the Gini Index."
      }
    ]
  }
};

// Exam Simulation Questions (20 comprehensive items covering all syllabus topics)
const EXAM_QUESTIONS = [
  {
    id: "ex_1",
    topicId: "intro_supervised",
    topicName: "Supervised Learning & Variables",
    question: "Which variable type has meaningful intervals between values but NO meaningful true zero point?",
    options: ["Categorical", "Interval variable", "Ratio variable", "Dummy variable"],
    correct: 1,
    explanation: "Interval variables have meaningful differences but no true zero (e.g. Temperature in Celsius — Slide 12)."
  },
  {
    id: "ex_2",
    topicId: "model_selection_bias_variance",
    topicName: "Model Selection & Bias-Variance",
    question: "What is the total prediction error equation in supervised learning according to Slide 27?",
    options: [
      "Total Error = Bias + Variance",
      "Total Error = Bias² + Variance + Irreducible Error",
      "Total Error = MSE / (1 - λ)",
      "Total Error = Entropy(S) - Information Gain"
    ],
    correct: 1,
    explanation: "Slide 27 gives: Total Error = Bias² + Variance + Irreducible Error."
  },
  {
    id: "ex_3",
    topicId: "linear_regression",
    topicName: "Linear Regression",
    question: "In Simple Linear Regression, how is the slope 'a' mathematically defined in Slide 39?",
    options: [
      "Σ(x_i - x̄)² / Σ(y_i - ȳ)²",
      "Σ(x_i - x̄)(y_i - ȳ) / Σ(x_i - x̄)²",
      "ȳ - a * x̄",
      "1 / (1 + e^-z)"
    ],
    correct: 1,
    explanation: "Slope a = Covariance(X, Y) / Variance(X) = Σ(x - x̄)(y - ȳ) / Σ(x - x̄)² (Slide 39)."
  },
  {
    id: "ex_4",
    topicId: "linear_regression",
    topicName: "Linear Regression",
    question: "Using the PDF regression dataset x=[1,2,3,4,5], y=[3,5,7,9,11], what is the regression equation?",
    options: ["y = 3x + 1", "y = 2x + 1", "y = x + 2", "y = 2x - 1"],
    correct: 1,
    explanation: "Slope a = 2, intercept b = 1, giving y = 2x + 1 (Slide 44)."
  },
  {
    id: "ex_5",
    topicId: "logistic_regression",
    topicName: "Logistic Regression",
    question: "In Logistic Regression, what is the role of the Sigmoid function?",
    options: [
      "It minimizes the Residual Sum of Squares directly",
      "It maps any real-valued number into a probability value between 0 and 1",
      "It prunes branches from decision trees",
      "It finds the maximum margin support vectors"
    ],
    correct: 1,
    explanation: "Slide 70: The sigmoid function maps any real value into another value within a range of 0 and 1."
  },
  {
    id: "ex_6",
    topicId: "logistic_regression",
    topicName: "Logistic Regression",
    question: "Given β₀ = -4 and β₁ = 0.8, what is the predicted outcome for X = 6 study hours at threshold 0.5?",
    options: [
      "Fail (P = 0.310)",
      "Pass (P = 0.690)",
      "Fail (P = 0.083)",
      "Pass (P = 0.982)"
    ],
    correct: 1,
    explanation: "z = -4 + 0.8(6) = 0.8. P = 1 / (1 + e^-0.8) ≈ 0.690 > 0.5 ➔ Pass (Slide 73)."
  },
  {
    id: "ex_7",
    topicId: "naive_bayes",
    topicName: "Naïve Bayes",
    question: "What core assumption makes Naïve Bayes 'naïve'?",
    options: [
      "It assumes the dataset is perfectly normally distributed",
      "It assumes all features are conditionally independent given the class label",
      "It assumes the classes are equally balanced",
      "It assumes zero training error"
    ],
    correct: 1,
    explanation: "Slide 76: Assumes occurrence of a feature is completely independent of other features."
  },
  {
    id: "ex_8",
    topicId: "naive_bayes",
    topicName: "Naïve Bayes",
    question: "In the Car Theft problem from Slide 89, what is the normalized probability of the Red SUV Domestic car NOT being stolen?",
    options: ["0.4 (40%)", "0.6 (60%)", "0.5 (50%)", "0.036 (3.6%)"],
    correct: 1,
    explanation: "P(Not Stolen) = 0.036 / (0.024 + 0.036) = 0.6 (60%) — Slide 89."
  },
  {
    id: "ex_9",
    topicId: "knn",
    topicName: "K-Nearest Neighbour",
    question: "Why is KNN described as a 'Lazy Learner' in Slide 101?",
    options: [
      "Because it runs slowly on small datasets",
      "Because it does not learn a discriminative model during training, but delays all computation until prediction time",
      "Because it only evaluates K=1 neighbor",
      "Because it ignores training labels"
    ],
    correct: 1,
    explanation: "KNN does not train explicit parameters; it simply stores training points and computes distances when queried."
  },
  {
    id: "ex_10",
    topicId: "knn",
    topicName: "K-Nearest Neighbour",
    question: "In the Iris dataset from Slide 114, for query (5.2, 3.1) with K = 5, what is the majority vote prediction?",
    options: ["Virginica", "Versicolor", "Setosa", "Undetermined Tie"],
    correct: 2,
    explanation: "Top 5 neighbors: 3 Setosa, 1 Versicolor, 1 Virginica ➔ Setosa wins majority vote (Slide 114)."
  },
  {
    id: "ex_11",
    topicId: "svm",
    topicName: "Support Vector Machine",
    question: "What is the margin between the two parallel bounding planes in a linear SVM with weight vector w?",
    options: ["||w||", "2 / ||w||", "1 / ||w||²", "w · x + b"],
    correct: 1,
    explanation: "The total margin width between w·x + b = 1 and w·x + b = -1 is 2 / ||w|| (Slide 132)."
  },
  {
    id: "ex_12",
    topicId: "svm",
    topicName: "Support Vector Machine",
    question: "In Lili Jiang's equation illustration (Slide 144), what is the scalar dot product result for x=(2,3,4) and y=(3,4,5) using K(x,y)=(x·y)²?",
    options: ["38", "576", "1444", "2048"],
    correct: 2,
    explanation: "x·y = 6 + 12 + 20 = 38. K(x,y) = 38² = 1444 (Slide 144)."
  },
  {
    id: "ex_13",
    topicId: "svm",
    topicName: "Support Vector Machine",
    question: "Which of the following is the Laplacian Kernel formula given in Slide 146?",
    options: [
      "k(x, y) = exp( - ||x - y|| / σ )",
      "k(x, y) = exp( - ||x - y|| / (2σ²) )",
      "k(x, y) = (x · y + 1)ᵈ",
      "k(x, y) = e^(-γ ||x - y||²)"
    ],
    correct: 0,
    explanation: "Slide 146 specifically gives: Laplacian Kernel: k(x, y) = exp( - ||x - y|| / σ )."
  },
  {
    id: "ex_14",
    topicId: "decision_trees",
    topicName: "Decision Trees",
    question: "What is the Entropy of a pure node where all instances belong to the exact same class?",
    options: ["1.0", "0.5", "0.0", "-1.0"],
    correct: 2,
    explanation: "Slide 163 & 167: Entropy is zero for pure nodes (no randomness/impurity)."
  },
  {
    id: "ex_15",
    topicId: "decision_trees",
    topicName: "Decision Trees",
    question: "In the PlayTennis dataset (Slide 180), why did ID3 choose Humidity over Wind at the root?",
    options: [
      "Because Humidity had lower Information Gain",
      "Because Humidity had higher Information Gain (0.151 vs 0.048)",
      "Because Wind had zero entropy",
      "Because Humidity had more missing values"
    ],
    correct: 1,
    explanation: "Gain(S, Humidity) = 0.151 > Gain(S, Wind) = 0.048, so ID3 chose Humidity (Slide 180)."
  },
  {
    id: "ex_16",
    topicId: "decision_trees",
    topicName: "Decision Trees",
    question: "What is the formula for the Gini Index used in the CART algorithm (Slide 181)?",
    options: [
      "Gini = - Σ p_i * log₂(p_i)",
      "Gini = 1 - Σ (p_i)²",
      "Gini = Σ |y - ŷ| / n",
      "Gini = 2 / ||w||"
    ],
    correct: 1,
    explanation: "Slide 181 explicitly gives: Gini = 1 - Σ (p_i)²."
  },
  {
    id: "ex_17",
    topicId: "random_forest_apps",
    topicName: "Random Forest & Ensembles",
    question: "According to Slide 182, which algorithm resolves the major overfitting disadvantage of Decision Trees?",
    options: ["Linear Regression", "Random Forest", "K-Means", "Univariate OLS"],
    correct: 1,
    explanation: "Slide 182: 'It may have an overfitting issue, which can be resolved using the Random Forest algorithm.'"
  },
  {
    id: "ex_18",
    topicId: "classification_types",
    topicName: "Classification Types",
    question: "For a 5-class classification problem, how many binary classifiers are trained under the One-versus-One (OvO) approach?",
    options: ["5", "10", "20", "25"],
    correct: 1,
    explanation: "Number of classifiers = N * (N - 1) / 2 = 5 * 4 / 2 = 10 (Slide 62)."
  },
  {
    id: "ex_19",
    topicId: "classification_types",
    topicName: "Classification Types",
    question: "In Multi-Label classification, how many labels can an input example possess?",
    options: [
      "Strictly 1 mutually exclusive label",
      "Strictly 2 binary labels",
      "Zero, one, or multiple labels simultaneously (non-mutually exclusive)",
      "Must have all classes active"
    ],
    correct: 2,
    explanation: "Slide 64: 'we try to predict 0 or more classes for each input example. In this case, there is no mutual exclusion.'"
  },
  {
    id: "ex_20",
    topicId: "nonlinear_regression",
    topicName: "Non-Linear Regression",
    question: "What is the general 2-variable quadratic polynomial regression equation given in Slide 55?",
    options: [
      "y = ax₁ + bx₂ + c",
      "y = a * x₁² + b * x₂² + c * x₁ * x₂ + d * x₁ + e * x₂ + f",
      "y = e^(ax₁ + bx₂)",
      "y = a * log(x₁) + b * log(x₂)"
    ],
    correct: 1,
    explanation: "Slide 55 explicitly lists: a * x1**2 + b * x2**2 + c * x1 * x2 + d * x1 + e * x2 + f."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUIZ_LEVELS, EXAM_QUESTIONS };
}
