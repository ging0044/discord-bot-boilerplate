const Module = require(".");
let Command;

class I18n extends Module {
  constructor() {
    super();

    Command = this.dependencyManager.get("command");

    this.root = new Command();
    this.client.addCommand("i18n", this.root);
  }

  execute() {
    this.root.setCommands({
      "reload": (_args, _opts, message) => {
        if (message.author.id !== "122351209486090240") {
          return "not allowed";
        }
        this.i.reloadMessages();
        return this.i.getMessage("en", "Module/I18n/reload/reloadedMessages");
      },
      "locale": {
        "get": (_args, _opts, message) => {
          return this.config.findOrCreate({
            where: {
              id: message.channel.id
            }
          }).spread(config => `${message.author.mention} ${config.locale}`);
        },
        "set": (args, _opts, message) => {
          const id = message.channel.id;
          const locale = args[0];
          return this.config.findOrCreate({
            where: {
              id
            }
          }).spread(config => {
            config.locale = locale;
            return config.save().then(() => `${
              message.author.mention
            } ${
              this.i.getMessage("en", "Module/I18n/setLocale/setLocale", locale)
            }`);
          });
        },
      },
      "message": {
        "get": (args) => {
          const locale = args[0];
          const path = args[1];

          this.logger.debug(`Getting message "${path}" for locale "${locale}"`);

          const message = this.i.getMessage(locale, path);
          return message || this.i.getMessage("en", "Module/I18n/getMessage/noneFound", { path, locale });
        },
      },
    });
  }
}

module.exports = I18n;
