function shift(argv) {
  return Object.assign(
    argv,
    {
      _: argv._.slice(1)
    }
  );
}

class Command {
  constructor(commands = {}) {
    this._commands = commands;
  }

  addCommand(name, handler) {
    this._commands[name] = handler;
  }

  execute(argv, ...params) {
    Command.execute(this._commands, argv, ...params);
  }

  static execute(handlers, argv, ...params) {
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
}

module.exports = Command;
