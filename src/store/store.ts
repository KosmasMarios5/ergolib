// @flow
import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router'
// import { createLogger } from 'redux-logger'
import Immutable from 'immutable'
import axiosMiddleware, {
  type Options as RequestHandlerOptions
} from './middleware/axios'
import history from './history'
import reducers from '../reducers/reducers'

type Options = {
  addLogger?: boolean
}

const mainStore = (
  config,
  requestHandler,
  requestHandlerOptions: RequestHandlerOptions,
  importedReducers,
  options: Options
) => {
  const { addLogger = false } = options
  const middleWare = []
  middleWare.push(axiosMiddleware(requestHandler, requestHandlerOptions))
  middleWare.push(routerMiddleware(history))
  // if (addLogger) {
  //   const logger = createLogger({
  //     stateTransformer: (state) => {
  //       return Object.keys(state).reduce((p, n) => {
  //         return {
  //           ...p,
  //           [n]: Immutable.isImmutable(state[n]) ? state[n].toJS() : state[n]
  //         }
  //       }, {})
  //     }
  //   })
  //   middleWare.push(logger)
  // }
  return createStore(
    persistReducer(config, reducers(importedReducers)),
    compose(applyMiddleware(...middleWare))
  )
}

export default mainStore
