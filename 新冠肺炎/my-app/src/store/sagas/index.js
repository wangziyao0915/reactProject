

import {call,put,takeEvery,all} from 'redux-saga/effects'

import {JSONP} from '../../untils'
import {CHINA_TOTAL,CHINA_ADD,TOTAL_DATA,AREA_TREE} from '../types'
function* fetchTotalDataSaga(){
    let res=yield call(JSONP,'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&_=1580698876306','totalData')
    // console.log(res)
    yield put({
        type:CHINA_ADD,
        payload:res.chinaAdd
    })


    yield put({
        type:AREA_TREE,
        payload:res.areaTree 
    })

    yield put({
        type:CHINA_TOTAL,
        payload:res.chinaTotal 
    })

    yield put({
        type:TOTAL_DATA,
        payload:{
            chinaDayList:res.chinaDayList,
            chinaDayAddList:res.chinaDayAddList,
            dailyNewAddHistory:res.dailyNewAddHistory,
            dailyDeadRateHistory:res.dailyDeadRateHistory,
            areaTree:res.areaTree,
            articalList:res.articalList
            
        } 
    })

   

}

function* watchTotalDataAction(){
    yield takeEvery('FETCH_TOTAL_DATA',fetchTotalDataSaga)
}


function* rootSaga(){
    yield all([
        watchTotalDataAction()
    ])
}

export default rootSaga