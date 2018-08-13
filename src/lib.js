class Lib {
  constructor() {
    this.name = this.constructor.name;

    /**
     * Dependency manager instance.
     *
     * @name Lib#includes
     * @type {{init, register, get}}
     */
    this.includes = require("./dependencyManager");
  }
}

module.exports = Lib;