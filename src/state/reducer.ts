import application from './application/reducer'
import { combineReducers } from '@reduxjs/toolkit'
import lists from './lists/reducer'
import multicall from './multicall/reducer'
import user from './user/reducer'

const reducer = combineReducers({
  application,
  user,
  multicall,
  lists,
})

export default reducer
