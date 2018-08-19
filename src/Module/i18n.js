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
  }
}

module.exports = I18n;
