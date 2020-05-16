import { EffectsCommandMap, EffectsMapObject } from 'dva'
import { Reducer, ReducersMapObject, AnyAction } from 'redux'
import { fetchClass, deleteClass, emStudents, delStudent } from '../services'
import { message } from 'antd'

export interface ClassState {
    classLists: any[],
    classStudents: any
}

export interface ClassModelType {
    state: ClassState,
    reducers: {
        saveClass: Reducer,
        saveStudents: Reducer,
        updateStudents: Reducer,
    },
    effects: EffectsMapObject
}
const classModel: ClassModelType = {
    state: {
        classLists: [],
        classStudents: {}
    },
    reducers: {
        saveClass(state, action) {
            return {
                ...state,
                classLists: action.payload || state.classLists
            }
        },
        saveStudents(state, action) {
            return {
                ...state,
                classStudents: action.payload || state.classStudents
            }
        },
        updateStudents(state, action) {
            console.log(action)
            return {
                ...state,
                classStudents: {
                    ...state.classStudents,
                    ...action.payload
                }
            }
        }
    },
    effects: {
        *fetchClassAction(action, { call, put, all }) {
            let { code, lists, msg } = yield call(fetchClass);
            if (code === 1) {
                yield put({
                    type: "saveClass",
                    payload: lists
                })
                //并行请求各班级的学生，并进行存储
                let res = yield all(lists.map((item: any, index: number) => {
                    return call(emStudents, item.cid)
                }))
                //存储各班级学生
                yield put({
                    type: "saveStudents",
                    payload: lists.reduce((total: any, item: any, index: number) => ({ ...total, [item.cid]: res[index].lists }), {})
                })

                message.success(msg)
            } else {
                message.error(msg)
            }

        },
        *deleteClassAction({ payload }, { call, put }) {
            let res = yield call(deleteClass, payload)

            if (res.code === 1) {
                message.success(res.msg)
                let { code, lists, msg } = yield call(fetchClass);
                if (code === 1) {
                    yield put({
                        type: "saveClass",
                        payload: lists
                    })
                    message.success(msg)
                } else {
                    message.error(msg)
                }
            } else {
                message.error(res.msg)
            }
        },
        *deleteStudentAction({ payload }, { call, put }) {
            let res = yield call(delStudent, payload);

            if (res.code === 1) {
                message.success(res.msg)
                // yield put({type:"fetchClassAction"})
                let { code, lists, msg } = yield call(emStudents, payload.cid)
                if (code === 1) {
                    yield put({
                        type: "updateStudents",
                        payload: {
                            [payload.cid]: lists
                        }
                    })
                } else {
                    message.error(msg)
                }
            } else {
                message.error(res.msg)
            }
        }
    }
}

export default classModel
