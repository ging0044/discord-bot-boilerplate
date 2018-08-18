const util = require("util");
const fs = require("fs");
const path = require("path");

const config = require("../../dependencies");

const readdirPromise = util.promisify(fs.readdir);

class DependencyManager {
  constructor() {
    this._runtimeDirectories = config.runtimeDirectories;
    this._dependencies = new Map();

    this.get = this.get.bind(this);
    this.bootstrap = this.bootstrap.bind(this);
  }

  /**
   * Get the singleton instance of the Dependency Manager
   *
   * @returns {DependencyManager}
   */
  static getInstance() {
    if (DependencyManager._instance) {
      return DependencyManager._instance;
    }
    DependencyManager._instance = new DependencyManager();

    return DependencyManager._instance;
  }

  /**
   * Returns a depenendency by name, or undefined if it does not exist
   *
   * @param name
   * @returns {Dependency | undefined}
   */
  get(name) {
    return this._dependencies.get(name.toLocaleLowerCase());
  }

  /**
   * Require all of the files in the runtimeDirectories
   *
   * @returns undefined
   */
  bootstrap() {
    this._runtimeDirectories.forEach(directory =>
      DependencyManager
        .requireDirectory(directory)
        .then(dependencies =>
          dependencies.map(dependency =>
            new dependency()))
        .then(dependencies =>
          dependencies.map(dependency => [
            dependency.constructor.name, // TODO: use a config file for names, this is not good
            dependency.execute && dependency.execute()
          ]))
        .then(dependencies =>
          dependencies.map(([name, dependency]) =>
            dependency
              ? this._dependencies.set(
                name.toLocaleLowerCase(),
                dependency)
              : undefined))
        .catch(err =>
          process.stderr.write(`Failed to load libs: ${err}\n${err.stack}`)));
  }

  /**
   * Require an entire directory
   *
   * @param {string} directory the path that should be required
   * @returns {Promise<Array<Function>>} Promise that resolves to the exported
   * classes of all of the files in the directory
   */
  static requireDirectory(directory) {
    return readdirPromise(directory)
      .then(files =>
        files.map(file =>
          require(path.resolve(".", directory, file))));
  }
}

module.exports = DependencyManager;
