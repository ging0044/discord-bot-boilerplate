class DependencyManager {
  constructor() {
    this.setStore = this.setStore.bind(this);
    this.get = this.get.bind(this);
    this.register = this.register.bind(this);
  }

  /**
   * Initialize the dependency manager with some way to store the deps
   *
   * @param {Map} store Something to put the dependencies into
   * @return undefined
   */
  setStore(store) {
    this.store = store;
  }

  /**
   * Get one or more dependencies from the store
   *
   * @param {...string} names One or more names of dependencies
   * @return {*|Object<string, *>} The dependency,
   * if one name is passed, or an object of dependencies mapped to
   * their names if more than one
   */
  get(...names) {
    names = names.map(name => name.toLocaleLowerCase());

    if (names.length === 1) {
      return this.getOne(names[0]);
    }

    return names.reduce((acc, name) => {
      acc[name] = this.getOne(name);
      return acc;
    }, {});
  }

  /**
   * Get a single dependency from the store
   *
   * @param {string} name The name of the depenency to get
   * @returns {*} The dependency at that name
   */
  getOne(name) {
    if (!this.store.has(name)) {
      throw new Error(`No dependency found for ${name}`);
    }

    return this.store.get(name);
  }

  /**
   * Register a dependency
   *
   * @param {string} name The name to be used to access this dependency
   * @param {*} dep The dependency itself
   * @return undefined
   */
  register(name, dep) {
    this.store.set(name.toLocaleLowerCase(), dep);
  }
}

module.exports = new DependencyManager(new Map());
