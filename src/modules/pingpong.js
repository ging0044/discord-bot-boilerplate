const Module = require("../module");

class Pingpong extends Module {
  constructor() {
    super();

    const command = this.discord.registerCommand(
      "ping",
      () => {
        this.logger.debug("received ping, returning pong");
        return this.i.m("en", "modules.ping.pong");
      },
      {
        description: "Guess.",
        usage: "ping",
      }
    );

    command.registerSubcommand("test", "woo");
  }
}

module.exports = new Pingpong();
