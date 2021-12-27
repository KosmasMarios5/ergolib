import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import { connectRouter } from 'connected-react-router'
import { Reducer } from '../../loadModule'
import { ActionCreator } from '../../../helpers'

export interface ImportedReducers {
  [reducerName: string]: Reducer
}

export interface ImportedReducersConfiguration {
  persistOnLogout: Array<string>
  history: any
}

const index =
  (
    importedReducers: ImportedReducers,
    importedReducersConfiguration: ImportedReducersConfiguration
  ) =>
  (
    state: {
      [stateName: string]: any
    },
    action: ActionCreator
  ) => {
    const createReducer =
      ({ initialState, handlers }: Reducer) =>
      (state = fromJS(initialState), action: ActionCreator) =>
        // eslint-disable-next-line no-prototype-builtins
        handlers && handlers.hasOwnProperty(action.type)
          ? handlers[action.type](state, action)
          : state

    const appReducers = combineReducers(
      Object.keys(importedReducers).reduce(
        (result, key) => {
          return {
            ...result,
            [key]: createReducer(importedReducers[key])
          }
        },
        {
          router: connectRouter(importedReducersConfiguration.history)
        }
      )
    )

    if (action.type === 'USER_LOGOUT') {
      Object.keys(state).forEach((key) => {
        const keep = importedReducersConfiguration.persistOnLogout
          ? importedReducersConfiguration.persistOnLogout
          : []
        if (!keep.includes(key)) {
          state[key] = undefined
        }
      })
    }
    // @ts-ignore
    return appReducers(state, action)
  }

export default index
