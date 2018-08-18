const Lib = require("..");
const cldr_data = require("cldr-data");
const Globalize = require("globalize");
// TODO: load message files too

class Internationalization extends Lib {
  constructor() {
    super();

    this.loadI18nData()
      .then(() =>
        this.getLogger().info("Loaded i18n stuff"))
      .catch((e) =>
        this.getLogger().error(`Failed to load i18n stuff: ${e}\n${e.stack}`));
  }

  execute() {
    return Internationalization;
  }

  async loadI18nData() {
    return await new Promise((resolve, reject) => {
      try {
        process.stdout.write("Loading all the locale stuff into ram...\n");
        Globalize.load(cldr_data.all());

        Internationalization.i = cldr_data.availableLocales.reduce((acc, loc) => {
          acc[loc] = new Globalize(loc);
          return acc;
        }, {});
        resolve();
      }
      catch (e) {
        reject(e);
      }
    });
  }

  static m(loc, message) {
    return `${message} in ${loc}`; // TODO: get message, if missing, add to files somehow
  }

  // TODO: add wrappers around a bunch of i18n stuff (pluralize, dates, whatever)
}

module.exports = Internationalization;
