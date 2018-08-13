const Module = require("../module");

class Version extends Module {
  constructor() {
    super();

    this.main = this.require("main");

    this.discord.registerCommand(
      "version",
      this.main.version,
      {
        description: "version of bot"
      }
    );
  }
}

module.exports = new Version();