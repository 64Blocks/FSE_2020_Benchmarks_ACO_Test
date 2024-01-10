
const assert = require("assert");
const { log } = require("console");

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
        // Choose values for testing from different parts of the pheromone matrix
        const positiveValues = [5, 10, 15];
        const negativeValues = [-5, -10, -15];
        const zeroValue = [0];

        // Use these values in your test cases
        it("should correctly handle positive numbers", function () {
            for (const num of positiveValues) {
                const result = signFunction(num);
                assert.strictEqual(result, 1);
            }
        });

        it("should correctly handle negative numbers", function () {
            for (const num of negativeValues) {
                const result = signFunction(num);
                assert.strictEqual(result, -1);
            }
        });

        it("should correctly handle zero", function () {
            for (const num of zeroValue) {
                const result = signFunction(num);
                assert.strictEqual(result, 0);
            }
        });

        it("should handle non-integer inputs", function () {
            const nonIntegerValues = [1.5, "abc", true];
            for (const num of nonIntegerValues) {
                // Ensure the function handles non-integer inputs gracefully
                assert.throws(() => {
                    signFunction(num);
                }, /Input is not an integer/);
            }
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