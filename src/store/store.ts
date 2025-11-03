import { legacy_createStore as createStore, combineReducers } from "redux"

import { dealReducer } from "./reducers/deal.reducer"

const rootReducer = combineReducers({
  dealModule: dealReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const middleware = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  const { savedDeals } = store.getState().dealModule
  localStorage.setItem("SAVED_DEALS", JSON.stringify(savedDeals))
})

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
