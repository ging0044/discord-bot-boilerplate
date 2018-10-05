function shift(argv) {
  return Object.assign(
    argv,
    {
      _: argv._.slice(1)
    }
  );
}

function id(a) {
  return a;
}

class Command {
  constructor(commands = {}, opts = {}) {
    const { description = "", usage = "" } = opts;
    this._commands = commands;
    this._description = description;
    this._usage = usage;
  }

  addCommand(name, handler) {
    this._commands[name] = handler;
    return this;
  }

  setCommands(commands) {
    this._commands = commands;
    return this;
  }

  setDescription(description) {
    this._description = description;
    return this;
  }

  getDescription() {
    return this._description;
  }

  setUsageText(text) {
    this._usage = text;
    return this;
  }

  getUsageText() {
    return this._usage;
  }

  evaluate(argv, ...params) {
    return Command.evaluate(this._commands, argv, ...params);
  }

  static evaluate(handlers, argv, ...params) {
    let handler = handlers[argv._[0]];
    let args = argv;

    for (;;) {
      if (handler instanceof Command) {
        return handler.evaluate(shift(args), ...params);
      }
      else if (typeof handler === "function") {
        const a = shift(args);
        return handler(a._, a, ...params);
      }
      else if (typeof handler === "object") {
        handler = handler[shift(args)._[0]];
      }
      else {
        throw new Error(`Unknown command ${args._[0]}`);
      }
    }
  }

  static getHelpText(translator = id) {

  }

  execute() {
    return Command;
  }
}

module.exports = Command;
