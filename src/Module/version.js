const Module = require(".");

class Version extends Module {
  constructor() {
    super();

    this.app = this.dependencyManager.get("app");
  }

  execute() {
    this.discord.registerCommand(
      "version",
      this.app.version,
      {
        description: "version of bot"
      }
    );
  }
}

module.exports = Version;
