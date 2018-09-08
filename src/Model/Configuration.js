const dependencyManager = require("../DependencyManager").getInstance();
const db = dependencyManager.get("db");
const Sequelize = db.constructor;

const Configuration = db.define("configuration", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },

  locale: {
    type: Sequelize.STRING,
    defaultValue: "en",
  },
}, {
  paranoid: true,
  underscored: true,
});

Configuration.sync();

module.exports = Configuration;
