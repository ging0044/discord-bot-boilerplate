/**
 * App class contains the information about the bot itself.
 */
class App {
  constructor() {
    this._meta = require("../../package");

    /**
     * The current version of the bot
     *
     * @name App#version
     * @type {string}
     */
    this.version = this._meta.version;
  }
}

module.exports = App;
