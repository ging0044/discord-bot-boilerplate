class Module {
  constructor() {
    this.name = this.constructor.name;
    this.includes = require("./dependencies");

    this.logger = this.require("logger")(this.name);
    this.discord = this.require("discord");
    this.i = this.require("internationalization");
  }

  require(name) {
    return this.includes.get(name);
  }
}

module.exports = Module;