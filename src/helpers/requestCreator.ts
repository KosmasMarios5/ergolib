/**
 * Definition of an API request or side effect that should be triggered every
 * time an event is dispatched.
 */
export interface Request {
  /**
   * Url to send the request to. If it contains any parameters they should be
   * defined using the character `:` before the parameter.
   * ex. /user/:id/details
   */
  url?: string
  /**
   * If the specified url contains any path parameters, define them explicitly
   * using this parameter.
   * ex. ['id'] or ['OrderSheetId', 'CategoryId']
   */
  hasPathParameters?: Array<string>
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT'
  /**
   * Event to dispatch on success. Typically, this should be an action.
   * @see actionCreator
   */
  onSuccess?: Function
  /**
   * Event to dispatch on failure. Typically, this should be an action.
   * @see actionCreator
   */
  onFailure?: Function
  /**
   * Use this parameter if you do not want to fire an http request when handling
   * a dispatched action. This includes cases like:
   * - triggering an app redirect
   * - you want to use mock data for an API endpoint that is not yet implemented
   * @see actionCreator
   */
  overrideTask?: (data: Object) => Promise<any>
}

export interface CreatedRequest extends Request {
  data: Object
}

export const requestCreator =
  (request: Request): ((data: Object) => CreatedRequest) =>
  (data: Object) => {
    return {
      ...request,
      data: data
    }
  }
