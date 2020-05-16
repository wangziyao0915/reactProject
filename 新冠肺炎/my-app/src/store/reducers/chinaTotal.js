import {CHINA_TOTAL} from '../types'


function chinaTotal(state=[],action){
    if(action.type===CHINA_TOTAL){
        return action.payload
    }
    return state
}
export default chinaTotal