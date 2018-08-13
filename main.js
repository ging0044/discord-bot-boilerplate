require("dotenv").config();

// require dependency manager
const dependencies = require("./src/dependencies");
dependencies.init(new Map()); // TODO: clean up main.js

class Main {
  constructor() {
    this.version = "0.0.0";
  }
}

dependencies.register("main", new Main());

const { requireDir } = require("./src/utils.js");

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
  const logger = dependencies.get("logger");
  logger("Main").info("Finished requiring files");
}).catch(err => {
  console.error(err, err.stack);
  process.exit(1);
});
