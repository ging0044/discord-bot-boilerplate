class Lib {
  constructor() {
    this.name = this.constructor.name;
    this.includes = require("./dependencies");
  }
}

module.exports = Lib;