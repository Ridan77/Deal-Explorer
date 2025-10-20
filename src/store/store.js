import { legacy_createStore as createStore, combineReducers } from 'redux'

import { dealReducer } from './reducers/deal.reducer'
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
    dealModule: dealReducer,
    systemModule: systemReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
  const { savedDeals } = store.getState().dealModule
  localStorage.setItem('SAVED_DEALS', JSON.stringify(savedDeals))
})

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })