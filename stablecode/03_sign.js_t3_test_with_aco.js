const assert = require("assert");
const { log } = require("console");

/* ---------------------- ACO algorithm generated data ---------------------- */
class AntColony {
  constructor(adjacencyMatrix, nAnts, decay = 0.95, alpha = 1, beta = 1) {
    this.adjacencyMatrix = adjacencyMatrix;
    this.pheromone = Array.from({ length: adjacencyMatrix.length }, () =>
      Array(adjacencyMatrix[0].length).fill(1 / adjacencyMatrix.length)
    );
    this.allIndices = Array.from(
      { length: adjacencyMatrix.length },
      (_, index) => index
    );
    this.nAnts = nAnts;
    this.decay = decay;
    this.alpha = alpha;
    this.beta = beta;
  }

  run(n) {
    for (let i = 0; i < n; i++) {
      const allPaths = this.genAllPaths();
      this.spreadPheromone(allPaths, this.nAnts, this.decay);
    }
  }

  spreadPheromone(allPaths, nAnts, decay) {
    for (const path of allPaths) {
      this.pheromone = this.pheromone.map((row) =>
        row.map((value) => value * decay)
      );

      const pathDist = this.totalDistance(path);
      for (const [row, col] of path) {
        this.pheromone[row][col] += 1.0 / pathDist; //always is positiver number
      }
    }
  }

  genAllPaths() {
    const allPaths = [];
    for (let i = 0; i < this.nAnts; i++) {
      const path = this.genPath(0);
      allPaths.push(path);
    }
    return allPaths;
  }

  genPath(start) {
    const path = [];
    const visited = new Set();
    visited.add(start);
    let prev = start;
    for (let i = 0; i < this.adjacencyMatrix.length - 1; i++) {
      const move = this.pickMove(
        this.pheromone[prev],
        this.adjacencyMatrix[prev],
        visited
      );
      path.push([prev, move]);
      prev = move;
      visited.add(move);
    }
    path.push([prev, start]); // Going back to where we started
    return path;
  }

  pickMove(pheromone, connections, visited) {
    const pheromoneCopy = [...pheromone];
    visited.forEach((index) => (pheromoneCopy[index] = 0));

    const row = pheromoneCopy.map(
      (value, index) =>
        Math.pow(value, this.alpha) * Math.pow(connections[index], this.beta)
    );

    const sum = row.reduce((acc, value) => acc + value, 0);
    const normRow = row.map((value) => value / sum);

    const move = this.randomChoice(this.allIndices, normRow);
    return move;
  }

  randomChoice(choices, probabilities) {
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < choices.length; i++) {
      cumulativeProbability += probabilities[i];
      if (rand < cumulativeProbability) {
        return choices[i];
      }
    }
    return choices[choices.length - 1];
  }

  totalDistance(path) {
    return path.reduce(
      (total, [row, col]) => total + this.adjacencyMatrix[row][col],
      0
    );
  }
}

function convertToAdjacencyMatrix(edgeSet) {
  const numVertices = Math.max(...Array.from(edgeSet).flat());
  const adjacencyMatrix = Array.from({ length: numVertices }, () =>
    Array(numVertices).fill(0)
  );
  edgeSet.forEach((edge) => {
    const [start, end] = edge;
    adjacencyMatrix[start - 1][end - 1] = 1;
  });

  return adjacencyMatrix;
}

/* -------------------- enter your test requirementconst -------------------- */
TR = new Set([
    [1, 2],
    [1, 3],
    [3, 4],
    [3, 5],
]);

const adjacencyMatrix = convertToAdjacencyMatrix(TR);
const antColony = new AntColony(adjacencyMatrix, 3, 0.95, 1, 2);
antColony.run(100);

// Print the pheromone matrix after running the algorithm
console.log("Pheromone Matrix:");
console.log(antColony.pheromone);
/*sign_C
function sign(num) {
  if (Number.isInteger(num)) {
    if (num > 0) {
      return 1;
    } else if (num < 0) {
      return -1;
    } else {
      return 0;
    }
  } else {
    // Handle the case where num is not an integer, e.g., return an error code or message.
    console.error("Input is not an integer");
    return NaN; // or any other appropriate value or action
  }
}

  */

// sign TP1
function sign_tp1(num) {
    if (Number.isInteger(num)) {
        if (num > 0) {
            return 1;
         }
      } else {
        // Handle the case where num is not an integer, e.g., return an error code or message.
        console.error("Input is not an integer");
      }
}

// sign TP2
function sign_tp2(num) {
    if (Number.isInteger(num)) {
        if (num <= 0) {
           if (num < 0) {
            return -1;
           }
         }
      } else {
        // Handle the case where num is not an integer, e.g., return an error code or message.
        console.error("Input is not an integer");
      }
}

// sign TP3
function sign_tp3(num) {
    if (Number.isInteger(num)) {
        if (num <= 0) {
           if (num == 0) {
            return 0;
           }
         }
      } else {
        // Handle the case where num is not an integer, e.g., return an error code or message.
        console.error("Input is not an integer");
      }
  
}


function testsign(description, signFunction) {
    describe(description, function () {
        const pheromoneMatrix = antColony.pheromone.map(row => row.map(value => Math.floor(value)));
        console.log(pheromoneMatrix);
        // Choose values for testing from different parts of the pheromone matrix
        const positiveValues = [
            pheromoneMatrix[0][0],
            pheromoneMatrix[1][4],
            pheromoneMatrix[4][4],
            pheromoneMatrix[0][1],
        ];

        const negativeValues = [
            pheromoneMatrix[3][3],
            pheromoneMatrix[4][4],
            pheromoneMatrix[0][0],
        ];

        const zeroValue = [
            pheromoneMatrix[0][2],
            pheromoneMatrix[2][1],
            pheromoneMatrix[4][3],
        ];

        // Use these values in your test cases
        it("should correctly handle positive numbers", function () {
            const randomValue = positiveValues[Math.floor(Math.random() * positiveValues.length)];
            console.log(randomValue);
            const result = signFunction(randomValue);
            assert.strictEqual(result, 1);
        });

        it("should correctly handle negative numbers", function () {
            const randomValue = negativeValues[Math.floor(Math.random() * negativeValues.length)];
            const result = signFunction(randomValue);
            assert.strictEqual(result, -1);
        });

        it("should correctly handle zero", function () {
            const randomValue = zeroValue[Math.floor(Math.random() * zeroValue.length)];
            const result = signFunction(randomValue);
            assert.strictEqual(result, 0);
        });
    });
}

/* ------------------------------ Test Patch 1 ------------------------------ */
describe("sign_tp1 function", function () {
    testsign("with various scenarios", sign_tp1);
});

/* ------------------------------ Test Patch 2 ------------------------------ */
describe("sign_tp2 function", function () {
    testsign("with various scenarios", sign_tp2);
});

/* ------------------------------ Test Patch 3 ------------------------------ */
describe("sign_tp3 function", function () {
    testsign("with various scenarios", sign_tp3);
});

