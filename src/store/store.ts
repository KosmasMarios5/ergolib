import { applyMiddleware, compose, createStore, StoreCreator } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router'
import axiosMiddleware, {
  ImportedRequestHandlers,
  ImportedRequestHandlersOptions
} from './middleware/axios'
import index, {
  ImportedReducers,
  ImportedReducersConfiguration
} from './middleware/reducers'
import storage from 'redux-persist/es/storage'

export interface Config {
  /**
   * Key refers to the local storage key
   */
  key: string
  /**
   * Choose which reducers to persist on local storage. Typically, you must persist the `currentUser` reducer.
   */
  whitelist: Array<string>
  /**
   * import immutableTransform from 'redux-persist-transform-immutable'
   * and pass it into configuration
   */
  immutableTransform: Function
}

export interface MainStoreParams {
  middleware: Array<any>
  config: Config
  requestHandlerConfigurations: {
    requestHandler: ImportedRequestHandlers
    requestHandlerOptions: ImportedRequestHandlersOptions
  }
  reducerConfigurations: {
    importedReducers: ImportedReducers
    options: ImportedReducersConfiguration
  }
}

// if (process.env.NODE_ENV === `development`) {
//   const logger = createLogger({
//     stateTransformer: (state) =>
//       Object.keys(state).reduce((p, n) => {
//         return {
//           ...p,
//           n: Immutable.isImmutable(state[n]) ? state[n].toJS() : state[n]
//         }
//       }, {})
//   })
//   middleWare.push(logger)
// }
const mainStore = ({
  config,
  middleware = [],
  requestHandlerConfigurations,
  reducerConfigurations
}: MainStoreParams): ReturnType<StoreCreator> => {
  middleware.push(
    axiosMiddleware(
      requestHandlerConfigurations.requestHandler,
      requestHandlerConfigurations.requestHandlerOptions
    )
  )
  middleware.push(routerMiddleware(reducerConfigurations.options.history))
  return createStore(
    persistReducer(
      {
        key: config.key,
        transforms: [
          config.immutableTransform({
            whitelist: config.whitelist
          })
        ],
        whitelist: config.whitelist,
        storage
      },
      index(
        reducerConfigurations.importedReducers,
        reducerConfigurations.options
      )
    ),
    compose(applyMiddleware(...middleware))
  )
}

export default mainStore

export type RootState = {
  [stateName: string]: any
}
export type AppDispatch = Function
