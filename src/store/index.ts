import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { StoreNameSpace } from '../constants'

import { userSlice } from './user/state'
import { dataSlice } from './data/state'

const rootReducer = combineReducers({
  [StoreNameSpace.User]: userSlice.reducer,
  [StoreNameSpace.Data]: dataSlice.reducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
