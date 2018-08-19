const Lib = require("..");
const cldr_data = require("cldr-data");
const path = require("path");
const Globalize = require("globalize");

const MESSAGE_PATH = path.resolve("i18n/", "messages");

class Internationalization extends Lib {
  constructor() {
    super();

    Globalize.load(cldr_data.entireSupplemental());
    Globalize.loadMessages(require(MESSAGE_PATH));

    this._instances = {};

    this.getMessage = this.getMessage.bind(this);
  }

  static newInstance(locale) {
    Globalize.load(cldr_data.entireMainFor(locale));
    return new Globalize(locale);
  }

  _getLocaleInstance(locale) {
    if (this._instances[locale]) {
      return this._instances[locale];
    }
    this._instances[locale] = Internationalization.newInstance(locale);
    return this._instances[locale];
  }

  getMessage(locale, path, ...args) {
    const instance = this._getLocaleInstance(locale);

    try {
      return instance.formatMessage(path, ...args);
    }
    catch(_) {
      this.getLogger().warn(
        `No message "${path}" found for locale "${locale}"`
      );
      this.addMessage(locale, path)
        .catch(error =>
          this.getLogger().warn(
            `Unable to add message for "${locale}": "${path}"\n${
              error.stack
            }`
          ));

      return `No translation available for "${path}" in "${locale}"`;
    }
  }

  reloadMessages() {
    delete require.cache[require.resolve(MESSAGE_PATH)];

    this.getLogger().info("Reloading message file");
    Globalize.loadMessages(require(MESSAGE_PATH));
  }

  // TODO: add wrappers around a bunch of i18n stuff (pluralize, dates, whatever)

  execute() {
    this.getLogger().info("Ready");
    return this;
  }
}

module.exports = Internationalization;
