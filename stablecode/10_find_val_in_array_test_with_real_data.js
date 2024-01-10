
const assert = require("assert");
const { log } = require("console");


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
    for (let i = 0; i < array.length;) {
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

    it("should return -1 for an empty array", function () {
      const result = findfirstfunction(10, []); // Use any value and an empty array
      assert.strictEqual(result, -1);
    });

    it("should return -1 if the value is not found in the array", function () {
      const result = findfirstfunction(5, [1, 2, 3, 4]); // Use a value not present in the array
      assert.strictEqual(result, -1);
    });

    it("should return the index if the value is found in the array", function () {
      const result = findfirstfunction(3, [1, 2, 3, 4]); // Use a value present in the array
      assert.strictEqual(result, 2); // Index of the value 3 in the array [1, 2, 3, 4] is 2
    });

    it("should return -1 if the value is not found in the array", function () {
      const result = findfirstfunction(0.8, [1.0, 2.0, 3.0, 4.0]); // Use a value not present in the array
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