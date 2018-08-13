require("dotenv").config();
const dependencyManager = require("./src/dependencyManager");
const { requireDir } = require("./src/utils.js");
// TODO: clean up main.js

class Main {
  constructor() {
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
