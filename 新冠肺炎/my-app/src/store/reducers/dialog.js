import {TOGGLE_DIALOG} from '../types'

function dialog(state=false,action){
    if(action.type===TOGGLE_DIALOG){
        return !state
    }
    return state
}
export default dialog