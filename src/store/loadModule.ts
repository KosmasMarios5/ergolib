import { Request as RequestInterface, Route } from '../helpers'

/**
 * A reducer holds application/module global state information.
 * You can read more about reducers and redux [here](https://redux.js.org/).
 */
export interface Reducer {
  [reducerName: string]: {
    /**
     * Default reducer state
     */
    initialState: Object
    handlers: {
      [actionType: string]: (state: Object, action: Object) => typeof state
    }
  }
}

export interface ApiHandler {
  [actionType: string]: RequestInterface
}

export interface Actions {
  [actionType: string]: RequestInterface
}

export interface Module {
  name: string
  modules?: Array<Module>
  actions?: Object
  types?: Object
  reducer?: Reducer
  api?: ApiHandler
  locales?: Object
  routes?: Object
}

const _modules: Array<Module> = []
let _router = {}
let _locales = {}
let _api = {}
let _reducer = {}

const Module = {
  load: (module: Module) => {
    _modules.push(module)
  },
  addLocales: (locales: Object) => {
    _locales = {
      ..._locales,
      ...locales
    }
  },
  addRoutes: (routes: Object) => {
    _router = {
      ..._router,
      ...routes
    }
  },
  addRequestHandlers: (api: Object) => {
    _api = {
      ..._api,
      ...api
    }
  },
  addReducers: (reducers: Object) => {
    _reducer = {
      ..._reducer,
      ...reducers
    }
  },
  loadRoutes: (modules = _modules): Array<Route> => {
    const routes: Object = modules.reduce((prv, curr) => {
      const { routes, modules } = curr
      return {
        ...prv,
        ...(modules ? Module.loadRoutes(modules) : {}),
        ...(routes || {})
      }
    }, _router)
    return Object.keys(routes).map((key) => routes[key])
  },
  getTranslations: (modules = _modules): Object => {
    return modules.reduce((prv, curr) => {
      const { name, locales, modules } = curr
      if (!locales) return prv
      return {
        ...prv,
        ...(modules ? Module.getTranslations(modules) : {}),
        ...(locales ? { [name]: locales } : {})
      }
    }, _locales)
  },
  getRequestHandlers: (modules = _modules): Object => {
    return modules.reduce((prv, curr) => {
      const { name, api, modules } = curr
      if (!api) return prv
      return {
        ...prv,
        ...(modules ? Module.getRequestHandlers(modules) : {}),
        [name]: api
      }
    }, _api)
  },
  loadReducers: (modules = _modules): Object => {
    return modules.reduce((prv, curr) => {
      const { name, reducer, modules } = curr
      if (!reducer) return prv
      return {
        ...prv,
        ...(modules ? Module.loadReducers(modules) : {}),
        [name]: {
          initialState: reducer.initialState,
          handlers: reducer.handlers
        }
      }
    }, _reducer)
  }
}

Object.freeze(Module)

export default Module
