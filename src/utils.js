const util = require("util");
const fs = require("fs");
const path = require("path");

const R = require("ramda");

const readDirP = util.promisify(fs.readdir);

const findFiles =
module.exports.findFiles = readDirP;

const requireDir =
module.exports.requireDir = dir =>
  findFiles(dir)
    .then(files =>
      R.map(
        R.compose(
          require,
          R.partial(path.resolve, [dir])),
        files));
