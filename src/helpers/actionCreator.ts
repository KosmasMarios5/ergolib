/**
 * An action creator defines an event to be used in your application.
 * Returns a function that should be called when an event is dispatched using
 * the `dispatch` redux method, passing payload data and parameters if any.
 * @param type
 * @returns function
 */
export const actionCreator = (type: string) => {
  /**
   * @param payload - Action payload for this event
   * @param parameters - Optional parameters
   */
  return (payload?: Object, parameters?: Object) => ({
    type,
    payload,
    parameters
  })
}
