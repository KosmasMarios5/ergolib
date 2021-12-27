import axios from 'axios'
import _ from 'lodash'
import { getRouteUrl } from '../../../helpers'
import { Middleware } from 'redux'
import { ApiHandler } from '../../loadModule'

type RootState = {
  [stateName: string]: any
}

export interface ImportedRequestHandlers {
  [handlerName: string]: ApiHandler
}

export interface ImportedRequestHandlersOptions {
  baseUrl: ((state: RootState) => string) | string
  useTokenCredentials?: boolean
  handleUnauthenticatedResponse?: Function
}

const axiosMiddleware =
  (
    requestHandler: ApiHandler,
    options: ImportedRequestHandlersOptions
  ): Middleware<{}, RootState> =>
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    next(action)
    Object.keys(requestHandler).forEach((key) => {
      const handler = requestHandler[key]
      if (!(handler && handler[action.type])) return
      const {
        method,
        data: unProcessedData,
        onSuccess,
        onFailure,
        headers,
        overrideTask,
        url: path,
        hasPathParameters
      } = handler[action.type](action.payload)

      // eslint-disable-next-line one-var
      let url = path,
        data = unProcessedData,
        pathParameters

      // pass data as query parameters on GET/DELETE requests
      const dataOrParams = ['GET', 'DELETE'].includes(method)
        ? 'params'
        : 'data'

      // remove possible path parameters passed by calling components, path parameters:
      // 1) should be defined as an array at the request definition (api.js file, hasPathParameters property)
      // 2) be removed from data to differentiate from query parameters
      if (hasPathParameters && hasPathParameters.length > 0) {
        data = _.omit(unProcessedData, hasPathParameters)
        pathParameters = _.pick(unProcessedData, hasPathParameters)
        url = getRouteUrl(
          {
            component: 'div',
            key: '',
            name: '',
            routeOptions: {},
            path: path
          },
          pathParameters
        )
      }
      const {
        baseUrl,
        useTokenCredentials = false,
        handleUnauthenticatedResponse
      } = options
      const state = getState()
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      if (useTokenCredentials) {
        const accessToken = state.currentUser.get('token')
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      }
      const request = overrideTask
        ? overrideTask(data)
        : axios.create({ withCredentials: !useTokenCredentials }).request({
            url: (typeof baseUrl === 'string' ? baseUrl : baseUrl(state)) + url,
            method,
            headers,
            [dataOrParams]: data
          })
      request
        .then((response: { data: any }) => {
          if (onSuccess) {
            dispatch(onSuccess(response.data, unProcessedData))
          }
        })
        .catch((error: { message: any; response: any }) => {
          if (onFailure) {
            let { message, response } = error
            if (
              action.type !== 'USER_LOGIN' &&
              response &&
              response.status === 401 &&
              response.statusText === 'Unauthorized' &&
              handleUnauthenticatedResponse
            ) {
              return handleUnauthenticatedResponse(dispatch, response)
            }
            if (response && response.data && response.data.error) {
              message = response.data.error
            }
            if (response && response.data && response.data.message) {
              message = response.data.message
            }
            dispatch(onFailure({ message: message }, unProcessedData))
          }
        })
    })
  }
export default axiosMiddleware
