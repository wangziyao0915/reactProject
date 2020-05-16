import {call} from "redux-saga/effects"
import {savaGrade} from "../../apis"
function* saveGrade(action:any){

 yield call(savaGrade,action.payload)

}

export default  saveGrade
