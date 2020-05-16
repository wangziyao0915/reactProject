import { call, takeEvery, put } from 'redux-saga/effects';
import JSONP from '../../utils/jsonp.js';

function* getChinaData() {
    let res = yield call(JSONP, 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&_=1580698876310', 'totalMothods');
    console.log(res);
    if (res) {
        yield put({
            type: 'CHINA_DATA',
            payload: {
                lastUpdateTime: res.lastUpdateTime,
                chinaTotal: res.chinaTotal,
                chinaAdd: res.chinaAdd,
                isShowAdd: res.isShowAdd
            }
        });
        yield put({
            type: 'CHINA_LIST',
            payload: {
                chinaDayList: res.chinaDayList,
                chinaDayAddList: res.chinaDayAddList,
                dailyNewAddHistory: res.dailyNewAddHistory,
                dailyDeadRateHistory: res.dailyDeadRateHistory,
                confirmAddRank: res.confirmAddRank
            }
        });
        yield put({
            type: 'AREA_TREE_LIST',
            payload: res.areaTree
        });
        yield put({
            type: 'ARTICLE_LIST',
            payload: res.articleList
        })
    }
}

function* chinaData() {
    yield takeEvery('GET_CHINA_DATA', getChinaData);
}

export default chinaData;