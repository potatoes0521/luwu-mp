import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'

const middlewares = [
  thunkMiddleware,
  createLogger()
]

export default createStore(rootReducer, applyMiddleware(...middlewares))
