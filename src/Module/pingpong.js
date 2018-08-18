const Module = require(".");

class Pingpong extends Module {
  constructor() {
    super();
  }

  execute() {
    const command = this.discord.registerCommand(
      "ping",
      () => {
        this.logger.debug("received ping, returning pong");
        return this.i.getMessage("en", "modules/pingpong/pong");
      },
      {
        description: this.i.getMessage("en", "module/pingpong/description"),
        usage: "ping",
      }
    );

    command.registerSubcommand("test", "woo");
  }
}

module.exports = Pingpong;
