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

    const DependencyManager = require("../DependencyManager");
    /**
     * Dependency manager instance.
     *
     * @name Lib#includes
     * @type {{init, register, get}}
     */
    this.dependencyManager = DependencyManager.getInstance();
  }

  getLogger() {
    const logger = this.dependencyManager.get("logger");
    if (typeof logger === "function") {
      return logger(this.name);
    }
    return console;
  }
}

module.exports = Lib;
