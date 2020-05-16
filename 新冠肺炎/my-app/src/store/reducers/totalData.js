
import {TOTAL_DATA} from '../types'


 function totalData(state={},action){
    if(action.type===TOTAL_DATA){
        return {
            ...state,
            ...action.payload
        }
    }
    return state
}

export default totalData