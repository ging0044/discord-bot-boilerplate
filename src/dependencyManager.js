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

  /**
   * Check if there is a value at the given key
   *
   * @param {string} name The key to check
   * @returns {boolean} True if value at key exists
   */
  has(name) {
    return this.store.has(name);
  }

  /**
   * Clear all dependencies
   *
   * @return void
   */
  clear() {
    return this.store.clear();
  }

  /**
   * Delete a dependency by key
   *
   * @param {string} name Key to delete
   * @returns {boolean} True if successful
   */
  delete(name) {
    return this.store.delete(name);
  }

  /**
   * Get the entries of the dependency map
   *
   * @returns {IterableIterator<[string , *]>}
   */
  entries() {
    return this.store.entries();
  }

  /**
   * Get the keys of the dependency map
   *
   * @returns {IterableIterator<string>}
   */
  keys() {
    return this.store.keys();
  }

  /**
   * Get the values of the dependency map
   *
   * @returns {IterableIterator<string>}
   */
  values() {
    return this.store.values();
  }

  /**
   * Do something to an element of the dependency map
   *
   * @callback forEachCallback
   * @param {string} key The key of the current element
   * @param {*} value The value of the map at the current iteration
   * @param {Map<string, *>} map The entire dependency map
   */

  /**
   * Do something for each element in the map
   *
   * @param {forEachCallback} fn The function to call for each
   * element of the map
   */
  forEach(fn) {
    return this.store.forEach(fn);
  }

  /**
   * Get the size of the map
   *
   * @returns {number} The size of the underlying dependency map
   */
  get size() {
    return this.store.size;
  }
}

module.exports = new DependencyManager(new Map());
