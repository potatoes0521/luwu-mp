
import { combineReducers } from 'redux'
import user_msg from './modules/user_msg'
import system from './modules/system'

export default combineReducers({
  user_msg,
  system
})
