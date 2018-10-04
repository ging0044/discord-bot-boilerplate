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
      args = shift(args);
      if (handler instanceof Command) {
        return handler.execute(args, ...params);
      }
      else if (typeof handler === "function") {
        return handler(args._, args, ...params);
      }
      else if (typeof handler === "object") {
        handler = handler[args._[0]];
      }
      else {
        throw new Error(`Unknown command ${args._[0]}`);
      }
    }
  }
}

module.exports = Command;
