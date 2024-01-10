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
  [3, 4],
  [3, 5],
  [5, 6],
  [2, 7],
  [5, 2],
]);

const adjacencyMatrix = convertToAdjacencyMatrix(TR);
const antColony = new AntColony(adjacencyMatrix, 3, 0.95, 1, 2);
antColony.run(100);

// Print the pheromone matrix after running the algorithm
console.log("Pheromone Matrix:");
console.log(antColony.pheromone);

/*function compareArrays(x, y, size) {
  for (let i = 0; i < size; ++i) {
    if (x[i] < y[i]) {
      return -1;
    } else if (x[i] > y[i]) {
      return 1;
    }
  }
  return 0;
}*/

//tp 1
function compareArrays1(x, y, size) {
  let i = 0;
  if (i >= size) {
    return 0;
  }
}
//tp 2
function compareArrays2(x, y, size) {
  for (let i = 0; i < size; ++i) {
    if (x[i] < y[i]) return -1;
    break;
  }
}

//tp 3
function compareArrays3(x, y, size) {
  for (let i = 0; i < size; ++i) {
    if (x[i] >= y[i]) {
      return 1;
    }
  }
}

//tp 4
function compareArrays4(x, y, size) {
  for (let i = 0; i < size; ) {
    if (x[i] >= y[i]) ++i;
    if (i >= size) {
      return 0;
    }
  }
}

//tp 5
function compareArrays5(x, y, size) {
  for (let i = 0; i < size; ) {
    if (x[i] >= y[i]) {
      ++i;
      if (i < size && x[i] < y[i]) {
        return -1;
      }
    }
    break;
  }
}

//tp 6
function compareArrays6(x, y, size) {
  for (let i = 0; i < size; ) {
    if (x[i] >= y[i]) {
      ++i;
      if (i < size && x[i] < y[i]) {
        if (x[i] > y[i]) {
          return 1;
        }
      }
    }
    break;
  }
}

// Test function
// Test function for compareArrays
function comparearrays(description, compareArraysFunction) {
  describe(description, function () {
    const pheromoneMatrix = antColony.pheromone.map((row) =>
      row.map((value) => Math.floor(value))
    );
    it("should return 0 for an empty array", function () {
      const result = compareArraysFunction([], [], 0);
      assert.strictEqual(result, 0);
    });

    it("should return -1 if the value is not found in the array", function () {
      const result = compareArraysFunction([1, 2, 3], [4, 5, 6], 3);
      assert.strictEqual(result, -1);
    });

    it("should return 1 if the first array is greater than the second array", function () {
      const result = compareArraysFunction(
        pheromoneMatrix[2],
        pheromoneMatrix[0],
        3
      );
      assert.strictEqual(result, 1);
    });

    it("should return -1 if the first array is less than the second array", function () {
      const result = compareArraysFunction(
        pheromoneMatrix[0],
        pheromoneMatrix[2],
        3
      );
      assert.strictEqual(result, -1);
    });

    it("should return 0 if the arrays are equal", function () {
      const result = compareArraysFunction(
        pheromoneMatrix[0],
        pheromoneMatrix[0],
        3
      );
      assert.strictEqual(result, 0);
    });
  });
}

/* ------------------------------ Test Patch 1 ------------------------------ */
describe("compareArrays1 function", function () {
  comparearrays("with various scenarios", compareArrays1);
});
/* ------------------------------ Test Patch 2 ------------------------------ */
describe("compareArrays2 function", function () {
  comparearrays("with various scenarios", compareArrays2);
});

/* ------------------------------ Test Patch 3 ------------------------------ */
describe("compareArrays3 function", function () {
  comparearrays("with various scenarios", compareArrays3);
});
/* ------------------------------ Test Patch 4 ------------------------------ */
describe("compareArrays4 function", function () {
  comparearrays("with various scenarios", compareArrays4);
});
/* ------------------------------ Test Patch 5 ------------------------------ */
describe("compareArrays5 function", function () {
  comparearrays("with various scenarios", compareArrays5);
});
/* ------------------------------ Test Patch 6 ------------------------------ */
describe("compareArrays6 function", function () {
  comparearrays("with various scenarios", compareArrays6);
});
