module.exports = {
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
