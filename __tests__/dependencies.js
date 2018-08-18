const dependencies = require("../src/dependencyManager"); // TODO: rewrite tests for refactor

it("initializes dependencies with an empty map", () => {
  dependencies.init(new Map());
  expect(() => {
    dependencies.get("some_module");
  }).toThrow();
});

it("gets a dependency", () => {
  dependencies.init(new Map());
  const test = () => {};
  dependencies.register("somefunc", test);
  expect(dependencies.get("somefunc"))
    .toStrictEqual(test);
});

it("gets multiple dependencies", () => {
  dependencies.init(new Map());

  const test = () => {};
  const obj = { this: "is", some: "object" };

  dependencies.register("somefunc", test);
  dependencies.register("someobj", obj);

  const { somefunc, someobj } = dependencies.get("somefunc", "someobj");

  expect(somefunc).toStrictEqual(test);
  expect(someobj).toStrictEqual(obj);
});
