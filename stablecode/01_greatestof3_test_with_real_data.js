const assert = require("assert");
const { log } = require("console");

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
    it("should correctly handle scenarios where the greatest value is the first one", function () {
      const result = greatestOf3Function(10, 5, 3);
      assert.strictEqual(result, 10);
    });

    it("should correctly handle scenarios where the greatest value is the second one", function () {
      const result = greatestOf3Function(2, 8, 4);
      assert.strictEqual(result, 8);
    });

    it("should correctly handle scenarios where the greatest value is the third one", function () {
      const result = greatestOf3Function(1, 7, 15);
      assert.strictEqual(result, 15);
    });

    it("should handle negative numbers", function () {
      const result = greatestOf3Function(-8, -2, -5);
      assert.strictEqual(result, -2);
    });

    it("should handle equal numbers", function () {
      const result = greatestOf3Function(6, 6, 6);
      assert.strictEqual(result, 6);
    });

    it("should handle random scenarios", function () {
      const result = greatestof3_tp1(3, 9, 6);
      assert.strictEqual(result, 9);
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