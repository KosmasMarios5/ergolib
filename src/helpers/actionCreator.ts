export interface ActionCreator {
  /**
   * Type is the **unique** identifier for this action
   */
  type: string
  /**
   * Payload for this event
   */
  payload?: Object
  /**
   * Optional parameters
   */
  parameters?: Object
}

/**
 * An action creator defines an event to be used in your application.
 * Returns a function that should be called when an event is dispatched using
 * the `dispatch` redux method, passing payload data and parameters if any.
 * @param type
 * @returns function
 */
export const actionCreator =
  (type: string) =>
  (payload?: Object, parameters?: Object): ActionCreator => ({
    type,
    payload,
    parameters
  })
