const Eris = require("eris");
const yargs = require("yargs-parser");
const Lib = require("..");
let Command;

const config = require("../../../config/discord.config");

class Discord extends Lib {
  constructor() {
    super();

    Command = this.dependencyManager.get("command");
    this._command = new Command();

    this._handleReady = this._handleReady.bind(this);
    this._handleMessageCreate = this._handleMessageCreate.bind(this);

    this.client = new Eris.Client(config.token, {}, {
      description: "",
    });

    this.client.on("ready", this._handleReady); // TODO: handle reconnecting on disconnect and all that here
    this.client.on("messageCreate", this._handleMessageCreate);

    this.client.connect()
      .then(() => this.getLogger().info("Connected"));
  }

  addCommand(command, handler) {
    this._command.addCommand(command, handler);
  }

  execute() {
    return this;
  }

  _handleMessageCreate(message) {
    if (!message.content.startsWith(this.client.user.mention)
      || message.author.id === this.client.user.id) {
      return;
    }
    let result;
    try {
      result = this._command.evaluate(
        yargs(message.content.substring(this.client.user.mention.length)),
        message
      );
    }
    catch (e) {
      return this.client.createMessage(
        message.channel.id,
        `\`\`\`${e.toString()}\`\`\``
      );
    }
    this._sendCommandResult(message, result);
  }

  _sendCommandResult(message, result) {
    if (result && typeof result.then === "function") {
      result.then(this._sendCommandResult.bind(this, message));
    }
    else if (typeof result === "string") {
      this.client.createMessage(message.channel.id, result);
    }
    else if (typeof result === "function") {
      this.client.createMessage(message.channel.id, result());
    }
    else if (typeof result === "object") {
      this.client.createMessage(result.channelId, result.content);
    }
    else {
      // what
    }
  }

  _handleReady() {
    const logger = this.getLogger();
    const message = "Discord client is ready";

    logger.info(message);
  }
}

module.exports = Discord;
