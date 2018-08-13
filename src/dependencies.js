const R = require("ramda");

let dependencies;

/**
 * Initialize the dependency manager with some way to store the deps
 *
 * @param {Object|Map} storage Something to put the dependencies into
 * @return undefined
 */
function init(storage) {
  dependencies = storage;
}

/**
 * Register a dependency
 *
 * @param {string} name The name to be used to access this dependency
 * @param {*} dep The dependency itself
 * @return undefined
 */
function register(name, dep) {
  dependencies[name.toLocaleLowerCase()] = dep;
}

/**
 * Get one or more dependencies
 *
 * @param {...string} names One or more names of dependencies
 * @return {Object<string, *>} An object of dependencies mapped to their names
 */
function get(...names) {
  names = names.map(name => name.toLocaleLowerCase());

  if (names.length === 1) {
    const dep = dependencies[names[0]];
    if (!dep) {
      throw new Error(`No dependency found for ${names[0]}`);
    }
    return dep;
  }

  return R.reduce(
    (acc, name) => {
      acc[name] = dependencies[name];
      if (!acc[name]) {
        throw new Error(`No dependecy found for ${names[0]}`);
      }
      return acc;
    },
    {},
    names
  );
}

module.exports = {
  init,
  register,
  get,
};
