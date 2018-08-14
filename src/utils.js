const util = require("util");
const fs = require("fs");
const path = require("path");

const readDirP = util.promisify(fs.readdir);

const findFiles =
module.exports.findFiles = readDirP;

const requireDir =
module.exports.requireDir = dir =>
  findFiles(dir)
    .then(files =>
      files.map(file =>
        require(path.resolve(dir, file))));
