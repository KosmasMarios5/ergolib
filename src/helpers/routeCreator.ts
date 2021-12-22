export interface Route {
  component: keyof JSX.IntrinsicElements
  /**
   * The front-end url.
   */
  path: string
  /**
   * A generic page Title
   */
  name: string
  /**
   * `important` A **unique** route key. This value **must be unique** among all routes
   */
  key: string
  /**
   * Use {exact: true} for pages that do not accept path parameters.
   */
  routeOptions?: Object
}

/**
 * A route creator defines an internal application route.
 * @see https://reactrouter.com/
 */
export const routeCreator = (
  component: keyof JSX.IntrinsicElements,
  relativePath: string,
  name: string,
  key: string,
  routeOptions?: Object
): Route => ({
  component: component,
  path: relativePath,
  name: name,
  key: key,
  ...(routeOptions || {})
})
