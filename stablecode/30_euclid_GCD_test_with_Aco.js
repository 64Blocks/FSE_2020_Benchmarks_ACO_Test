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
  [1, 7],
  [2, 3],
  [2, 5],
  [3, 4],
  [5, 6],
  [6, 1],
]);

const adjacencyMatrix = convertToAdjacencyMatrix(TR);
const antColony = new AntColony(adjacencyMatrix, 3, 0.95, 1, 2);
antColony.run(100);

// Print the pheromone matrix after running the algorithm
console.log("Pheromone Matrix:");
console.log(antColony.pheromone);

/*function gcd(a, b) {
  while (a !== b) {
      if (a > b) {
          a = a - b;
      } else {
          b = b - a;
      }
  }
  return a;
}*/

//tp1
function gcd1(a,b) {
  if (a == b) {
    return a;
  }
}
//tp2
function gcd2(a,b) {
  while (a !== b) {
    if (a > b) {
      a = a - b;
      if (a == b) {
        return a;
      }
    }
  }
}

//tp3
function gcd3(a,b) {
  while (a !== b) {
    if (a <= b) {
      b = b - a;
      if (a == b) {
        return a;
      }
    }
  }
}
//tp4
function gcd4(a,b) {
  while (a !== b) {
    if (a > b) {
      a = a - b;
      if (a !== b) {
        if (a > b) {
          a = a - b;
          if (a == b) {
            return a;
          }
        }
      }
    }
  }
}

//tp5
function gcd5(a,b) {
  while (a !== b) {
    if (a > b) {
      a = a - b;
      if (a !== b) {
        if (a <= b) {
          b = b - c;
          if (a == b) {
            return a;
          }
        }
      }
    }
  }
}
//tp6
function gcd6(a,b) {
  while (a !== b) {
    if (a <= b) {
      b = b - c;
      if (a !== b) {
        if (a <= b) {
          b = b - c;
          if (a == b) {
            return a;
          }
        }
      }
    }
  }
}
//tp7
function gcd7(a,b) {
  while (a !== b) {
    if (a <= b) {
      b = b - c;
      if (a !== b) {
        if (a > b) {
          a = a - b;
          if (a == b) {
            return a;
          }
        }
      }
    }
  }
}

// Test function
function gcd(description, gcdFunction) {
    describe(description, function () {
      const pheromoneMatrix = antColony.pheromone.map((row) =>
        row.map((value) => Math.floor(value))
      );
  
      it("should correctly handle equal numbers", function () {
        const result = gcdFunction(10, 10);
        assert.strictEqual(result, 10);
      });
  
      it("should correctly handle prime numbers", function () {
        // Example test using pheromoneMatrix
        const randomRow = Math.floor(Math.random() * pheromoneMatrix.length);
        const randomCol = Math.floor(Math.random() * pheromoneMatrix[0].length);
        const result = gcdFunction(pheromoneMatrix[randomRow][randomCol], 7);
        assert.strictEqual(result, 1);
      });
  
      it("should correctly handle non-prime numbers", function () {
        // Example test using pheromoneMatrix
        const randomRow = Math.floor(Math.random() * pheromoneMatrix.length);
        const randomCol = Math.floor(Math.random() * pheromoneMatrix[0].length);
        const result = gcdFunction(12, pheromoneMatrix[randomRow][randomCol]);
        assert.strictEqual(result, 6);
      });
    });
  }
  
  /* ------------------------------ Test Patch 1 ------------------------------ */
  describe("gcd1 function", function () {
    gcd("with various scenarios", gcd1);
  });
  /* ------------------------------ Test Patch 2 ------------------------------ */
  describe("gcd2 function", function () {
    gcd("with various scenarios", gcd2);
  });
  /* ------------------------------ Test Patch 3 ------------------------------ */
  describe("gcd3 function", function () {
    gcd("with various scenarios", gcd3);
  });
  /* ------------------------------ Test Patch 4 ------------------------------ */
  describe("gcd4 function", function () {
    gcd("with various scenarios", gcd4);
  });
  
  /* ------------------------------ Test Patch 5 ------------------------------ */
  describe("gcd5 function", function () {
    gcd("with various scenarios", gcd5);
  });
  
  /* ------------------------------ Test Patch 6 ------------------------------ */
  describe("gcd6 function", function () {
    gcd("with various scenarios", gcd6);
  });
  /* ------------------------------ Test Patch 7 ------------------------------ */
  describe("gcd7 function", function () {
    gcd("with various scenarios", gcd7);
  });
