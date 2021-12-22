import queryString from 'query-string'
import { Route } from './routeCreator'
/**
 * Construct a url to the supplied route.
 * @param route
 * @param parameters - Path parameters
 * @param queryParameters - Query string parameters
 */
export const getRouteUrl = (route: Route, parameters, queryParameters) => {
  if (!route) return ''
  const { path } = route
  let url = parameters
    ? Object.keys(parameters).reduce(
        (previous, key) =>
          previous
            .replace(`:${key}?`, parameters[key])
            .replace(`:${key}`, parameters[key]),
        path
      )
    : path
  url = url.replace(/\/:.*\?/, '')
  if (!queryParameters) return url
  return url + '?' + queryString.stringify(queryParameters)
}
