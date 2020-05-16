import {createStore,applyMiddleware,compose} from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

const sagsMiddleware=createSagaMiddleware()
const middlewares=[sagsMiddleware]


const store=createStore(reducer,applyMiddleware(compose(...middlewares)))
sagsMiddleware.run(sagas)
export default store