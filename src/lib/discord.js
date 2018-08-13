const Eris = require("eris");
const Lib = require("../lib");

class Discord extends Lib {
  constructor() {
    super();

    this.ready = this.ready.bind(this);
    this.failedToLogIn = this.failedToLogIn.bind(this);

    this.discord = new Eris.CommandClient(process.env.DISCORD_TOKEN, {}, {
      description: "",
    });

    this.discord.on("ready", this.ready);

    this.includes.register(this.name, this.discord); // TODO: handle reconnecting on disconnect and all that here

    this.discord.connect();
  }

  getLogger() {
    try {
      return this.includes.get("logger")(this.name);
    }
    catch (_) {
      return console;
    }
  }

  ready() {
    const logger = this.getLogger();
    const message = "Discord is ready";

    logger.info(message);
  }

  failedToLogIn(err) {
    const logger = this.getLogger();
    const message = `Failed to login: ${err}\n${err.stack}`;

    logger.error(message);

    throw err;
  }

  addCommand(commandName, callback) {

  }
}

module.exports = new Discord();
