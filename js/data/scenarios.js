// "Which Algorithm?" Active Recall Scenario Game
// Scenarios derived directly from applications, examples, and datasets in the PDF.

const SCENARIOS_DATA = [
  {
    id: 1,
    scenario: "You are building a system for a real estate agency to estimate the continuous market selling price of a house based on its square footage, number of rooms, and age.",
    options: ["Linear Regression", "Logistic Regression", "Naïve Bayes", "K-Means"],
    correctIndex: 0,
    pdfRef: "Slide 16, 33",
    explanation: "House price is a continuous numerical quantity (dependent variable Y). Linear Regression is specifically designed for predicting continuous quantities using predictor features X (Slide 33)."
  },
  {
    id: 2,
    scenario: "During the COVID-19 pandemic, a hospital specialist needs an algorithm that outputs the calibrated probability that a patient is COVID-19 positive (between 0% and 100%) based on clinical biomarkers and body temperature.",
    options: ["Linear Regression", "Logistic Regression", "ID3 Decision Tree", "K-Nearest Neighbour"],
    correctIndex: 1,
    pdfRef: "Slide 59, 67-72",
    explanation: "Predicting probability of a binary medical diagnosis (positive/negative) requires an S-curve that bounds outputs to [0, 1]. Logistic Regression uses the Sigmoid function to output calibrated probabilities (Slide 67, 72)."
  },
  {
    id: 3,
    scenario: "You have a massive dataset of 50,000 incoming customer emails and need an ultra-fast algorithm to classify each email as 'Spam' or 'Not Spam' based on word frequencies.",
    options: ["Naïve Bayes", "Non-linear Polynomial SVM", "K-Nearest Neighbour (KNN)", "Linear Regression"],
    correctIndex: 0,
    pdfRef: "Slide 75",
    explanation: "Naïve Bayes is celebrated for text and high-dimensional classification (spam filtration) because it calculates independent feature likelihoods instantly using simple frequency counts without expensive matrix operations (Slide 75)."
  },
  {
    id: 4,
    scenario: "You are inspecting 2D telemetry data where the faulty machine status is clustered in an inner circle, surrounded by a ring of normal status points. No straight line can separate them.",
    options: ["Linear Regression", "Non-linear SVM with Kernel Trick", "Linear SVM", "Univariate Logistic Regression"],
    correctIndex: 1,
    pdfRef: "Slide 133-144",
    explanation: "When data is non-linearly arranged (like concentric circles), Non-linear SVM uses the Kernel method (such as z = x² + y² or RBF kernel) to map data to a higher-dimensional space where it becomes linearly separable (Slide 134-142)."
  },
  {
    id: 5,
    scenario: "A botanist finds a new wild flower with Sepal Length = 5.2 and Sepal Width = 3.1. You want to classify its species immediately by identifying the 5 flowers in your historical database that are geometrically closest in measurement.",
    options: ["K-Nearest Neighbour (KNN)", "Linear Regression", "ID3 Decision Tree", "Multi-Label Gradient Boosting"],
    correctIndex: 0,
    pdfRef: "Slide 109-114",
    explanation: "This is the exact Iris flower problem from Slides 109-114! KNN computes Euclidean distances to find the K nearest neighbors and uses majority voting to classify the query instance."
  },
  {
    id: 6,
    scenario: "A sports academy wants a simple graphical flowchart with transparent if-then decision rules to decide whether Saturday morning conditions (Outlook, Humidity, Wind) are suitable for playing tennis.",
    options: ["Decision Tree (ID3)", "Support Vector Machine", "Logistic Regression", "Non-linear Regression"],
    correctIndex: 0,
    pdfRef: "Slide 155, 172-180",
    explanation: "This is Mitchell's classic PlayTennis concept from Slide 155. A Decision Tree provides a graphical hierarchical structure of if-then rules based on attribute selection measures like Information Gain."
  },
  {
    id: 7,
    scenario: "A commercial bank is deploying an automated credit scoring engine. However, the single Decision Tree currently in production keeps overfitting to historical noise and performs poorly on new applicants.",
    options: ["Random Forest", "Simple Linear Regression", "ID3 with no pruning", "Nearest Centroid"],
    correctIndex: 0,
    pdfRef: "Slide 182",
    explanation: "Slide 182 of the PDF explicitly states: 'The decision tree may have an overfitting issue, which can be resolved using the Random Forest algorithm.' Random Forest averages an ensemble of decorrelated trees to reduce variance."
  },
  {
    id: 8,
    scenario: "In an educational portal, students upload articles that can belong to multiple categories at the same time (e.g. an essay can simultaneously be tagged as 'Technology', 'Education', and 'Ethics').",
    options: ["Multi-Label Classification", "Binary Classification", "Multi-Class Classification", "Univariate Linear Regression"],
    correctIndex: 0,
    pdfRef: "Slide 64-65",
    explanation: "When an input example can possess zero, one, or multiple non-mutually exclusive category tags, it is strictly a Multi-Label Classification task (Slide 64). Multi-class requires mutual exclusivity."
  },
  {
    id: 9,
    scenario: "You are given two points x = (2, 3, 4) and y = (3, 4, 5). You need to compute their similarity in a 9-dimensional space, but you want to avoid expensive coordinate projections.",
    options: ["SVM Kernel Trick: K(x, y) = (x · y)²", "K-Nearest Neighbour", "Ordinary Least Squares", "One-versus-Rest Logistic"],
    correctIndex: 0,
    pdfRef: "Slide 143-144",
    explanation: "This is Lili Jiang's equation from Slide 144: K(x, y) = <f(x), f(y)> = (x · y)² = 38² = 1444, which computes the inner product directly in low dimensions without ever expanding into 9 dimensions!"
  },
  {
    id: 10,
    scenario: "A car insurance company provides you with a 10-row dataset detailing car color, vehicle type, and domestic/imported origin to predict if a Red SUV Domestic vehicle will be stolen.",
    options: ["Naïve Bayes Classifier", "Linear Regression", "Polynomial Basis Regression", "One-versus-One SVM"],
    correctIndex: 0,
    pdfRef: "Slide 83-90",
    explanation: "This is the exact Car Theft numerical problem from Slide 83-90! Naïve Bayes calculates priors P(Yes)=0.5, likelihoods, and normalized posterior 0.4 for Stolen vs 0.6 for Not Stolen."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCENARIOS_DATA };
}
