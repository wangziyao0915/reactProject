import {AREA_TREE} from '../types'


function areaTree(state=[],action){
    if(action.type===AREA_TREE){
        return action.payload
    }
    return state
}
export default areaTree