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
    [2, 3],
    [3, 2],
    [3, 4],
    [2, 5],
]);

const adjacencyMatrix = convertToAdjacencyMatrix(TR);
const antColony = new AntColony(adjacencyMatrix, 3, 0.95, 1, 2);
antColony.run(100);

// Print the pheromone matrix after running the algorithm
console.log("Pheromone Matrix:");
console.log(antColony.pheromone);



/*function checkPrime(n) {
  for (let c = 2; c <= n - 1; c++) {
    if (n % c === 0) {
      return 0;
    }
  }
  return 1;
}


  */

// checkPrime TP1
function checkPrime1(n) {
  let c = 2;
  if (c > n) {
    return 1;
  }
}


// checkPrime TP2
function checkPrime2(n) {
  // Flag to track the iteration
  let isFirstIteration = true;

  // Loop to iterate twice
  for (let c = 2; c <= n;) {
    if (n % c != 0) {
      c++;
      if (c > n) {
        return 1;
      }
    }
    break;
  }
}

// checkPrime TP3
function checkPrime3(n) {
  // Flag to track the iteration
  let isFirstIteration = true;

  // Loop to iterate twice
  for (let c = 2; c <= n; c++) {
    if (n % c != 0) {
      c++;
      if (c <= n) {
        if (n % c === 0) {
          return 0;
        }
      }
    }
  }
}




// Test function
function checkPrime(description, checkPrimeFunction) {
  describe(description, function () {
    const pheromoneMatrix = antColony.pheromone.map(row => row.map(value => Math.floor(value)));

    it("should correctly handle prime numbers", function () {
      const randomRow = Math.floor(Math.random() * 5);
      const randomCol = Math.floor(Math.random() * 5);
      const result = checkPrimeFunction(pheromoneMatrix[randomRow][randomCol]);
      assert.strictEqual(result, 1);
    });

    it("should correctly handle non-prime numbers", function () {
      const randomRow = Math.floor(Math.random() * 5);
      const randomCol = Math.floor(Math.random() * 5);
      const result = checkPrimeFunction(pheromoneMatrix[randomRow][randomCol]);
      assert.strictEqual(result, 0);
    });
  });
}

/* ------------------------------ Test Patch 1 ------------------------------ */
describe("checkPrime1 function", function () {
    checkPrime("with various scenarios", checkPrime1);
});

/* ------------------------------ Test Patch 2 ------------------------------ */
describe("checkPrime2 function", function () {
    checkPrime("with various scenarios", checkPrime2);
});

/* ------------------------------ Test Patch 3 ------------------------------ */
describe("checkPrime3 function", function () {
    checkPrime("with various scenarios", checkPrime3);
});
