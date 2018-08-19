const Module = require(".");

class I18n extends Module {
  constructor() {
    super();

    this.root = this.discord.registerCommand(
      "i18n",
      () => {
        return "some stats";
      },
      {
        description: this.i.getMessage("en", "Module/I18n/description")
      }
    );
  }

  execute() {
    this.root.registerSubcommand(
      "reload",
      () => {
        this.i.reloadMessages();
        return this.i.getMessage("en", "Module/I18n/reload/reloadedMessages");
      },
      {
        description: this.i.getMessage("en", "Module/I18n/reload/description"),
        requirements: {
          userIDs: [
            "122351209486090240",
          ]
        }
      }
    );

    this.root.registerSubcommand(
      "getMessage",
      (msg, args) => {
        const locale = args[0];
        const path = args[1];

        this.logger.debug(`Getting message "${path}" for locale "${locale}"`);

        const message = this.i.getMessage(locale, path);
        return message || this.i.getMessage("en", "Module/I18n/getMessage/noneFound", { path, locale });
      },
      {
        argsRequired: true,
        usage: this.i.getMessage("en", "Module/I18n/getMessage/usage"),
        description: this.i.getMessage("en", "Module/I18n/getMessage/description")
      }
    );
  }
}

module.exports = I18n;
