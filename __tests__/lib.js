const Lib = require("../src/lib");
const dependencies = require("../src/dependencyManager");

it("correctly determines the name of the subclass", () => {
  class Test extends Lib {
    constructor() {
      super();
    }
  }

  const test = new Test();

  expect(test.name).toStrictEqual("Test");
});

it("properly adds dependency manager to instance", () => {
  class Test extends Lib {
    constructor() {
      super();
    }
  }

  const test = new Test();

  expect(test.includes).toStrictEqual(dependencies);
});
