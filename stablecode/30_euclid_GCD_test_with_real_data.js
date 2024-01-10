const assert = require("assert");


//Test Patchs
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
    break;
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
    break;
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
    break;
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
    break;
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
    break;
  }
}
// Test function
function gcd(description, gcdFunction) {
  describe(description, function () {
    it("should correctly handle equal numbers", function () {
      const result = gcdFunction(10, 10);
      assert.strictEqual(result, 10);
    });

    it("should correctly handle prime numbers", function () {
      const result = gcdFunction(17, 19);
      assert.strictEqual(result, 1);
    });

    it("should correctly handle non-prime numbers", function () {
      const result = gcdFunction(24, 36);
      assert.strictEqual(result, 12);
    });

    it("should correctly handle larger numbers", function () {
      const result = gcdFunction(168, 126);
      assert.strictEqual(result, 42);
    });
  });
}

// Test Patch 1
describe("gcd1 function", function () {
  gcd("with various scenarios", gcd1);
});

// Test Patch 2
describe("gcd2 function", function () {
  gcd("with various scenarios", gcd2);
});

// Test Patch 3
describe("gcd3 function", function () {
  gcd("with various scenarios", gcd3);
});

// Test Patch 4
describe("gcd4 function", function () {
  gcd("with various scenarios", gcd4);
});

// Test Patch 5
describe("gcd5 function", function () {
  gcd("with various scenarios", gcd5);
});

// Test Patch 6
describe("gcd6 function", function () {
  gcd("with various scenarios", gcd6);
});

// Test Patch 7
describe("gcd7 function", function () {
  gcd("with various scenarios", gcd7);
});
