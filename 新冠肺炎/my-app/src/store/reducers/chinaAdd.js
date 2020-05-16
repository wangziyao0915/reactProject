import {CHINA_ADD} from '../types'


function chinaAdd(state=[],action){
    if(action.type===CHINA_ADD){
        return action.payload
    }
    return state
}
export default chinaAdd