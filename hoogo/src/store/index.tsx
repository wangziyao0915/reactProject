import {createStore,applyMiddleware,compose} from "redux"



import  reducer from "./reducer"
import logger from "redux-logger"
import creactsagamiddware from "redux-saga"
import sagas from "./saga"
let sagaMidderWare =creactsagamiddware()
let middleware = [applyMiddleware(sagaMidderWare),applyMiddleware(logger)]

 const store = createStore(reducer,compose(...middleware))
 sagaMidderWare.run(sagas)
 export default store
