import {combineReducers} from 'redux'
import chinaTotal from './chinaTotal'
import chinaAdd from './chinaAdd'
import totalData from './totalData'
import areaTree from './areaTree'
import dialog from './dialog'
export default combineReducers({
    chinaTotal,
    chinaAdd,
    totalData,
    areaTree,
    dialog
})