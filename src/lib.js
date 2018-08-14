/**
 * Abstract class for use in libs. These are loaded before any modules,
 * and can register themselves as dependencies to be required in modules.
 */
class Lib {
  /**
   * Should be called using `super()` when a subclass is constructed.
   * Provides the name of the subclass and the dependency manager by default.
   */
  constructor() {
    /**
     * The name of the Lib class or whatever is extending it
     *
     * @name Lib#name
     * @type String
     */
    this.name = this.constructor.name;

    /**
     * Dependency manager instance.
     *
     * @name Lib#includes
     * @type {{init, register, get}}
     */
    this.includes = require("./dependencyManager");
  }

  getLogger() {
    if (this.includes.has("logger")) {
      return this.includes.get("logger")(this.name);
    }
    return console;
  }
}

module.exports = Lib;
