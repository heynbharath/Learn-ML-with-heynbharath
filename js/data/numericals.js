// Dedicated Step-by-Step Progressive Numerical Practice Lab
// Extracted with 100% fidelity from the PDF examples.

const NUMERICAL_PROBLEMS = [
  {
    id: "linear_regression",
    title: "Linear Regression: OLS Slope, Intercept & Prediction",
    pdfRef: "Slides 41-46",
    scenario: "Given the training dataset from the PDF with 5 observations, derive the linear regression equation y = ax + b and predict y for x = 6.",
    dataset: [
      { x: 1, y: 3 },
      { x: 2, y: 5 },
      { x: 3, y: 7 },
      { x: 4, y: 9 },
      { x: 5, y: 11 }
    ],
    steps: [
      {
        stepNum: 1,
        title: "Step 1: Calculate the Mean of X (x̄) and Mean of Y (ȳ)",
        instruction: "Find the mean of x = [1, 2, 3, 4, 5] and y = [3, 5, 7, 9, 11].",
        fields: [
          { id: "x_mean", label: "Mean of X (x̄)", expected: 3, tolerance: 0.01 },
          { id: "y_mean", label: "Mean of Y (ȳ)", expected: 7, tolerance: 0.01 }
        ],
        hint: "x̄ = (1+2+3+4+5)/5 and ȳ = (3+5+7+9+11)/5.",
        solutionExplanation: "x̄ = 15 / 5 = 3. ȳ = 35 / 5 = 7 (Slide 42)."
      },
      {
        stepNum: 2,
        title: "Step 2: Calculate the Covariance Numerator Σ(x_i - x̄)(y_i - ȳ)",
        instruction: "Compute the sum of products of deviations for all 5 points: Σ(x_i - 3)(y_i - 7).",
        fields: [
          { id: "numerator", label: "Numerator Σ(x - x̄)(y - ȳ)", expected: 20, tolerance: 0.1 }
        ],
        hint: "(-2)(-4) + (-1)(-2) + (0)(0) + (1)(2) + (2)(4) = 8 + 2 + 0 + 2 + 8.",
        solutionExplanation: "Numerator = 8 + 2 + 0 + 2 + 8 = 20 (Slide 43)."
      },
      {
        stepNum: 3,
        title: "Step 3: Calculate the Variance Denominator Σ(x_i - x̄)²",
        instruction: "Compute the sum of squared deviations of X: Σ(x_i - 3)².",
        fields: [
          { id: "denominator", label: "Denominator Σ(x - x̄)²", expected: 10, tolerance: 0.1 }
        ],
        hint: "(-2)² + (-1)² + (0)² + (1)² + (2)² = 4 + 1 + 0 + 1 + 4.",
        solutionExplanation: "Denominator = 4 + 1 + 0 + 1 + 4 = 10 (Slide 43)."
      },
      {
        stepNum: 4,
        title: "Step 4: Calculate Slope (a) and Intercept (b)",
        instruction: "Compute slope a = Numerator / Denominator, and intercept b = ȳ - a * x̄.",
        fields: [
          { id: "slope", label: "Slope (a)", expected: 2, tolerance: 0.01 },
          { id: "intercept", label: "Intercept (b)", expected: 1, tolerance: 0.01 }
        ],
        hint: "a = 20 / 10 = 2. b = 7 - (2 * 3).",
        solutionExplanation: "a = 20 / 10 = 2. b = 7 - 6 = 1. The equation is y = 2x + 1 (Slide 43-44)."
      },
      {
        stepNum: 5,
        title: "Step 5: Predict Y for a New Value X = 6",
        instruction: "Substitute x = 6 into your regression equation y = 2x + 1 to find the predicted output.",
        fields: [
          { id: "pred_y", label: "Predicted y for x = 6", expected: 13, tolerance: 0.1 }
        ],
        hint: "y = 2(6) + 1.",
        solutionExplanation: "y = 2(6) + 1 = 12 + 1 = 13 (Slide 46)."
      },
      {
        stepNum: 6,
        title: "Step 6: Residual Sum of Squares (RSS)",
        instruction: "What is the Residual Sum of Squares (RSS) for this training dataset?",
        fields: [
          { id: "rss", label: "RSS = Σ(y_i - ŷ_i)²", expected: 0, tolerance: 0.01 }
        ],
        hint: "Every single training point falls exactly on the line y = 2x + 1! ŷ = [3, 5, 7, 9, 11].",
        solutionExplanation: "Actual y matches predicted ŷ exactly for all 5 points. RSS = 0² + 0² + 0² + 0² + 0² = 0 (Slide 45)."
      }
    ]
  },
  {
    id: "logistic_regression",
    title: "Logistic Regression: Sigmoid Probabilities & Exam Passing",
    pdfRef: "Slides 72-74",
    scenario: "Given the model parameters β₀ = -4 and β₁ = 0.8 from the PDF, predict the probability of passing the exam for different study hours X, using threshold = 0.5.",
    dataset: [
      { x: 2, desc: "2 Study Hours" },
      { x: 6, desc: "6 Study Hours" },
      { x: 10, desc: "10 Study Hours" }
    ],
    steps: [
      {
        stepNum: 1,
        title: "Step 1: Compute Linear Score (z) and Probability for X = 2 Hours",
        instruction: "Calculate linear score z = -4 + 0.8(2), and probability P(Y=1|X=2) = 1 / (1 + e^-z). Round P to 3 decimals.",
        fields: [
          { id: "z_2", label: "Linear score z for X = 2", expected: -2.4, tolerance: 0.05 },
          { id: "p_2", label: "Probability P(Y=1|X=2)", expected: 0.083, tolerance: 0.01 }
        ],
        hint: "z = -4 + 1.6 = -2.4. P = 1 / (1 + e^2.4) = 1 / (1 + 11.023).",
        solutionExplanation: "z = -2.4, P = 1 / 12.023 ≈ 0.083. Since 0.083 < 0.5, this is classified as FAIL (Slide 73)."
      },
      {
        stepNum: 2,
        title: "Step 2: Compute Linear Score (z) and Probability for X = 6 Hours",
        instruction: "Calculate linear score z = -4 + 0.8(6), and probability P(Y=1|X=6). Round P to 3 decimals.",
        fields: [
          { id: "z_6", label: "Linear score z for X = 6", expected: 0.8, tolerance: 0.05 },
          { id: "p_6", label: "Probability P(Y=1|X=6)", expected: 0.690, tolerance: 0.01 }
        ],
        hint: "z = -4 + 4.8 = +0.8. P = 1 / (1 + e^-0.8) = 1 / (1 + 0.4493).",
        solutionExplanation: "z = 0.8, P = 1 / 1.449 ≈ 0.690. Since 0.690 > 0.5, this is classified as PASS (Slide 73)."
      },
      {
        stepNum: 3,
        title: "Step 3: Compute Linear Score (z) and Probability for X = 10 Hours",
        instruction: "Calculate linear score z = -4 + 0.8(10), and probability P(Y=1|X=10). Round P to 3 decimals.",
        fields: [
          { id: "z_10", label: "Linear score z for X = 10", expected: 4.0, tolerance: 0.05 },
          { id: "p_10", label: "Probability P(Y=1|X=10)", expected: 0.982, tolerance: 0.01 }
        ],
        hint: "z = -4 + 8.0 = 4.0. P = 1 / (1 + e^-4.0) = 1 / (1 + 0.0183).",
        solutionExplanation: "z = 4.0, P = 1 / 1.0183 ≈ 0.982. High confidence PASS (Slide 74)."
      },
      {
        stepNum: 4,
        title: "Step 4: Determine the Decision Boundary Study Hours (X*)",
        instruction: "At what exact value of study hours X does the predicted probability equal exactly 0.5 (i.e. z = 0)?",
        fields: [
          { id: "x_boundary", label: "Study Hours where P = 0.5", expected: 5, tolerance: 0.05 }
        ],
        hint: "Set z = 0: -4 + 0.8X = 0 ➔ 0.8X = 4.",
        solutionExplanation: "X* = 4 / 0.8 = 5 hours. Exactly 5 hours is the 50/50 decision boundary!"
      }
    ]
  },
  {
    id: "naive_bayes",
    title: "Naïve Bayes: Car Theft Classification Problem",
    pdfRef: "Slides 83-90",
    scenario: "Given the 10 training cars in the PDF (5 Stolen=Yes, 5 Stolen=No), classify a new vehicle with: Color = Red, Type = SUV, Origin = Domestic.",
    dataset: [
      { ex: 1, color: "Red", type: "Sports", origin: "Domestic", stolen: "Yes" },
      { ex: 2, color: "Red", type: "Sports", origin: "Domestic", stolen: "No" },
      { ex: 3, color: "Red", type: "Sports", origin: "Domestic", stolen: "Yes" },
      { ex: 4, color: "Yellow", type: "Sports", origin: "Domestic", stolen: "No" },
      { ex: 5, color: "Yellow", type: "Sports", origin: "Imported", stolen: "Yes" },
      { ex: 6, color: "Yellow", type: "SUV", origin: "Imported", stolen: "No" },
      { ex: 7, color: "Yellow", type: "SUV", origin: "Imported", stolen: "Yes" },
      { ex: 8, color: "Yellow", type: "SUV", origin: "Domestic", stolen: "No" },
      { ex: 9, color: "Red", type: "SUV", origin: "Imported", stolen: "No" },
      { ex: 10, color: "Red", type: "Sports", origin: "Imported", stolen: "Yes" }
    ],
    steps: [
      {
        stepNum: 1,
        title: "Step 1: Calculate Class Prior Probabilities P(Yes) and P(No)",
        instruction: "Out of 10 examples, 5 were stolen and 5 were not.",
        fields: [
          { id: "p_yes", label: "P(Stolen = Yes)", expected: 0.5, tolerance: 0.01 },
          { id: "p_no", label: "P(Stolen = No)", expected: 0.5, tolerance: 0.01 }
        ],
        hint: "5/10 and 5/10.",
        solutionExplanation: "P(Yes) = 5/10 = 0.5, P(No) = 5/10 = 0.5 (Slide 85)."
      },
      {
        stepNum: 2,
        title: "Step 2: Calculate Likelihoods for Stolen = Yes",
        instruction: "For the 5 Stolen=Yes cars, calculate P(Red|Yes), P(SUV|Yes), and P(Domestic|Yes).",
        fields: [
          { id: "p_red_yes", label: "P(Color=Red | Yes)", expected: 0.6, tolerance: 0.01 },
          { id: "p_suv_yes", label: "P(Type=SUV | Yes)", expected: 0.2, tolerance: 0.01 },
          { id: "p_dom_yes", label: "P(Origin=Domestic | Yes)", expected: 0.4, tolerance: 0.01 }
        ],
        hint: "Red: Ex 1, 3, 10 (3/5). SUV: Ex 7 (1/5). Domestic: Ex 1, 3 (2/5).",
        solutionExplanation: "P(Red|Yes)=3/5=0.6, P(SUV|Yes)=1/5=0.2, P(Domestic|Yes)=2/5=0.4 (Slide 86-88)."
      },
      {
        stepNum: 3,
        title: "Step 3: Calculate Likelihoods for Stolen = No",
        instruction: "For the 5 Stolen=No cars, calculate P(Red|No), P(SUV|No), and P(Domestic|No).",
        fields: [
          { id: "p_red_no", label: "P(Color=Red | No)", expected: 0.4, tolerance: 0.01 },
          { id: "p_suv_no", label: "P(Type=SUV | No)", expected: 0.6, tolerance: 0.01 },
          { id: "p_dom_no", label: "P(Origin=Domestic | No)", expected: 0.6, tolerance: 0.01 }
        ],
        hint: "Red: Ex 2, 9 (2/5). SUV: Ex 6, 8, 9 (3/5). Domestic: Ex 2, 4, 8 (3/5).",
        solutionExplanation: "P(Red|No)=2/5=0.4, P(SUV|No)=3/5=0.6, P(Domestic|No)=3/5=0.6 (Slide 86-88)."
      },
      {
        stepNum: 4,
        title: "Step 4: Compute Unnormalized Posteriors",
        instruction: "Compute P(Yes)*P(Red|Yes)*P(SUV|Yes)*P(Domestic|Yes) and P(No)*P(Red|No)*P(SUV|No)*P(Domestic|No).",
        fields: [
          { id: "unnorm_yes", label: "Unnormalized P(Yes|X)", expected: 0.024, tolerance: 0.001 },
          { id: "unnorm_no", label: "Unnormalized P(No|X)", expected: 0.036, tolerance: 0.001 }
        ],
        hint: "Yes: 0.5 * 0.6 * 0.2 * 0.4. No: 0.5 * 0.4 * 0.6 * 0.6.",
        solutionExplanation: "Unnormalized Yes = 0.024. Unnormalized No = 0.036 (Slide 89)."
      },
      {
        stepNum: 5,
        title: "Step 5: Normalize and Make Final Decision",
        instruction: "Normalize: P(Stolen|Query) = 0.024 / (0.024 + 0.036) and P(Not Stolen|Query) = 0.036 / (0.024 + 0.036).",
        fields: [
          { id: "norm_stolen", label: "P(Stolen | Red, SUV, Domestic)", expected: 0.4, tolerance: 0.01 },
          { id: "norm_not_stolen", label: "P(Not Stolen | Red, SUV, Domestic)", expected: 0.6, tolerance: 0.01 }
        ],
        hint: "0.024 / 0.060 = 0.4 (40%), 0.036 / 0.060 = 0.6 (60%).",
        solutionExplanation: "The car is predicted NOT STOLEN with 60% probability (Slide 89-90)!"
      }
    ]
  },
  {
    id: "knn",
    title: "K-Nearest Neighbour: Iris Flower Distance Ranking & Voting",
    pdfRef: "Slides 109-114",
    scenario: "Given the Iris training instances in the PDF, classify the query flower: Sepal Length = 5.2, Sepal Width = 3.1.",
    dataset: [
      { id: 1, sl: 5.3, sw: 3.7, sp: "Setosa" },
      { id: 2, sl: 5.1, sw: 3.8, sp: "Setosa" },
      { id: 3, sl: 7.2, sw: 3.0, sp: "Virginica" },
      { id: 4, sl: 5.4, sw: 3.4, sp: "Setosa" },
      { id: 5, sl: 5.1, sw: 3.3, sp: "Setosa" },
      { id: 6, sl: 5.4, sw: 3.9, sp: "Setosa" },
      { id: 7, sl: 7.4, sw: 2.8, sp: "Virginica" },
      { id: 8, sl: 6.1, sw: 2.8, sp: "Versicolor" },
      { id: 9, sl: 7.3, sw: 2.9, sp: "Virginica" },
      { id: 10, sl: 6.0, sw: 2.7, sp: "Versicolor" },
      { id: 11, sl: 5.8, sw: 2.8, sp: "Virginica" },
      { id: 12, sl: 6.3, sw: 2.3, sp: "Versicolor" },
      { id: 13, sl: 5.1, sw: 2.5, sp: "Versicolor" },
      { id: 14, sl: 6.3, sw: 2.5, sp: "Versicolor" },
      { id: 15, sl: 5.5, sw: 2.4, sp: "Versicolor" }
    ],
    steps: [
      {
        stepNum: 1,
        title: "Step 1: Calculate Distance to Instance 5 (5.1, 3.3, Setosa)",
        instruction: "Compute Euclidean distance between query (5.2, 3.1) and (5.1, 3.3). Round to 3 decimals.",
        fields: [
          { id: "d_inst5", label: "Distance to Instance 5", expected: 0.224, tolerance: 0.01 }
        ],
        hint: "√[ (5.1 - 5.2)² + (3.3 - 3.1)² ] = √[ (-0.1)² + (0.2)² ] = √[ 0.01 + 0.04 ] = √0.05.",
        solutionExplanation: "Distance = √0.05 ≈ 0.224 (Rank 1 closest point) — Slide 112, 114."
      },
      {
        stepNum: 2,
        title: "Step 2: Calculate Distance to Instance 4 (5.4, 3.4, Setosa)",
        instruction: "Compute Euclidean distance between query (5.2, 3.1) and (5.4, 3.4). Round to 3 decimals.",
        fields: [
          { id: "d_inst4", label: "Distance to Instance 4", expected: 0.361, tolerance: 0.01 }
        ],
        hint: "√[ (5.4 - 5.2)² + (3.4 - 3.1)² ] = √[ (0.2)² + (0.3)² ] = √[ 0.04 + 0.09 ] = √0.13.",
        solutionExplanation: "Distance = √0.13 ≈ 0.361 (Rank 2 closest point) — Slide 112, 114."
      },
      {
        stepNum: 3,
        title: "Step 3: Identify the Top 5 Nearest Neighbours Species",
        instruction: "Looking at the distances from Slide 114: Rank 1 (0.22, Setosa), Rank 2 (0.36, Setosa), Rank 3 (0.608, Setosa), Rank 4 (0.60, Versicolor), Rank 5 (0.67, Virginica). How many of the 5 nearest neighbours are Setosa?",
        fields: [
          { id: "setosa_count", label: "Number of Setosa neighbours in top 5", expected: 3, tolerance: 0 }
        ],
        hint: "Ranks 1, 2, and 3 are Setosa.",
        solutionExplanation: "3 Setosa, 1 Versicolor (Rank 4), 1 Virginica (Rank 5) — Slide 114."
      },
      {
        stepNum: 4,
        title: "Step 4: Final Majority Voting Decision for K = 5",
        instruction: "What is the final predicted species for K = 5?",
        fields: [
          { id: "k5_winner", label: "Enter predicted species (Setosa / Versicolor / Virginica)", expected: "Setosa", isString: true }
        ],
        hint: "Setosa has 3 votes out of 5.",
        solutionExplanation: "Setosa wins majority vote with 3 out of 5 votes! (Slide 114)."
      }
    ]
  },
  {
    id: "svm_kernel",
    title: "SVM Kernel Trick: Lili Jiang's Numerical Equation",
    pdfRef: "Slides 143-144",
    scenario: "Given points x = (2, 3, 4) and y = (3, 4, 5), verify that the Kernel Function K(x, y) = (x · y)² gives the exact same result as projecting into a 9-dimensional space, with far less computation.",
    dataset: [
      { vector: "x", values: [2, 3, 4] },
      { vector: "y", values: [3, 4, 5] }
    ],
    steps: [
      {
        stepNum: 1,
        title: "Step 1: Compute Vector Dot Product (x · y)",
        instruction: "Compute x · y = (2)(3) + (3)(4) + (4)(5).",
        fields: [
          { id: "dot_xy", label: "Dot product (x · y)", expected: 38, tolerance: 0.1 }
        ],
        hint: "6 + 12 + 20.",
        solutionExplanation: "x · y = 6 + 12 + 20 = 38 (Slide 144)."
      },
      {
        stepNum: 2,
        title: "Step 2: Evaluate Polynomial Kernel K(x, y) = (x · y)²",
        instruction: "Square the dot product: (38)².",
        fields: [
          { id: "kernel_res", label: "Kernel K(x, y) = (38)²", expected: 1444, tolerance: 0.1 }
        ],
        hint: "38 * 38.",
        solutionExplanation: "38² = 1444 (Slide 144)."
      },
      {
        stepNum: 3,
        title: "Step 3: Verify with 9D Direct Mapping f(x) · f(y)",
        instruction: "In 9D, f(2,3,4) = (4,6,8,6,9,12,8,12,16) and f(3,4,5) = (9,12,15,12,16,20,15,20,25). What is the sum of products: (36 + 72 + 120 + 72 + 144 + 240 + 120 + 240 + 400)?",
        fields: [
          { id: "dot_9d", label: "9D Dot Product <f(x), f(y)>", expected: 1444, tolerance: 0.1 }
        ],
        hint: "Sum all 9 products.",
        solutionExplanation: "Sum = 1444. Exactly matches the kernel function without computing 9 coordinates! (Slide 144)."
      }
    ]
  },
  {
    id: "decision_tree",
    title: "Decision Tree: PlayTennis Entropy & Information Gain",
    pdfRef: "Slides 170-180",
    scenario: "Given the 14-day PlayTennis dataset with 9 Yes and 5 No, compute the Information Gain for Humidity to see why ID3 selects it over Wind.",
    dataset: [
      { total: 14, yes: 9, no: 5 }
    ],
    steps: [
      {
        stepNum: 1,
        title: "Step 1: Calculate the Root Dataset Entropy H(S)",
        instruction: "Given 9 positive and 5 negative examples: H(S) = -(9/14)log₂(9/14) - (5/14)log₂(5/14). Round to 3 decimals.",
        fields: [
          { id: "h_s", label: "Entropy H(S)", expected: 0.940, tolerance: 0.01 }
        ],
        hint: "-(0.643)*(-0.637) - (0.357)*(-1.485).",
        solutionExplanation: "H(S) = 0.940 (Slide 180)."
      },
      {
        stepNum: 2,
        title: "Step 2: Calculate Weighted Entropy of Humidity Subsets",
        instruction: "Humidity divides the 14 days into: High (7 days: [3+, 4-], Entropy = 0.985) and Normal (7 days: [6+, 1-], Entropy = 0.592). Calculate the weighted average entropy: (7/14)*0.985 + (7/14)*0.592. Round to 4 decimals.",
        fields: [
          { id: "h_humidity_weighted", label: "Weighted Entropy for Humidity", expected: 0.7885, tolerance: 0.01 }
        ],
        hint: "0.5 * 0.985 + 0.5 * 0.592.",
        solutionExplanation: "Weighted Entropy = 0.4925 + 0.2960 = 0.7885 (Slide 180)."
      },
      {
        stepNum: 3,
        title: "Step 3: Calculate Information Gain for Humidity",
        instruction: "Gain(S, Humidity) = H(S) - Weighted Entropy = 0.940 - 0.7885. Round to 3 decimals.",
        fields: [
          { id: "gain_humidity", label: "Gain(S, Humidity)", expected: 0.151, tolerance: 0.01 }
        ],
        hint: "0.940 - 0.7885.",
        solutionExplanation: "Gain(S, Humidity) = 0.151 (Slide 180)."
      },
      {
        stepNum: 4,
        title: "Step 4: Compare with Wind and Select Best Split Attribute",
        instruction: "The PDF calculates Gain(S, Wind) = 0.048. Which attribute does ID3 choose as the split classifier?",
        fields: [
          { id: "best_attr", label: "Best Attribute (Humidity / Wind)", expected: "Humidity", isString: true }
        ],
        hint: "Compare 0.151 vs 0.048.",
        solutionExplanation: "Humidity provides higher Information Gain (0.151 vs 0.048), so ID3 chooses Humidity! (Slide 180)."
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NUMERICAL_PROBLEMS };
}
