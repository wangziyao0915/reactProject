import { fetchRecordApi } from '../services'
import { message } from 'antd'
import { deleteRecord } from './../services'
const recordModel = {
    state: {},
    reducers: {
        SAVE_RECORD_LIST(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    },
    effects: {
        *FETCH_RECORD_LIST({ payload }, { call, put }) { //用saga或者model管理副作用
            let res = yield call(fetchRecordApi, payload)
            if (res.code === 1) {
                message.success(res.msg)
                yield put({
                    type: "SAVE_RECORD_LIST",
                    payload: res.lists
                })
            } else {
                message.error(res.msg)
            }
        },
        *DELETE_RECORD_LIST({ payload }, { call, put }) {
            let res = yield call(deleteRecord, {record_id:payload.record_id, stuid:payload.stuid})
            if (res.code === 1) {
                message.success(res.msg)

                yield put({
                    type: "FETCH_RECORD_LIST",
                    payload: payload.cid
                })
            } else {
                message.error(res.msg)
            }
        }
    },
    subscriptions: {
        /**
         * 监听浏览器地址，当跳转到 /record 时进入该方法
         * @param dispatch 触发器，用于触发 effects 中的 query 方法
         * @param history 浏览器历史记录，主要用到它的 location 属性以获取地址栏地址
         */
        setup ({ dispatch, history }) {
          history.listen((location) => {
            console.log('location path is: %o', location.pathname);            
            // dispatch({
            //     type: 'record/FETCH_RECORD_LIST',
            //     payload: cid
            //   })
          });
        },
      }
}

export default recordModel
