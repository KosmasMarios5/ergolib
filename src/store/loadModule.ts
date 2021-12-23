export interface Module = {

}

const _modules = []
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
  loadRoutes: (modules = _modules) => {
    const routes = modules.reduce((prv, curr) => {
      const { routes, modules } = curr
      return {
        ...prv,
        ...(modules ? Module.loadRoutes(modules) : {}),
        ...(routes || {})
      }
    }, _router)
    return Object.keys(routes).map((key) => routes[key])
  },
  getTranslations: (modules = _modules) => {
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
  getRequestHandlers: (modules = _modules) => {
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
  loadReducers: (modules = _modules) => {
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
