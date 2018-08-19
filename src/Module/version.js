const Module = require(".");
const App = require("../Model/App");

class Version extends Module {
  constructor() {
    super();

    this.app = new App();
  }

  execute() {
    this.discord.registerCommand(
      "version",
      this.app.version,
      {
        description: this.i.getMessage("en", "Module/Version/description")
      }
    );
  }
}

module.exports = Version;
