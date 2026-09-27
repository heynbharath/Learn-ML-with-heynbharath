// Interactive Comparison Matrices Database
// Faithful to PDF distinctions and terminology.

const COMPARISONS_DATA = [
  {
    id: "linear_vs_logistic",
    title: "Linear Regression vs Logistic Regression",
    pdfRef: "Slides 31-50, 67-74",
    headers: ["Attribute", "Linear Regression", "Logistic Regression"],
    rows: [
      {
        attribute: "Task Type",
        col1: "Regression (predicting continuous quantities)",
        col2: "Classification (predicting categorical classes / probabilities)"
      },
      {
        attribute: "Dependent Variable (Y)",
        col1: "Continuous numerical values (-∞ to +∞)",
        col2: "Categorical / Binary (0 or 1, Pass/Fail, Yes/No)"
      },
      {
        attribute: "Mathematical Model",
        col1: "Straight line / hyperplane: Y = β₀ + β₁X + ε",
        col2: "S-shaped Sigmoid curve: P = 1 / (1 + e^-(β₀ + β₁X))"
      },
      {
        attribute: "Output Range",
        col1: "Unbounded real numbers: (-∞, +∞)",
        col2: "Strictly bounded probability: [0, 1]"
      },
      {
        attribute: "Parameter Estimation",
        col1: "Ordinary Least Squares (OLS) minimizing RSS",
        col2: "Maximum Likelihood Estimation (MLE)"
      },
      {
        attribute: "Decision Boundary",
        col1: "Continuous fitted trend line",
        col2: "Threshold value (default 0.5) defining classification boundary"
      },
      {
        attribute: "PDF Example",
        col1: "Predicting house price based on square footage (Slide 33, 41)",
        col2: "Predicting whether student passes exam based on study hours (Slide 72)"
      }
    ]
  },
  {
    id: "id3_vs_cart",
    title: "ID3 vs CART Decision Tree Algorithms",
    pdfRef: "Slides 157-182",
    headers: ["Feature / Dimension", "ID3 (Iterative Dichotomiser 3)", "CART (Classification and Regression Trees)"],
    rows: [
      {
        attribute: "Full Name & Origin",
        col1: "Iterative Dichotomiser 3 (extension of D3 by Quinlan, Slide 157)",
        col2: "Classification And Regression Tree (Breiman et al., Slide 157)"
      },
      {
        attribute: "Splitting Metric",
        col1: "Information Gain (Entropy reduction: H(S) - Σ (|S_v|/|S|) H(S_v))",
        col2: "Gini Index / Gini Impurity (1 - Σ p_i²)"
      },
      {
        attribute: "Tree Structure / Split Type",
        col1: "Multi-way splits (one branch for each categorical attribute value)",
        col2: "Strictly binary splits (always creates exactly 2 child nodes per split)"
      },
      {
        attribute: "Target Variable Support",
        col1: "Primarily categorical classification tasks",
        col2: "Both Classification and Regression tasks"
      },
      {
        attribute: "Continuous Attribute Handling",
        col1: "Requires discretization (native ID3 handles categorical attributes)",
        col2: "Natively handles continuous attributes via dynamic threshold search"
      },
      {
        attribute: "Impurity Range",
        col1: "Entropy ranges from 0 (pure) to 1.0 (binary 50/50) or log₂(k)",
        col2: "Gini ranges from 0 (pure) to 0.5 (binary 50/50) or (1 - 1/k)"
      },
      {
        attribute: "PDF Example",
        col1: "PlayTennis dataset: Humidity Gain 0.151 vs Wind Gain 0.048 (Slide 180)",
        col2: "Gini Index calculation: Gini = 1 - Σ p_i² (Slide 181)"
      }
    ]
  },
  {
    id: "dt_vs_rf",
    title: "Decision Tree vs Random Forest",
    pdfRef: "Slides 148-187, Slide 182",
    headers: ["Characteristic", "Decision Tree", "Random Forest"],
    rows: [
      {
        attribute: "Model Architecture",
        col1: "Single hierarchical tree structure",
        col2: "Ensemble of dozens or hundreds of independent decision trees"
      },
      {
        attribute: "Interpretability",
        col1: "High ('white box'): follows human reasoning with transparent if-then rules",
        col2: "Low ('black box'): aggregate of many trees cannot be easily traced manually"
      },
      {
        attribute: "Variance & Overfitting",
        col1: "Prone to high variance and overfitting to noise (Slide 182)",
        col2: "Dramatically reduces variance by averaging decorrelated trees (Slide 182)"
      },
      {
        attribute: "Need for Pruning",
        col1: "Requires pruning (Cost Complexity or Reduced Error) to control tree size",
        col2: "Trees are deliberately grown deep without pruning"
      },
      {
        attribute: "Computational Speed",
        col1: "Fast training and instant single-tree prediction",
        col2: "Computationally heavier during training and prediction"
      },
      {
        attribute: "Feature Selection",
        col1: "Evaluates all candidate features at each split",
        col2: "Randomly samples a subset of m < M features at each split"
      },
      {
        attribute: "PDF Connection",
        col1: "Slide 182: 'The decision tree may have an overfitting issue...'",
        col2: "Slide 182: '...which can be resolved using the Random Forest algorithm.'"
      }
    ]
  },
  {
    id: "knn_vs_svm",
    title: "K-Nearest Neighbour (KNN) vs Support Vector Machine (SVM)",
    pdfRef: "Slides 101-115, 116-147",
    headers: ["Parameter", "K-Nearest Neighbour (KNN)", "Support Vector Machine (SVM)"],
    rows: [
      {
        attribute: "Learning Philosophy",
        col1: "Lazy Learner (instance-based, no explicit training phase)",
        col2: "Eager Learner (computes optimal global hyperplane during training)"
      },
      {
        attribute: "Parametric Nature",
        col1: "Non-parametric (no fixed parameter weights; data is the model)",
        col2: "Parametric in dual space (determined by support vectors & weights w, b)"
      },
      {
        attribute: "Decision Mechanism",
        col1: "Local similarity (majority vote of K nearest neighbours by Euclidean distance)",
        col2: "Global maximal margin hyperplane separating classes: w·x + b = 0"
      },
      {
        attribute: "Data Points Used at Test Time",
        col1: "MUST compare query point against ALL training points in memory",
        col2: "Only depends on the extreme Support Vectors; non-support points are ignored"
      },
      {
        attribute: "High-Dimensional Performance",
        col1: "Degrades rapidly due to curse of dimensionality (distance metrics collapse)",
        col2: "Excels in high dimensions; kernel trick projects to infinite dimensions safely"
      },
      {
        attribute: "Multi-Class Support",
        col1: "Natively handles multi-class via simple plurality voting",
        col2: "Natively binary; adapted to multi-class via OvO (works best) or OvR (Slide 62)"
      },
      {
        attribute: "PDF Examples",
        col1: "Cat vs Dog (Slide 102), Iris flower 15 samples (Slide 109-114)",
        col2: "Face detection, text categorization, image classification (Slide 119)"
      }
    ]
  },
  {
    id: "linear_svm_vs_nonlinear_svm",
    title: "Linear SVM vs Non-linear SVM",
    pdfRef: "Slides 129-147",
    headers: ["Criterion", "Linear SVM", "Non-linear SVM"],
    rows: [
      {
        attribute: "Data Separability",
        col1: "Linearly separable data in original input space",
        col2: "Non-linearly separable data (e.g. concentric circles or interleaved shapes)"
      },
      {
        attribute: "Decision Boundary Form",
        col1: "Straight flat hyperplane: w·x + b = 0 (straight line in 2D, flat plane in 3D)",
        col2: "Curved, non-linear boundary in input space; flat hyperplane in higher feature space"
      },
      {
        attribute: "Dimensional Transformation",
        col1: "Operates directly in original n-dimensional input space without transformation",
        col2: "Transforms data to higher dimensions (e.g., 2D to 3D via z = x² + y², Slide 134)"
      },
      {
        attribute: "Kernel Used",
        col1: "Linear kernel: K(x₁, x₂) = x₁ · x₂",
        col2: "Polynomial, Gaussian (RBF), Exponential, or Laplacian kernels (Slide 145-146)"
      },
      {
        attribute: "Computational Complexity",
        col1: "Fast, linear complexity proportional to feature dimension",
        col2: "Higher computational complexity; relies on the Kernel Trick to avoid 9D+ mapping"
      },
      {
        attribute: "PDF Core Example",
        col1: "Separating two distinct linearly spaced point clusters in 2D (Slide 131)",
        col2: "Lili Jiang's equation with x=(2,3,4), y=(3,4,5) yielding 1444 (Slide 144)"
      }
    ]
  },
  {
    id: "classification_vs_regression",
    title: "Classification vs Regression",
    pdfRef: "Slides 7-8, 57-58",
    headers: ["Feature", "Classification", "Regression"],
    rows: [
      {
        attribute: "Goal",
        col1: "Predicting discrete class labels or categories (Slide 7, 57)",
        col2: "Predicting continuous numerical quantities (Slide 7, 31)"
      },
      {
        attribute: "Output Variable (Y)",
        col1: "Categorical / Discrete (Spam/Ham, Positive/Negative, Disease Yes/No)",
        col2: "Continuous real numbers (House price, Salary, Temperature, Weight)"
      },
      {
        attribute: "Evaluation Metrics",
        col1: "Accuracy, Precision, Recall, F1-Score, Cross-Entropy Loss",
        col2: "Mean Squared Error (MSE), Root MSE (RMSE), Residual Sum of Squares (RSS)"
      },
      {
        attribute: "Decision Nature",
        col1: "Decision boundary dividing feature space into distinct regions",
        col2: "Fitted mathematical curve or surface estimating conditional expectation E(Y|X)"
      },
      {
        attribute: "Representative Algorithms",
        col1: "Logistic Regression, Naive Bayes, Decision Trees, KNN, SVM, Random Forest",
        col2: "Linear Regression, Non-linear Regression (Polynomial/Exponential), Tree Regressors"
      },
      {
        attribute: "PDF Examples",
        col1: "Spam vs Ham, COVID-19 diagnosis, Defective parts, PlayTennis",
        col2: "House price prediction ($290,000 baseline, Slide 33), Sales forecasting"
      }
    ]
  },
  {
    id: "binary_vs_multiclass_vs_multilabel",
    title: "Binary vs Multi-Class vs Multi-Label Classification",
    pdfRef: "Slides 60-66",
    headers: ["Dimension", "Binary Classification", "Multi-Class Classification", "Multi-Label Classification"],
    rows: [
      {
        attribute: "Number of Classes",
        col1: "Exactly 2 classes (mutually exclusive)",
        col2: "Three or more classes (≥ 3, mutually exclusive)",
        col3: "Two or more classes (NON-mutually exclusive)"
      },
      {
        attribute: "Labels Assigned per Sample",
        col1: "Exactly 1 label (0 or 1)",
        col2: "Exactly 1 label from N options",
        col3: "Zero, one, or multiple labels simultaneously"
      },
      {
        attribute: "Mutual Exclusion",
        col1: "Yes (Being Spam excludes Not Spam)",
        col2: "Yes (Being an Apple excludes being an Orange)",
        col3: "NO mutual exclusion (An article can be 'AI' AND 'Healthcare')"
      },
      {
        attribute: "Native Algorithms",
        col1: "Logistic Regression, SVM (Slide 60)",
        col2: "Naive Bayes, KNN, Random Forest (Slide 61)",
        col3: "Multi-label Decision Trees, Multi-label RF, Multi-label GB (Slide 65)"
      },
      {
        attribute: "Binary Adaptation",
        col1: "Direct native support",
        col2: "Adapted via One-vs-Rest (N models) or One-vs-One (N(N-1)/2 models) (Slide 62-63)",
        col3: "Standard binary/multi-class models CANNOT be used directly (Slide 65)"
      },
      {
        attribute: "PDF Examples",
        col1: "Spam vs Ham, Truck vs Boat (Slide 60)",
        col2: "Plane vs Car vs Truck (Slide 61), Iris 3 species (Slide 109)",
        col3: "Auto-tagging topics in NLP, multiple objects in image (Slide 64)"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COMPARISONS_DATA };
}
