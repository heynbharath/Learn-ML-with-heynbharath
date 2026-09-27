// Complete Master Topic Database for ML Module 2
// Every topic strictly adheres to the requested A-K structure and preserves 100% PDF fidelity.

const TOPICS_DATA = [
  {
    id: "intro_supervised",
    title: "1. Introduction to Supervised Learning & Variable Types",
    category: "Fundamentals",
    pdfPages: "Pages 2-14",
    shortDesc: "Supervised learning concept, labeled training data, and the 6 essential variable types.",
    sections: {
      A_what: "Supervised Learning is the type of machine learning in which machines are trained with well 'Labeled' training data, and on the basis of that data, machines predict the output. The model learns a mapping function from input variables (features) to the target output label.",
      B_why: "We need supervised learning when we possess historical, ground-truth data with known outcomes and need an automated mathematical model to predict labels or quantities for novel, unseen inputs.",
      C_intuition: "Think of a student learning with a teacher: the teacher provides study problems along with verified answers. By reviewing both questions and answers, the student learns the general rules so they can solve new exam questions on their own.",
      D_how: "1. Collect previously recorded, labeled data.\\n2. Divide data into features and target labels.\\n3. Feed data into a learning algorithm to train a mathematical model.\\n4. Evaluate model accuracy.\\n5. Deploy model to predict outcomes on new, unlabeled data.",
      E_algorithm: [
        "Step 1: Collect historical dataset with labeled pairs (x, y).",
        "Step 2: Preprocess variables into appropriate formats (e.g. dummy encoding for categorical features).",
        "Step 3: Split dataset into Training Set and Testing Set.",
        "Step 4: Train learning algorithm by minimizing discrepancy between predicted output and true label.",
        "Step 5: Validate model performance on unseen test data."
      ],
      F_formula: `Mapping Function: y = f(x)
Where:
• x = Input vector of features (independent variables)
• y = Target output / label (dependent variable)
• f = Learned hypothesis function`,
      G_example: "Predicting whether an email is spam or ham based on past labeled emails, or predicting house price based on historical sales data of houses with known features (size, location, bedrooms).",
      H_visual: "Diagram from PDF (Slide 4 & 6): Training Data (Input + Desired Output) ➔ Learning Algorithm ➔ Model (Hypothesis) ➔ New Input Data ➔ Prediction.",
      I_examPoints: [
        "Supervised learning fundamentally requires LABELED data.",
        "The 6 Variable Types in the PDF MUST be memorized:",
        "1. Categorical: Distinct categories/labels with no natural ordering (e.g., Blood type A/B/AB/O, Marital status).",
        "2. Numerical: Quantities expressed as numbers; can be Discrete (counts, e.g. number of rooms) or Continuous (measurements, e.g. house price).",
        "3. Binary: Special case of categorical with exactly 2 possible outcomes (True/False, 0/1, Spam/Ham).",
        "4. Interval: Numerical with meaningful equal differences, but NO TRUE ZERO point (0 does NOT mean absence of quantity). Examples: Temperature in Celsius/Fahrenheit (0°C does not mean no temperature), Calendar Dates (Year 2000 vs 2020).",
        "5. Ratio: Numerical with a MEANINGFUL TRUE ZERO point allowing both differences and ratios. Examples: Weight (0 kg = no weight), Height (0 m = no height), Income ($0 = no income). 10 kg is twice 5 kg.",
        "6. Dummy Variables: Categorical variables converted into numerical binary form (typically 0 or 1) for ML models. Also known as 'One-Hot Encoding'. If Color has 3 categories (Red, Blue, Green), it converts to 3 dummy variables."
      ],
      J_confusion: "Interval vs Ratio variables: Interval has NO true zero (e.g., 0°C is just a point on a scale, not 'no heat'; 20°C is not 'twice as hot' as 10°C in absolute kinetic terms). Ratio HAS a true zero (0 kg means zero weight; 20 kg is strictly twice 10 kg).",
      K_recall: {
        question: "Why is Temperature in Celsius classified as an Interval variable rather than a Ratio variable?",
        answer: "Because 0°C does not represent the absolute absence of temperature (it is an arbitrary freezing point), so ratios cannot be calculated (20°C is not twice as hot as 10°C)."
      }
    }
  },
  {
    id: "ml_terminology",
    title: "2. Core ML Terminology & Framework",
    category: "Fundamentals",
    pdfPages: "Pages 15-18",
    shortDesc: "Training data, testing data, features, labels, models, hypotheses, loss functions, and optimization.",
    sections: {
      A_what: "The formal mathematical terminology defining every supervised machine learning system: training dataset, test dataset, features, labels, model, hypothesis, loss function, and optimization algorithm.",
      B_why: "Machine learning replaces manual hardcoded rule systems with mathematical optimization; standard terminology defines the inputs, learned components, and objective metrics.",
      C_intuition: "A model is an architecture (like a blank formula), a hypothesis is the specific formula tuned with trained weights, the loss function is the scorecard measuring mistakes, and the optimization algorithm is the coach iteratively correcting the mistakes.",
      D_how: "Features are fed into the hypothesis function to produce predictions. The loss function compares predictions against actual ground-truth labels. The optimization algorithm (such as Gradient Descent) computes derivatives and updates parameters to minimize loss.",
      E_algorithm: [
        "1. Training Data: (x_i, y_i) pairs used by algorithm to learn parameters.",
        "2. Testing Data: Independent unseen (x_test) pairs used strictly for unbiased evaluation (labels hidden during prediction).",
        "3. Features (Independent Variables / Predictors): Attributes used for prediction.",
        "4. Labels (Dependent Variable / Target / Output): The ground-truth answer.",
        "5. Model: The mathematical algorithm/structure (e.g. Linear Regression, SVM).",
        "6. Hypothesis: The specific parameter-instantiated function y = h(x).",
        "7. Loss Function: Quantifies prediction error (MSE for regression, Cross-Entropy for classification).",
        "8. Optimization: Gradient Descent adjusts parameters to reach minimum loss."
      ],
      F_formula: `Mean Squared Error (MSE):
MSE = (1/n) * Σ (y_i - ŷ_i)²

Hypothesis Function (e.g. Linear):
h_θ(x) = θ₀ + θ₁x₁ + ... + θₚxₚ`,
      G_example: "In house price prediction: Features = square footage, bedrooms, age. Label = actual house sale price ($350,000). Model = Linear Regression. Hypothesis = Price = 50,000 + 150*(sqft). Loss = MSE between actual and predicted prices.",
      H_visual: "Loss landscape curve showing parameter θ on X-axis and Loss on Y-axis with Gradient Descent stepping downhill toward the minimum point.",
      I_examPoints: [
        "Know the exact definitions from Slide 15-18:",
        "• Features = Independent variables, predictors.",
        "• Labels = Dependent variable, target, output.",
        "• Loss Function (Cost Function) = Measures how well predictions match actual labels.",
        "• MSE = Commonly used for regression tasks.",
        "• Cross-Entropy Loss = Commonly used for classification tasks.",
        "• Gradient Descent = Iteratively updates model parameters to minimize loss."
      ],
      J_confusion: "Model vs Hypothesis: 'Model' refers to the general class/family of algorithms (e.g., Linear Regression). 'Hypothesis' refers to the specific function with learned parameters selected from that hypothesis space (e.g., y = 2x + 1).",
      K_recall: {
        question: "Which loss function is specifically cited in the PDF as commonly used for classification tasks?",
        answer: "Cross-Entropy Loss (Slide 18)."
      }
    }
  },
  {
    id: "model_selection_bias_variance",
    title: "3. Model Selection, Complexity & Bias-Variance Tradeoff",
    category: "Theory & Evaluation",
    pdfPages: "Pages 19-30",
    shortDesc: "Smoothing parameters, overfitting, underfitting, bias, variance, and the total prediction error equation.",
    sections: {
      A_what: "Model selection is the process of choosing the best machine learning algorithm or complexity for a given problem to balance underfitting and overfitting using the Bias-Variance tradeoff.",
      B_why: "An overly simple model cannot capture true underlying relationships (underfitting), while an overly complex model memorizes noise and fails to generalize to new data (overfitting). We need proper model selection to minimize total test error.",
      C_intuition: "Underfitting is a student who never studied and guesses blindly (high bias). Overfitting is a student who memorized the exact textbook typos word-for-word and fails when questions change slightly (high variance). A well-balanced model understands the concepts and generalises well.",
      D_how: "Model complexity is controlled via smoothing parameters. As complexity increases, bias monotonically decreases while variance monotonically increases. Total prediction error reaches a minimum at an optimal complexity level.",
      E_algorithm: [
        "Step 1: Define hypothesis space and complexity settings.",
        "Step 2: Control complexity via Smoothing Parameters:",
        "   a) Regularization parameter (Multiplier of Penalty Term λ): penalizes large weights to keep model simple.",
        "   b) Width of the Kernel (Bandwidth σ or γ): controls influence range of each training point in kernel methods.",
        "   c) Number of Basis Functions: controls dimensionality of feature expansion.",
        "Step 3: Monitor training error vs test error.",
        "Step 4: Select model parameter where test error is minimized."
      ],
      F_formula: `Total Prediction Error Equation:
Total Error = Bias² + Variance + Irreducible Error

Where:
• Bias: Error due to overly simplistic assumptions.
• Variance: Model sensitivity to small fluctuations/noise in training data.
• Irreducible Error: Noise inherent in the data that cannot be eliminated.`,
      G_example: "Underfitting: A linear model assuming house price depends only on square footage, ignoring location and rooms. Overfitting: A high-degree polynomial that hits every training house price point perfectly but predicts negative or extreme prices on new houses.",
      H_visual: "Classic U-Curve (Slide 30): Training error decreases strictly towards zero as complexity rises. Test error starts high, decreases to an optimal valley (best model), then shoots up due to high variance.",
      I_examPoints: [
        "Total Error = Bias² + Variance + Irreducible Error (Slide 27).",
        "High Bias ➔ Underfitting (low complexity, overly simplistic assumptions, high training error, high test error).",
        "High Variance ➔ Overfitting (high complexity, pays too much attention to noise, low training error, HIGH test error).",
        "3 Smoothing/Complexity Parameters explicitly named in Slide 24:",
        "1. Multiplier of the Penalty Term (Regularization parameter).",
        "2. Width of the Kernel (Kernel Width / Bandwidth).",
        "3. Number of Basis Functions.",
        "'An algorithm cannot be more complex and less complex at the same time' (Slide 28)."
      ],
      J_confusion: "Bias vs Variance: Bias is an under-learning error (inflexible model misses the signal). Variance is an over-learning error (flexible model treats random noise as signal).",
      K_recall: {
        question: "State the complete formula for Total Prediction Error given in the PDF.",
        answer: "Total Error = Bias² + Variance + Irreducible Error."
      }
    }
  },
  {
    id: "linear_regression",
    title: "4. Linear Regression (Univariate, Multivariate & OLS)",
    category: "Regression",
    pdfPages: "Pages 31-50",
    shortDesc: "Ordinary Least Squares, slope/intercept formulas, residuals, RSS, MSE, and the PDF step-by-step numerical.",
    sections: {
      A_what: "Linear Regression assumes that the regression function E(Y|X) is linear in the inputs X₁, ..., Xₚ. It models the relationship between a continuous dependent variable (Y) and one or more independent predictor variables (X).",
      B_why: "It provides a mathematically interpretable, analytical benchmark for predicting real-valued continuous targets, such as house prices, salary, or stock trends.",
      C_intuition: "Drawing the single straight line through a 2D scatter of data points such that the vertical distances (residuals) from each point to the line are minimized.",
      D_how: "Ordinary Least Squares (OLS) minimizes the Residual Sum of Squares (RSS). The slope (a or β₁) is calculated as the covariance between X and Y divided by the variance of X. The intercept (b or β₀) is obtained by passing through the centroid (x̄, ȳ).",
      E_algorithm: [
        "Step 1: Calculate the mean of input x (x̄) and mean of output y (ȳ).",
        "Step 2: Calculate the slope a = Σ(x_i - x̄)(y_i - ȳ) / Σ(x_i - x̄)².",
        "Step 3: Calculate the intercept b = ȳ - a * x̄.",
        "Step 4: Form regression equation ŷ = ax + b.",
        "Step 5: Compute predictions, residuals (y_i - ŷ_i), RSS = Σ(y_i - ŷ_i)², and MSE = RSS / n."
      ],
      F_formula: `Univariate Linear Regression:
Y = β₀ + β₁X + ε

Multivariate Linear Regression:
Y = β₀ + β₁X₁ + β₂X₂ + ... + βₚXₚ + ε

Slope (a):
a = Σ(x_i - x̄)(y_i - ȳ) / Σ(x_i - x̄)²

Intercept (b):
b = ȳ - a * x̄

Residual Sum of Squares (RSS):
RSS = Σ(y_i - ŷ_i)²`,
      G_example: `PDF Numerical Example (Slides 41-46):
Dataset:
x: [1, 2, 3, 4, 5]
y: [3, 5, 7, 9, 11]

Step 1: Means:
x̄ = (1+2+3+4+5)/5 = 3
ȳ = (3+5+7+9+11)/5 = 7

Step 2: Slope a:
Numerator = Σ(x - x̄)(y - ȳ) = (-2)(-4) + (-1)(-2) + (0)(0) + (1)(2) + (2)(4) = 8 + 2 + 0 + 2 + 8 = 20
Denominator = Σ(x - x̄)² = (-2)² + (-1)² + 0² + 1² + 2² = 4 + 1 + 0 + 1 + 4 = 10
a = 20 / 10 = 2

Step 3: Intercept b:
b = ȳ - a*x̄ = 7 - (2 * 3) = 7 - 6 = 1

Regression Line: y = 2x + 1
Prediction for x = 6: y = 2(6) + 1 = 13
Residuals: All points fall perfectly on line, RSS = 0.`,
      H_visual: "Scatter plot with data points, fitted line y = 2x + 1, and dashed vertical line segments depicting residuals (y - ŷ).",
      I_examPoints: [
        "Univariate = exactly 1 independent variable: Y = β₀ + β₁X + ε.",
        "Multivariate (Multiple) = p > 1 inputs: Y = β₀ + β₁X₁ + ... + βₚXₚ + ε (Slide 48-49).",
        "βᵢ are the regression coefficients ('weights') learned during optimization.",
        "ε is the irreducible error collecting all unmodeled noise.",
        "Slope formula represents Covariance(X, Y) / Variance(X).",
        "Be ready to compute the exact numerical table from Slide 41-46 in 5 marks!"
      ],
      J_confusion: "Univariate vs Multivariate: Univariate has ONE feature X. Multivariate has multiple features X₁, X₂, ..., Xₚ. Both produce a continuous scalar prediction Y.",
      K_recall: {
        question: "In simple linear regression, what is the formula to calculate the intercept 'b' after finding slope 'a'?",
        answer: "b = ȳ - a * x̄ (Slide 40)."
      }
    }
  },
  {
    id: "nonlinear_regression",
    title: "5. Non-Linear Regression",
    category: "Regression",
    pdfPages: "Pages 51-56",
    shortDesc: "Polynomial, exponential, and logarithmic regression forms when linear assumptions fail.",
    sections: {
      A_what: "Non-linear regression is used when the relationship between the dependent and independent variables is not linear. The regression function can take many forms: polynomial, exponential, logarithmic, etc.",
      B_why: "Real-world physical, biological, and economic relationships frequently saturate, accelerate exponentially, or exhibit parabolic curvature where straight lines fail catastrophically.",
      C_intuition: "If you shoot an arrow or model population growth, the trajectory curves. Fitting a straight line is foolish; you need a curved function like a parabola or exponential curve.",
      D_how: "Features are transformed using polynomial powers or non-linear basis functions (e.g. x², x₁x₂), or parameters are estimated iteratively using non-linear least squares.",
      E_algorithm: [
        "1. Plot data and check for non-linear patterns (curvature, saturation).",
        "2. Choose candidate non-linear model family (polynomial, exponential, log).",
        "3. Formulate equation (e.g. 2nd degree polynomial: y = a*x₁² + b*x₂² + c*x₁x₂ + d*x₁ + e*x₂ + f).",
        "4. Estimate coefficients to minimize residual sum of squares.",
        "5. Evaluate goodness of fit and avoid overfitting high polynomial degrees."
      ],
      F_formula: `Polynomial Regression Form (PDF Slide 55):
y = a*x₁² + b*x₂² + c*x₁x₂ + d*x₁ + e*x₂ + f

Other forms (Slide 51):
• Exponential: y = a * e^(bx)
• Logarithmic: y = a + b * ln(x)`,
      G_example: "Modeling crop growth over time: growth starts slow, accelerates exponentially, and eventually plateaus due to soil capacity.",
      H_visual: "Curved polynomial and exponential curves fitting dispersed non-linear data points where a straight linear line would have huge residual errors.",
      I_examPoints: [
        "Know the exact polynomial equation from Slide 55: a*x₁² + b*x₂² + c*x₁x₂ + d*x₁ + e*x₂ + f.",
        "Used when relationship between dependent and independent variables is NOT linear.",
        "Function forms cited in PDF: Exponential, Polynomial, Logarithmic."
      ],
      J_confusion: "Polynomial regression is linear in parameters (coefficients a, b, c), but non-linear in features (x², x₁x₂).",
      K_recall: {
        question: "Name three non-linear regression function forms explicitly listed in Slide 51.",
        answer: "Exponential, Polynomial, and Logarithmic."
      }
    }
  },
  {
    id: "classification_types",
    title: "6. Classification Fundamentals, Types & Real-Life Applications",
    category: "Classification",
    pdfPages: "Pages 57-66",
    shortDesc: "Binary, Multi-Class (OvR vs OvO), Multi-Label classification, and COVID/Agri/Edu applications.",
    sections: {
      A_what: "Classification is a supervised machine learning method where the model predicts the correct discrete category or label of input data. The model is trained on labeled training data, evaluated on test data, and used for unseen prediction.",
      B_why: "Many decision problems in medicine, security, vision, and NLP are inherently discrete (e.g., diseased vs healthy, spam vs ham).",
      C_intuition: "Sorting incoming mail into 2 boxes (Spam or Not Spam) or sorting fruit into 3 bins (Apples, Oranges, Bananas) or tagging a photo with tags (Beach, Sunset, Family).",
      D_how: "The feature space is partitioned into decision regions separated by decision boundaries. The classification strategy depends on whether labels are binary, multi-class (mutually exclusive), or multi-label (overlapping).",
      E_algorithm: [
        "1. Binary Classification: Exactly 2 mutually exclusive classes (0/1, True/False). Native: Logistic Regression, SVM.",
        "2. Multi-Class Classification: >2 mutually exclusive classes. Algorithms: Random Forest, Naive Bayes, KNN. Native binary classifiers use:",
        "   a) One-versus-Rest (OvR / OvA): N classes ➔ N binary classifiers (each class vs all others).",
        "   b) One-versus-One (OvO): N classes ➔ N(N - 1) / 2 classifiers (one for every pair). Majority vote decides. Works best for SVM and kernel methods!",
        "3. Multi-Label Classification: 0 or more classes per sample (non-mutually exclusive). Uses specialized versions: Multi-label Decision Trees, Multi-label Random Forests, Multi-label Gradient Boosting."
      ],
      F_formula: `One-versus-One Classifier Count (Slide 62):
Number of Classifiers = N * (N - 1) / 2

One-versus-Rest Classifier Count (Slide 63):
Number of Classifiers = N`,
      G_example: `Real-Life Applications cited in PDF (Slide 59):
1. Healthcare: COVID-19 diagnosis prediction from patient symptoms/data.
2. Education: Document classification per category using NLP.
3. Sustainable Agriculture: Predicting which land type is suitable for specific seed types.`,
      H_visual: "Comparison matrix showing Binary (2 classes), Multi-class (1 of N classes), and Multi-label (multiple non-exclusive tags per instance).",
      I_examPoints: [
        "Binary: 2 mutually exclusive classes (Spam/Ham, Truck/Boat). Native: Logistic Regression & SVM.",
        "Multi-class: ≥2 mutually exclusive classes. Native binary classifiers adapted via OvR (N models) or OvO (N*(N-1)/2 models).",
        "OvO works BEST for SVM and kernel methods (Slide 62).",
        "Multi-label: 0 or more classes per sample; NOT mutually exclusive. Example: auto-tagging in NLP, image with multiple objects.",
        "Standard binary or multi-class models CANNOT perform multi-label tasks directly; must use specialized Multi-label DT/RF/GB (Slide 65)."
      ],
      J_confusion: "Multi-Class vs Multi-Label: Multi-class means an example belongs to EXACTLY ONE of N classes (mutually exclusive). Multi-label means an example can belong to MULTIPLE classes simultaneously (e.g. a blog post tagged with 'AI', 'Tech', and 'Python').",
      K_recall: {
        question: "For a 4-class problem, how many binary classifiers are trained under the One-versus-One (OvO) strategy?",
        answer: "4 * (4 - 1) / 2 = 6 binary classifiers (Slide 62)."
      }
    }
  },
  {
    id: "logistic_regression",
    title: "7. Logistic Regression & Sigmoid Function",
    category: "Classification",
    pdfPages: "Pages 67-74",
    shortDesc: "S-shaped sigmoid function, linear score mapping, decision threshold, and the Study Hours solved exam problem.",
    sections: {
      A_what: "Logistic Regression is a supervised learning classification technique used to predict the categorical dependent variable using a given set of independent variables by modeling probability via the Sigmoid (logistic) function.",
      B_why: "Standard linear regression predictions can exceed [0, 1] (producing meaningless negative probabilities or probabilities > 1). Logistic regression maps any real value into the valid probability range [0, 1].",
      C_intuition: "We compute a linear score z = β₀ + β₁X, then squeeze it through an S-shaped funnel (the sigmoid curve) so that extreme negative scores approach 0% and extreme positive scores approach 100%.",
      D_how: "1. Calculate linear score z = β₀ + β₁X.\\n2. Pass z through sigmoid: P = 1 / (1 + e^-z).\\n3. Compare P with threshold (default 0.5): If P > 0.5 ➔ Class 1, else Class 0.",
      E_algorithm: [
        "Step 1: Model Setup: P(Y=1|X) = 1 / (1 + e^-(β₀ + β₁X)).",
        "Step 2: Estimate parameters β₀, β₁ using Maximum Likelihood Estimation (MLE).",
        "Step 3: For novel input X, compute z = β₀ + β₁X.",
        "Step 4: Compute probability P = 1 / (1 + e^-z).",
        "Step 5: Apply decision threshold (0.5) to assign final class (Pass/Fail)."
      ],
      F_formula: `Logistic (Sigmoid) Function:
P(Y = 1 | X) = 1 / (1 + e^(-z))

Where linear score:
z = β₀ + β₁X

Decision Rule (Threshold = 0.5):
If P(Y = 1 | X) > 0.5 ➔ Predict Y = 1 (Pass)
Otherwise ➔ Predict Y = 0 (Fail)`,
      G_example: `PDF Numerical Example (Slides 72-74):
Model parameters: β₀ = -4, β₁ = 0.8 (Predicting Exam Pass from Study Hours X)

1. For X = 2:
   z = -4 + 0.8(2) = -2.4
   P = 1 / (1 + e^2.4) = 1 / (1 + 11.02) = 0.083 ➔ Fail (0)

2. For X = 4:
   z = -4 + 0.8(4) = -0.8
   P = 1 / (1 + e^0.8) = 1 / (1 + 2.23) = 0.310 ➔ Fail (0)

3. For X = 6:
   z = -4 + 0.8(6) = +0.8
   P = 1 / (1 + e^-0.8) = 1 / (1 + 0.45) = 0.690 ➔ Pass (1)

4. For X = 8:
   z = -4 + 0.8(8) = +2.4
   P = 1 / (1 + e^-2.4) = 1 / (1 + 0.09) = 0.916 ➔ Pass (1)

5. For X = 10:
   z = -4 + 0.8(10) = +4.0
   P = 1 / (1 + e^-4.0) = 1 / (1 + 0.018) = 0.982 ➔ Pass (1)`,
      H_visual: "S-shaped Sigmoid curve starting at 0 for negative z, crossing 0.5 at z = 0 (X = 5 hours), and plateauing at 1 for positive z.",
      I_examPoints: [
        "Logistic regression is a CLASSIFICATION technique, despite the name 'Regression'.",
        "Sigmoid maps any real-valued number into [0, 1].",
        "Parameters β are estimated via Maximum Likelihood Estimation (MLE), NOT OLS (Slide 72).",
        "Threshold defines the probability boundary (default 0.5).",
        "Be ready to reproduce the X=2,4,6,8,10 study hours numerical step-by-step!"
      ],
      J_confusion: "Linear Regression vs Logistic Regression: Linear regression outputs continuous unbounded values y ∈ (-∞, ∞). Logistic regression outputs bounded probabilities P ∈ [0, 1] for categorical outcomes.",
      K_recall: {
        question: "With β₀ = -4 and β₁ = 0.8, what is the predicted outcome for a student studying X = 6 hours at threshold 0.5?",
        answer: "z = -4 + 0.8(6) = 0.8, P = 0.690. Since 0.690 > 0.5, the prediction is Pass (1)."
      }
    }
  },
  {
    id: "naive_bayes",
    title: "8. Naïve Bayes Classifier (Binary & Multi-Class)",
    category: "Classification",
    pdfPages: "Pages 75-100",
    shortDesc: "Bayes Theorem, feature independence assumption, Car Theft dataset, and Multi-Class solved numericals.",
    sections: {
      A_what: "Naïve Bayes is a supervised probabilistic classification algorithm based on Bayes' Theorem with the 'naïve' assumption of conditional independence among all features given the class label.",
      B_why: "It is exceptionally fast, highly scalable for high-dimensional text data, and performs remarkably well in spam filtration, sentiment analysis, and article categorization even with modest training data.",
      C_intuition: "Why 'Naïve'? If an apple is identified by being Red, Round, and Sweet, Naïve Bayes assumes each feature contributes independently to the probability of being an apple, ignoring that round fruits might correlate with sweetness.",
      D_how: "1. Convert training data into frequency tables.\\n2. Generate likelihood tables for each feature value given each class.\\n3. Multiply prior probability by all feature likelihoods.\\n4. Normalize to obtain posterior probabilities and select the class with maximum posterior (MAP).",
      E_algorithm: [
        "Step 1: Calculate Prior Probability P(C_i) for each class.",
        "Step 2: Calculate Likelihood P(x_j | C_i) for each feature given each class.",
        "Step 3: Combine: Unnormalized Posterior ∝ P(C_i) * Π P(x_j | C_i).",
        "Step 4: Normalize (optional for decision, needed for true probability): divide by sum across all classes.",
        "Step 5: Predict class with highest posterior probability."
      ],
      F_formula: `Bayes' Theorem (Slide 77-78):
P(A | B) = [P(B | A) * P(A)] / P(B)

Where:
• P(A | B): Posterior probability (probability of hypothesis A given observed event B)
• P(B | A): Likelihood probability (probability of evidence given hypothesis is true)
• P(A): Prior probability (probability of hypothesis before observing evidence)
• P(B): Marginal probability / Evidence

Multi-Feature Naïve Bayes Formula (Slide 84, 94):
P(y | x₁,...,xₙ) = [P(y) * Π P(x_j | y)] / P(x₁,...,xₙ)`,
      G_example: `PDF Numerical Example 1: Car Theft Dataset (Slide 83-89)
10 Training examples (5 Stolen=Yes, 5 Stolen=No)
Query: Color = Red, Type = SUV, Origin = Domestic

Priors:
P(Yes) = 5/10 = 0.5, P(No) = 5/10 = 0.5

Likelihoods:
P(Red | Yes) = 3/5 = 0.6 | P(Red | No) = 2/5 = 0.4
P(SUV | Yes) = 1/5 = 0.2 | P(SUV | No) = 3/5 = 0.6
P(Domestic | Yes) = 2/5 = 0.4 | P(Domestic | No) = 3/5 = 0.6

Unnormalized Posteriors:
• Yes: 0.5 * 0.6 * 0.2 * 0.4 = 0.024
• No:  0.5 * 0.4 * 0.6 * 0.6 = 0.036

Normalized Probabilities:
P(Stolen | Query) = 0.024 / (0.024 + 0.036) = 0.4 (40%)
P(Not Stolen | Query) = 0.036 / (0.024 + 0.036) = 0.6 (60%)
Conclusion: Vehicle is predicted NOT STOLEN!`,
      H_visual: "Frequency table to likelihood table pipeline leading to multiplied evidence and normalized percentage bar comparing Stolen (40%) vs Not Stolen (60%).",
      I_examPoints: [
        "Why 'Naïve'? Assumes occurrence of a feature is completely independent of other features (Slide 76).",
        "Why 'Bayes'? Based on Bayes' Theorem of conditional probability (Slide 76-77).",
        "Popular applications in PDF: Spam filtration, Sentiment analysis, Classifying articles (Slide 75).",
        "For continuous features: Use probability distribution (like Gaussian) using mean and variance (Slide 95).",
        "Denominator P(X) can be ignored when ranking classes because it is identical for all classes (Slide 93).",
        "Car Theft 10-row dataset and Red SUV Domestic query are frequent exam favorites!"
      ],
      J_confusion: "Likelihood vs Posterior: Likelihood P(X|C) is the probability of observing feature values given a specific class. Posterior P(C|X) is the probability that the instance belongs to that class after seeing the features.",
      K_recall: {
        question: "In the Car Theft problem from the PDF, what is the normalized probability of the car NOT being stolen for a Red, SUV, Domestic car?",
        answer: "0.6 (or 60%) — Slides 89-90."
      }
    }
  },
  {
    id: "knn",
    title: "9. K-Nearest Neighbour (KNN)",
    category: "Classification",
    pdfPages: "Pages 101-115",
    shortDesc: "Lazy learner, non-parametric method, Euclidean distance, choosing K, Cat vs Dog, and Iris 15-sample numerical.",
    sections: {
      A_what: "K-Nearest Neighbour (KNN) is one of the simplest supervised machine learning algorithms that stores all available cases and classifies new cases based on similarity measure (distance functions).",
      B_why: "It makes zero assumptions about underlying data distribution (non-parametric), requires no explicit training phase (lazy learner), and adapts naturally to multi-class problems.",
      C_intuition: "'Birds of a feather flock together'. If you want to know if a mysterious animal is a cat or a dog, find the K animals closest to it in appearance and take a vote.",
      D_how: "1. Store training points.\\n2. For an unknown point, compute distance to all stored points using Euclidean distance.\\n3. Sort distances in ascending order.\\n4. Take the top K closest points.\\n5. Assign the class with majority vote.",
      E_algorithm: [
        "Step 1: Select the number K of neighbours.",
        "Step 2: Calculate the Euclidean distance between query point and all training data points.",
        "Step 3: Take the K nearest neighbours as per the calculated Euclidean distance.",
        "Step 4: Count the number of data points in each category among these neighbours.",
        "Step 5: Assign the new data point to the category with the highest count (majority vote)."
      ],
      F_formula: `Euclidean Distance Formula (Slide 106):
d(P₁, P₂) = √[ (x₂ - x₁)² + (y₂ - y₁)² ]

For n dimensions:
d(p, q) = √[ Σ(p_i - q_i)² ]`,
      G_example: `PDF Numerical Example: Iris Flower Classification (Slides 109-114)
15 training instances with Sepal Length and Sepal Width (Setosa, Versicolor, Virginica).
Query instance: Sepal Length = 5.2, Sepal Width = 3.1

Top Nearest Neighbours by Euclidean distance:
1. (5.1, 3.3) Setosa      ➔ Distance = 0.22  (Rank 1)
2. (5.4, 3.4) Setosa      ➔ Distance = 0.36  (Rank 2)
3. (5.1, 2.5) Versicolor  ➔ Distance = 0.60  (Rank 4)
4. (5.3, 3.7) Setosa      ➔ Distance = 0.608 (Rank 3)
5. (5.8, 2.8) Virginica   ➔ Distance = 0.67  (Rank 5)

Decision for different K:
• If k = 1 ➔ Setosa
• If k = 2 ➔ Setosa
• If k = 5 ➔ 3 Setosa, 1 Versicolor, 1 Virginica ➔ Setosa wins majority vote!`,
      H_visual: "2D plane showing Category A and Category B clusters, a green unknown query point, a circle encompassing the K=5 nearest neighbours, and voting breakdown.",
      I_examPoints: [
        "KNN is a Non-Parametric algorithm (makes no assumptions on data distribution) — Slide 101.",
        "KNN is a Lazy Learner (does not learn during training; stores data and computes at query time) — Slide 101.",
        "How to choose K (Slide 115):",
        "• No single magic formula; must test via validation.",
        "• Most preferred value is K = 5.",
        "• Choose ODD value of K to prevent tie situations in binary classification.",
        "• Very small K (e.g. K=1) is sensitive to noise and outliers (overfitting).",
        "• Very large K leads to underfitting and smooths away boundaries."
      ],
      J_confusion: "Parametric vs Non-Parametric: Linear Regression and Logistic Regression are parametric (fixed number of parameters β). KNN is non-parametric (parameters grow with dataset size).",
      K_recall: {
        question: "Why should K usually be an odd number in binary classification?",
        answer: "To avoid tie votes between the two classes (Slide 115)."
      }
    }
  },
  {
    id: "svm",
    title: "10. Support Vector Machine (Linear & Non-Linear Kernels)",
    category: "Classification",
    pdfPages: "Pages 116-147",
    shortDesc: "Hyperplane, support vectors, maximal margin, 2D to 3D mapping, Lili Jiang Kernel equation (1444), and 5 kernel types.",
    sections: {
      A_what: "Support Vector Machine (SVM) is a powerful supervised learning algorithm that creates the optimal decision boundary (hyperplane) that segregates n-dimensional space into classes with maximum margin.",
      B_why: "Maximizing the margin ensures the greatest distance between classes, which maximizes generalization capability and minimizes risk of overfitting on unseen test data.",
      C_intuition: "Imagine two rival countries building a demilitarized border. Instead of drawing a fence right up against one side's camp, you place the border exactly halfway between the extreme outposts (support vectors), making the buffer zone (margin) as wide as possible.",
      D_how: "1. For linearly separable data: Find hyperplane w·x + b = 0 such that margin 2/||w|| is maximized.\\n2. For non-linear data: Use Kernel Method to project points into higher dimensions (e.g. z = x² + y²) where they become linearly separable, without computing higher-dimensional coordinates directly (Kernel Trick).",
      E_algorithm: [
        "Step 1: Identify extreme training points on the boundary edges (Support Vectors).",
        "Step 2: Construct parallel bounding hyperplanes: w·x + b = 1 and w·x + b = -1.",
        "Step 3: Distance between margin planes is 2 / ||w||.",
        "Step 4: Solve convex optimization: Minimize (1/2)||w||² subject to y_i(w·x_i + b) ≥ 1.",
        "Step 5: If non-linear, apply Kernel Function K(x, y) = <f(x), f(y)>."
      ],
      F_formula: `Hyperplane Equation:
w · x + b = 0

Margin Width:
Margin = 2 / ||w||

Lili Jiang's Kernel Equation (Slide 143):
K(x, y) = < f(x), f(y) >

5 Kernel Methods in PDF (Slides 145-146):
1. Linear Kernel:      K(x₁, x₂) = x₁ · x₂
2. Polynomial Kernel:  K(x₁, x₂) = (x₁ · x₂ + 1)ᵈ
3. Gaussian (RBF):     k(x₁, xₙ) = e^(-γ ||x₁ - xₙ||²)
4. Exponential Kernel: k(x, y) = exp( - ||x - y|| / (2σ²) )
5. Laplacian Kernel:   k(x, y) = exp( - ||x - y|| / σ )`,
      G_example: `Lili Jiang's Kernel Numerical Illustration (Slide 144):
Two points: x = (2, 3, 4) and y = (3, 4, 5)

Direct 9-dimensional mapping f(x):
f(x) = (x₁x₁, x₁x₂, x₁x₃, x₂x₁, x₂x₂, x₂x₃, x₃x₁, x₃x₂, x₃x₃)
f(2, 3, 4) = (4, 6, 8, 6, 9, 12, 8, 12, 16)
f(3, 4, 5) = (9, 12, 15, 12, 16, 20, 15, 20, 25)

Dot product in 9D:
f(x) · f(y) = 36 + 72 + 120 + 72 + 144 + 240 + 120 + 240 + 400 = 1444

Using Kernel Function:
K(x, y) = (x · y)² = (2*3 + 3*4 + 4*5)² = (6 + 12 + 20)² = (38)² = 1444!
Same result, but kernel avoids heavy 9D projections!`,
      H_visual: "Diagram from Slide 134-135: 2D concentric circles transformed to 3D parabolic bowl via z = x² + y², where a flat 2D plane cuts cleanly between inner and outer classes.",
      I_examPoints: [
        "Hyperplane: Decision boundary. In 2D it is a line, in 3D a plane, in n-D a hyperplane (Slide 128).",
        "Support Vectors: Extreme data points/vectors closest to the hyperplane that determine margin and boundary position (Slide 117, 128).",
        "Margin: Distance between support vectors and hyperplane; must be maximized (Slide 132).",
        "2D to 3D transformation equation in Slide 134: z = x² + y².",
        "Lili Jiang's equation: K(x, y) = <f(x), f(y)> (Slide 143).",
        "Be ready to reproduce the x=(2,3,4), y=(3,4,5) calculation giving 1444 (Slide 144)!",
        "5 Kernel formulas must be memorized: Linear, Polynomial, Gaussian, Exponential, Laplacian (Slide 145-146)."
      ],
      J_confusion: "Kernel Method vs Kernel Trick: The Kernel Method is the conceptual approach of mapping data to higher dimensions to achieve linear separation. The Kernel TRICK is the mathematical identity that allows computing the inner product directly in low-dimensional space without ever actually transforming coordinates.",
      K_recall: {
        question: "In Lili Jiang's kernel example with x=(2,3,4) and y=(3,4,5) using K(x,y)=(x·y)², what is the final calculated scalar value?",
        answer: "1444 (because (6 + 12 + 20)² = 38² = 1444) — Slide 144."
      }
    }
  },
  {
    id: "decision_trees",
    title: "11. Decision Trees (ID3, CART, Entropy, Information Gain, Gini & Pruning)",
    category: "Trees & Ensembles",
    pdfPages: "Pages 148-187",
    shortDesc: "Tree anatomy, ID3 vs CART, Entropy, Information Gain, PlayTennis 14-day calculations, Gini index, and Pruning.",
    sections: {
      A_what: "A Decision Tree is a graphical representation for getting all possible solutions to a decision based on given conditions. It splits data recursively based on attribute selection measures.",
      B_why: "It mimics human decision-making, requires minimal data cleaning, handles both numerical and categorical data, and produces highly interpretable if-then decision rules.",
      C_intuition: "A 20-Questions game: each question (attribute test) cuts down uncertainty until you reach a confident conclusion (leaf node). The best question is the one that removes the most confusion (highest information gain).",
      D_how: "Start at root with entire dataset. For every attribute, compute impurity reduction (Information Gain in ID3, Gini Index in CART). Split on best attribute. Repeat recursively on subsets until stopping criteria or pure leaf nodes are reached.",
      E_algorithm: [
        "ID3 Algorithm Steps (Slide 158):",
        "Step 1: Calculate Entropy for dataset H(S).",
        "Step 2: For each attribute A, calculate Entropy of all split subsets and find Information Gain Gain(S, A).",
        "Step 3: Pick attribute with LARGEST Information Gain as the decision node.",
        "Step 4: Branch on each value of this attribute.",
        "Step 5: Repeat recursively until all samples at a node belong to same class (pure node, Entropy = 0)."
      ],
      F_formula: `Entropy Formula (Slide 162):
H(S) = - Σ [ p_i * log₂(p_i) ]

Information Gain Formula (Slide 170):
Gain(S, A) = Entropy(S) - Σ [ (|S_v| / |S|) * Entropy(S_v) ]

Gini Index Formula (Slide 181):
Gini = 1 - Σ (p_i)²

Gini ranges from 0 (pure node) to (1 - 1/n) (maximum impurity).`,
      G_example: `PlayTennis Mitchell 14-Day Dataset (Slides 156, 172-180):
S: [9 Yes (+), 5 No (-)], Total = 14
Base Entropy:
H(S) = -(9/14)log₂(9/14) - (5/14)log₂(5/14) = 0.940

Comparing Attributes:
1. Humidity:
   • High (7 days: [3+, 4-]): Entropy = 0.985
   • Normal (7 days: [6+, 1-]): Entropy = 0.592
   Gain(S, Humidity) = 0.940 - (7/14)(0.985) - (7/14)(0.592) = 0.151

2. Wind:
   • Weak (8 days: [6+, 2-]): Entropy = 0.811
   • Strong (6 days: [3+, 3-]): Entropy = 1.00
   Gain(S, Wind) = 0.940 - (8/14)(0.811) - (6/14)(1.00) = 0.048

Conclusion: Humidity provides greater information gain (0.151 > 0.048), so Humidity is chosen as the superior split classifier!`,
      H_visual: "Decision tree structure from Slide 151 showing Root Node, Decision Nodes, Sub-trees, and Leaf (Terminal) Nodes, alongside unpruned vs pruned loan tree from Slide 187.",
      I_examPoints: [
        "Tree Anatomy (Slide 151): Root Node, Decision Node, Leaf Node (terminal, no further split), Sub-Tree (branch).",
        "Tree Algorithms (Slide 157): ID3 (uses Information Gain), C4.5 (successor of ID3, uses Gain Ratio), CART (Classification & Regression Tree, uses Gini Index), CHAID, MARS.",
        "Entropy is 0 when all examples belong to same class (pure node). Entropy is maximum (1.0) when p = 0.5 (Slide 163, 167).",
        "Information Gain is decrease in entropy (Slide 169).",
        "Gini Index formula: 1 - Σ p_i² (Slide 181).",
        "Overfitting & Pruning (Slide 183-186):",
        "• Fully grown trees adapt too much to noise ➔ Overfitting.",
        "• Solution: Pruning (trimming branches starting from leaf nodes without harming accuracy).",
        "• 2 Pruning techniques in Slide 185: Cost Complexity Pruning and Reduced Error Pruning.",
        "• Pruning uses segregated Training set D and Validation set V (Slide 186)."
      ],
      J_confusion: "ID3 vs CART: ID3 uses Entropy & Information Gain; creates multi-way splits for categorical variables. CART uses Gini Index; always builds binary splits and supports both classification and regression.",
      K_recall: {
        question: "In the PlayTennis dataset, between Humidity (Gain = 0.151) and Wind (Gain = 0.048), which attribute does ID3 choose and why?",
        answer: "Humidity, because ID3 always selects the attribute with the HIGHEST Information Gain (Slide 180)."
      }
    }
  },
  {
    id: "random_forest_apps",
    title: "12. Random Forest & Real-World Module Applications",
    category: "Trees & Ensembles",
    pdfPages: "Pages 2, 61, 65, 182",
    shortDesc: "Ensemble learning, resolving DT overfitting, and the 4 syllabus application domains.",
    sections: {
      A_what: "Random Forest is an ensemble supervised machine learning algorithm that constructs a multitude of decision trees during training and outputs the mode of classes (classification) or mean prediction (regression) of individual trees.",
      B_why: "As noted in Slide 182 of the PDF: 'The decision tree may have an overfitting issue, which can be resolved using the Random Forest algorithm.' Random Forest reduces high variance without increasing bias.",
      C_intuition: "Wisdom of the crowd: A single expert (one tree) can be biased or make mistakes. A council of 100 diverse experts (a forest) voting independently will almost always beat any single decision tree.",
      D_how: "1. Bootstrap Aggregation (Bagging): Randomly sample training subsets with replacement.\\n2. Random Feature Subsets: At each split, select from a random subset of features.\\n3. Grow deep trees without pruning.\\n4. Aggregate votes of all trees.",
      E_algorithm: [
        "Step 1: Given training set of size N, draw B bootstrap samples of size N with replacement.",
        "Step 2: For each bootstrap sample, train a decision tree.",
        "Step 3: At each candidate split, randomly select m < M features.",
        "Step 4: Pick best split among those m features.",
        "Step 5: Output majority vote across all B trees."
      ],
      F_formula: `Classification Vote:
ŷ = mode( T₁(x), T₂(x), ..., T_B(x) )

Variance Reduction:
Var(Average) = ρ * σ² + [(1 - ρ)/B] * σ²
(Decorrelated trees reduce variance significantly as B increases)`,
      G_example: "Predicting financial risk in loan approval: A single tree might overfit to an applicant's age or occupation; a forest averages over 100 trees with different feature subsets to produce robust credit scoring.",
      H_visual: "Architecture diagram showing training data split into B bootstrap datasets ➔ Tree 1, Tree 2, ..., Tree B ➔ Majority Voting ➔ Final Robust Prediction.",
      I_examPoints: [
        "Syllabus explicitly specifies: Decision Trees (ID3, CART) and Random Forest (Slide 2).",
        "Slide 182 explicitly mentions: 'Overfitting issue of Decision Tree can be resolved using the Random Forest algorithm.'",
        "Random Forest natively supports Multi-class and Multi-label classification (Slide 61, 65).",
        "4 Specific Application Domains from Syllabus (Slide 2):",
        "1. House price prediction systems (Linear / Non-linear regression).",
        "2. Medical diagnosis systems (COVID-19 classification, healthcare).",
        "3. Fault detection in machines (SVM / Binary classification).",
        "4. Financial risk prediction (Decision Trees / Random Forest / Bank loan approval)."
      ],
      J_confusion: "Decision Tree vs Random Forest: Decision Tree is a single tree, highly interpretable, but prone to high variance and overfitting. Random Forest is an ensemble of trees, acts as a black box, but dramatically reduces variance and error.",
      K_recall: {
        question: "According to Slide 182 of the PDF, what major disadvantage of Decision Trees is resolved by using Random Forest?",
        answer: "The overfitting issue of decision trees."
      }
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TOPICS_DATA };
}
