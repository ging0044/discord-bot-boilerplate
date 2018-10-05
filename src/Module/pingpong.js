const Module = require(".");

class Pingpong extends Module {
  constructor() {
    super();
  }

  execute() {
    this.client.addCommand("ping", (m) =>
      m.author.mention + " " + this.i.getMessage("en", "Module/Pingpong/pong"));
  }
}

module.exports = Pingpong;
