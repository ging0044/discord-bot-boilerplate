const Module = require("../src/module");
const dependencies = require("../src/dependencyManager");
dependencies.init({
  discord: "discord",
  logger: name => name,
});

it("correctly determines name of subclass", () => {
  class Test extends Module {
    constructor() {
      super();
    }
  }

  const test = new Test();

  expect(test.name).toStrictEqual("Test");
});

it("requires the necessary dependencies", () => {
  class Test extends Module {
    constructor() {
      super();
    }
  }

  const test = new Test();

  expect(test.discord).toStrictEqual("discord");
  expect(test.logger).toStrictEqual(test.name);
});
