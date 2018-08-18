/**
 * Abstract class for use in modules. These are loaded after all libs and models,
 * and can freely require dependencies. By default, the logger, discord client
 * and internationalization libs are included. Data access is performed using
 * models, which are available throught the dependency manager.
 */
class Module {
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
     * Instance of DependencyManager. Any libs that are registered in the
     * dependency manager can be retrieved through this.
     *
     * @type {DependencyManager}
     */
    this.dependencyManager = DependencyManager.getInstance();

    /**
     * Logger with namespace of this.name. All functions log to the console and
     * to a file; warn and higher into log/error.log, info and debug into
     * log/normal.log
     *
     * @type {Object} logger
     * @property {function} debug Log a verbose message to help when debugging
     * @property {function} info Log some general information
     * @property {function} warn Log something that could be a problem
     * @property {function} error Log something that is a problem
     * @property {function} fatal Log something that is a <em>big</em> problem
     */
    this.logger = this.dependencyManager.get("logger")(this.name);

    /**
     * Discord bot instance
     *
     * @type {Eris.CommandClient}
     * @see {@link https://abal.moe/Eris/docs/CommandClient}
     */
    this.discord = this.dependencyManager.get("discord");

    /**
     * Internationalization object
     *
     * @type {Internationalization}
     */
    this.i = this.dependencyManager.get("internationalization");
  }
}

module.exports = Module;
