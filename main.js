require("dotenv").config();
const dependencyManager = require("./src/dependencyManager");
const { requireDir } = require("./src/utils.js");
// TODO: clean up main.js

/**
 * Main class contains the information about the bot itself.
 */
class Main {
  constructor() {
    /**
     * The current version of the bot
     *
     * @name Main#version
     * @type {string}
     */
    this.version = "0.0.0";
  }
}
dependencyManager.register("main", new Main());

const sources = [
  "./src/lib",
  "./src/models",
  "./src/modules",
];

Promise.all(
  sources.map(dir =>
    requireDir(dir)
      .catch(err => {
        throw new Error(
          `Error encountered while requiring from "${dir}": ${err}${"\n"
          }${err.stack}`
        );
      })
  )
).then(() => {
  const logger = dependencyManager.get("logger");
  logger("Main").info("Finished requiring files");
}).catch(err => {
  process.stderr.write(`${err.toString()}\n${err.stack.toString()}\n`);
  process.exit(1);
});
