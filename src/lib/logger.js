const R = require("ramda");
const Lib = require("../lib");

const loggerConfig = {
  appenders: {
    console: { type: "stdout" },
    consoleErr: { type: "stderr" },
    logFile: { type: "file", filename: "./log/normal.log" },
    errFile: { type: "file", filename: "./log/error.log" },
    normal: {
      type: "logLevelFilter",
      appender: "console",
      level: "debug",
      maxLevel: "warn",
    },
    error: {
      type: "logLevelFilter",
      appender: "consoleErr",
      level: "error",
    },
    normalFile: {
      type: "logLevelFilter",
      appender: "logFile",
      level: "debug",
      maxLevel: "warn",
      maxLogSize: 5000000,
      compress: true,
    },
    errorFile: {
      type: "logLevelFilter",
      appender: "errFile",
      level: "warn",
    },
  },
  categories: {
    default: {
      appenders: [
        "normal",
        "normalFile",
        "error",
        "errorFile",
      ],
      level: "debug",
    },
  }
};
const logLevels = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal",
];

class Logger extends Lib {
  constructor() {
    super();

    this.createLogger = this.createLogger.bind(this);
    this.log = this.log.bind(this);

    this.initRaven();
    this.initLogger();

    this.includes.register(this.name, this.createLogger);
  }

  initRaven() {
    this.raven = require("raven");
    this.raven.config(process.env.SENTRY_DSN).install();
  }

  initLogger() {
    const log4js = require("log4js");
    log4js.configure(loggerConfig);

    this.logger = log4js.getLogger();
  }

  log(level, namespace, message, data = "") {
    this.logger[level](`${namespace}: ${message}`, data);
    if (level === "error") {
      // TODO: set up raven
      // TODO: map 'warn' to 'warning' for sentry
      //raven.captureException(data);
    }
  }

  createLogger(namespace) {
    return R.reduce((acc, level) => {
      acc[level] = R.partial(this.log, [level, namespace]);
      return acc;
    },{}, logLevels);
  }
}

module.exports = new Logger();
