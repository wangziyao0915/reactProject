import {combineReducers} from "redux"
import Test from "./test"
import Grade from "./grade"

let rootReducer =combineReducers({
    Test,
    Grade   
})



export default rootReducer