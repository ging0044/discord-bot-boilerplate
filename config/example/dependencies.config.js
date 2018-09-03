module.exports = {
  dependencies: {
    db: "src/Lib/DB",
    discord: "src/Lib/Discord",
    internationalization: "src/Lib/Internationalization",
    logger: "src/Lib/Logger",
  },
  autoRequire: [
    "src/Module",
  ],
};
