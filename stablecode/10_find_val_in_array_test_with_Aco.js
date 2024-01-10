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



/*function findFirst(val, array) {
  for (let i = 0; i < array.length; ++i) {
    if (array[i] === val) {
      return i;
    }
  }
  return -1;
}
}


  */

// findFirst TP1
function findFirst1(val, array) {
    let i = 0;
    if (i < array.length) {
      return -1;
    }
  }
  
  // findFirst TP2
  function findFirst2(val, array) {
    for (let i = 0; i < array.length;) {
      if (array[i] != val) {
        i++;
        if (i > array.length) {
          return -1;
        }
      }
      break;
    }
   
  }
  
  // findFirst TP3
  function findFirst3(val, array) {
    for (let i = 0; i < array.length; ++i) {
      if (array[i] != val) 
        i++;
        if (i < array.length) 
          if (array[i] === val) 
          return i;
         break;
    }
   
  }

// Test function
function findfirst(description, findfirstfunction) {
  describe(description, function () {
    const pheromoneMatrix = antColony.pheromone.map(row => row.map(value => Math.floor(value)));


    it("should return -1 for an empty array", function () {
      const result = findfirstfunction(pheromoneMatrix[0][0], []); // Use a value from pheromoneMatrix
      assert.strictEqual(result, -1);
    });


    it("should return -1 if the value is not found in the array", function () {
      const result = findfirstfunction(pheromoneMatrix[1][1], [pheromoneMatrix[0][0], pheromoneMatrix[2][2], pheromoneMatrix[1][2]]); // Use values from pheromoneMatrix
      assert.strictEqual(result, -1);
    });

  

    it("should return the index if the value is found in the array", function () {
      const result = findfirstfunction(pheromoneMatrix[2][2], [pheromoneMatrix[0][0], pheromoneMatrix[1][1], pheromoneMatrix[2][2], pheromoneMatrix[2][0]]); // Use a value from pheromoneMatrix
      assert.strictEqual(result, 2);
    });
  
    it("should return -1 if the value is not found in the array", function () {
      const result = findfirstfunction(0.8, [pheromoneMatrix[0][0], pheromoneMatrix[1][1], pheromoneMatrix[2][2], pheromoneMatrix[2][0]]); // Use a value not present in the array
      assert.strictEqual(result, -1);
    });
  });
}

/* ------------------------------ Test Patch 1 ------------------------------ */
describe("findFirst1 function", function () {
    findfirst("with various scenarios", findFirst1);
});

/* ------------------------------ Test Patch 2 ------------------------------ */
describe("findFirst2 function", function () {
    findfirst("with various scenarios", findFirst2);
});

/* ------------------------------ Test Patch 3 ------------------------------ */
describe("findFirst3 function", function () {
    findfirst("with various scenarios", findFirst3);
});
