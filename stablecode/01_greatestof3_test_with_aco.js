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
  [2, 3],
  [2, 6],
  [3, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 6],
]);

const adjacencyMatrix = convertToAdjacencyMatrix(TR);
const antColony = new AntColony(adjacencyMatrix, 3, 0.95, 1, 2);
antColony.run(100);

// Print the pheromone matrix after running the algorithm
console.log("Pheromone Matrix:");
console.log(antColony.pheromone);



// greatestof3
/*function greatestof3(x, y, z) {
  if ((x > y) && (x > z)) return x;
  else if ((y > z )&& (y > x)) return y;
  else return z;
}*/

// greatestof3 TP1
function greatestof3_tp1(x, y, z) {
  if (x <= y && y <= z) {
    return z;
  }
}

// greatestof3 TP2
function greatestof3_tp2(x, y, z) {
  if (x > y && x > z) {
    return x;
  }
}

// greatestof3 TP3
function greatestof3_tp3(x, y, z) {
  if (x > y) {
    if (x <= z) {
      if (y <= z) {
        return z;
      }
    }
  }
}

// greatestof3 TP4
function greatestof3_tp4(x, y, z) {
  if (x <= y)
    if (y > z)
      if (y > x) {
        return y;
      }
}

// greatestof3 TP5
function greatestof3_tp5(x, y, z) {
  if (x <= y) 
        if (y > z) 
          if (y <= x) 
              return z;
}



function testGreatestOf3(description, greatestOf3Function) {
  describe(description, function () {
    const pheromoneMatrix = antColony.pheromone.map(row => row.map(value => Math.floor(value)));

    
    it("should correctly handle high pheromone concentrations", function () {
      const highValues = [
        pheromoneMatrix[0][0],
        pheromoneMatrix[1][1],
        pheromoneMatrix[2][2],
      ];
      const result = greatestOf3Function(...highValues);
      
      const maxValue = Math.max(...highValues);

      assert.strictEqual(result, maxValue);
    });

    it("should correctly handle low or zero pheromone concentrations", function () {
      const lowValues = [
        pheromoneMatrix[3][3],
        pheromoneMatrix[4][4],
        pheromoneMatrix[5][5],
      ];

      const result = greatestOf3Function(...lowValues);
      const maxValue = Math.max(...lowValues);
      assert.strictEqual(result, maxValue);
    });

    it("should handle random pheromone values", function () {
      const randomValues = [
        pheromoneMatrix[0][2],
        pheromoneMatrix[2][1],
        pheromoneMatrix[4][3],
      ];

      const result = greatestof3_tp1(...randomValues);
      const maxValue = Math.max(...randomValues);

      assert.strictEqual(result, maxValue);
    });

    it("should handle values from different regions", function () {
      const regionValues = [
        pheromoneMatrix[0][1],
        pheromoneMatrix[3][4],
        pheromoneMatrix[5][2],
      ];

      const result = greatestOf3Function(...regionValues);
      const maxValue = Math.max(...regionValues);

      assert.strictEqual(result, maxValue);
    });

  });
}

/* ------------------------------ Test Patch 1 ------------------------------ */
describe("greatestof3_tp1 function", function () {
  testGreatestOf3("with various scenarios", greatestof3_tp1);
});

/* ------------------------------ Test Patch 2 ------------------------------ */
describe("greatestof3_tp2 function", function () {
  testGreatestOf3("with various scenarios", greatestof3_tp2);
});
/* ------------------------------ Test Patch 3 ------------------------------ */
describe("greatestof3_tp3 function", function () {
  testGreatestOf3("with various scenarios", greatestof3_tp3);
});

/* ------------------------------ Test Patch 4 ------------------------------ */
describe("greatestof3_tp4 function", function () {
  testGreatestOf3("with various scenarios", greatestof3_tp4);
});
/* ------------------------------ Test Patch 5 ------------------------------ */
describe("greatestof3_tp5 function", function () {
  testGreatestOf3("with various scenarios", greatestof3_tp5);
});