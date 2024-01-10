const assert = require("assert");

// checkPrime TP1
function checkPrime1(n) {
  let c = 2;
  if (n < 2) {
    return 0; // Not a prime number
  }
  while (c * c <= n) {
    if (n % c === 0) {
      return 0; // Not a prime number
    }
    c++;
  }
  return 1; // Prime number
}

// checkPrime TP2
function checkPrime2(n) {
  if (n < 2) {
    return 0; // Not a prime number
  }
  for (let c = 2; c <= Math.sqrt(n); c++) {
    if (n % c === 0) {
      return 0; // Not a prime number
    }
  }
  return 1; // Prime number
}

// checkPrime TP3
function checkPrime3(n) {
  if (n < 2) {
    return 0; // Not a prime number
  }
  for (let c = 2; c <= n / 2; c++) {
    if (n % c === 0) {
      return 0; // Not a prime number
    }
  }
  return 1; // Prime number
}

function checkPrime(description, checkPrimeFunction) {
  describe(description, function () {

    it("should correctly handle prime numbers", function () {
      const primeNumbers = [2, 3, 5, 7, 11];
      for (const num of primeNumbers) {
        const result = checkPrimeFunction(num);
        assert.strictEqual(result, 1);
      }
    });

    it("should correctly handle non-prime numbers", function () {
      const nonPrimeNumbers = [4, 6, 8, 9, 10];
      for (const num of nonPrimeNumbers) {
        const result = checkPrimeFunction(num);
        assert.strictEqual(result, 0);
      }
    });

    it("should correctly handle edge cases", function () {
      assert.strictEqual(checkPrimeFunction(0), 0); // 0 is not a prime number
      assert.strictEqual(checkPrimeFunction(1), 0); // 1 is not a prime number
    });

    it("should handle random values", function () {
      const randomValues = [13, 14, 15, 16, 17];
      for (const value of randomValues) {
        const result = checkPrime1(value);
        assert.strictEqual(result, 1); // All of the random values should be prime
      }
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
