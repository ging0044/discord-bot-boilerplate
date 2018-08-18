/**
 * The interface that must be implemented by a dependency to be loaded
 *
 * @interface Dependency
 */

/**
 * The function called to get the final value of the dependency. Whatever is
 * returned by this function is what will be returned when other files get it
 * from the {@link DependencyManager}
 *
 * @function
 * @name Dependency#execute
 * @return {*} The dependency to be stored and provided to other files
 */
