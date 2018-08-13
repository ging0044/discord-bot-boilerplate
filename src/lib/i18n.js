const Lib = require("../lib");
const R = require("ramda");
const cldr_data = require("cldr-data");
const Globalize = require("globalize");

console.info("Loading all the locale stuff into ram...");
Globalize.load(cldr_data.all());
// TODO: load message files too
const i = R.reduce(// TODO: make sure this works (how much RAM?)
  (acc, loc) => {
    acc[loc] = new Globalize(loc);
    return acc;
  },
  {},
  cldr_data.availableLocales
);

class Internationalization extends Lib {
  constructor(loc) {
    super();

    this.includes.register(this.name, Internationalization);
  }

  static m(loc, message) {
    return `${message} in ${loc}`; // TODO: get message, if missing, add to files somehow
  }

  // TODO: add wrappers around a bunch of i18n stuff (pluralize, dates, whatever)
}

Internationalization.i = i;

module.exports = new Internationalization();
