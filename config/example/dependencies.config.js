module.exports = {
  dependencies: [
    { name: "logger", path: "src/Lib/Logger" },
    { name: "db", path: "src/Lib/DB" },
    { name: "command", path: "src/Lib/Command" },
    { name: "discord", path: "src/Lib/Discord" },
    { name: "internationalization", path: "src/Lib/Internationalization" },
  ],
  autoRequire: [
    "src/Module",
  ],
};
