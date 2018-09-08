module.exports = {
  dependencies: [
    { name: "db", path: "src/Lib/DB" },
    { name: "discord", path: "src/Lib/Discord" },
    { name: "internationalization", path: "src/Lib/Internationalization" },
    { name: "logger", path: "src/Lib/Logger" },
  ],
  autoRequire: [
    "src/Module",
  ],
};
