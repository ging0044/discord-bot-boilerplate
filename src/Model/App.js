/**
 * App class contains the information about the bot itself.
 */
class App {
  constructor() {
    /**
     * The current version of the bot
     *
     * @name App#version
     * @type {string}
     */
    this.version = "0.0.0";
  }

  execute() {
    return this;
  }
}

module.exports = App;
