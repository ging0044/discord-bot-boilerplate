class Module {
  constructor() {
    this.name = this.constructor.name;

    /**
     * Instance of DependencyManager. Any libs that are registered in the
     * dependency manager can be retrieved through this.
     * 
     * @type {DependencyManager}
     */
    this.dependencyManager = require("./dependencyManager");

    /**
     * Logger with namespace of this.name.
     */
    this.logger = this.require("logger")(this.name);
    this.discord = this.require("discord");
    this.i = this.require("internationalization");
  }

  require(name) {
    return this.dependencyManager.get(name);
  }
}

module.exports = Module;