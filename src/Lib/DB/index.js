const Sequelize = require("sequelize");
const Lib = require("..");

const config = require("../../../config/db.config");

class DB extends Lib {
  constructor() {
    super();

    this.connection = new Sequelize(config);

    this.connection.authenticate()
      .then(
        () => this.getLogger().info("Connection successfully established"))
      .catch(
        (err) => this.getLogger().error("Failed to establish connection: ", err));
  }

  execute() {
    return this.connection;
  }
}

module.exports = DB;
