import {call,put,takeEvery,all} from "redux-saga/effects"
import savaGradeTolocal  from "./saveGrade"
import text from "./test"



function* mySaga(){
yield   all([takeEvery ("SAVE_GRADE_TO_LOCAL",savaGradeTolocal),takeEvery("GET_TEST_DATA",text)])  


}
export default mySaga