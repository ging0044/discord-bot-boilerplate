const Module = require(".");
const App = require("../Model/App");

class Version extends Module {
  constructor() {
    super();

    this.app = new App();
  }

  execute() {
    this.client.addCommand("version", (m) =>
      m.author.mention + " " + this.app.version);
  }
}

module.exports = Version;
