const Lib = require("..");
const loggerConfig = require("../../../config/logger.config");

/**
 * Logging levels that are supported by both log4js and sentry
 *
 * @type {string[]}
 */
const logLevels = ["debug", "info", "warn", "error", "fatal"];

/**
 * Logger class, wraps both log4js and sentry, so both happen at the same time
 */
class Logger extends Lib {
  constructor() {
    super();

    this.createLogger = this.createLogger.bind(this);
    this.log = this.log.bind(this);

    this.initRaven();
    this.initLogger();
  }

  execute() {
    this.createLogger(this.name).info("Ready");
    return this.createLogger;
  }

  initRaven() {
    this.raven = require("raven");
    this.raven.config(loggerConfig.sentry.dsn).install();
  }

  initLogger() {
    const log4js = require("log4js");
    log4js.configure(loggerConfig);

    this.logger = log4js.getLogger();
  }

  /**
   * Log a message to the console, to a file, and to sentry
   *
   * @param {string} level The level to log at (must be one of {@link logLevels}
   * @param {string} namespace The namespace to log in (adds a prefix to the message)
   * @param {string} message The message to log
   * @param {*} data Any data, to be sent to the console/file/sentry
   * @return undefined
   */
  log(level, namespace, message, data = "") {
    this.logger[level](`${namespace}: ${message}`, data);
    if (level === "error") {
      // TODO: set up raven
      // TODO: map 'warn' to 'warning' for sentry
      //raven.captureException(data);
    }
  }

  /**
   * Make a logger object, with functions for each log level
   *
   * @param {string} namespace The namespace to prefix the log with
   * @return {Object<string, function>} Object with a function for each log level
   */
  createLogger(namespace) {
    return logLevels.reduce((acc, level) => {
      acc[level] = this.log.bind(this, level, namespace);
      return acc;
    }, {});
  }
}

module.exports = Logger;
