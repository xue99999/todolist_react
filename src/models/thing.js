import { thingList, addThing, changeThing, delThing } from '../services/api.js'
import {SUCCESS, DELETE_SUCCESS} from '../utils/enum.js'

export default {
  namespace: 'thing',
  state: {
      list: [],
  },

  effects: {
    // 核销列表
    *getData({ payload }, { call, put }) {
      const response = yield call(thingList, payload)
      if (response.error_code === SUCCESS) {
        yield put({
            type: 'saveData',
            payload: response.data
        })
      }
    },

    // 新增todo
    *addThing({ payload, callback }, { call }) {
      const response = yield call(addThing, payload)
      if (callback) callback(response)
    },

    // 修改todo
    *changeThing({ payload, callback }, { call, put }) {
      const response = yield call(changeThing, payload)
      if (response.error_code === SUCCESS) {
        yield put({
          type: 'saveEditData',
          payload: response.data
        })
      }
      if (callback) callback(response)
    },

    // 删除todo
    *delThing({ payload, callback }, { call, put }) {
      const response = yield call(delThing, payload)
      if (response.error_code === DELETE_SUCCESS) {
        yield put({
          type: 'delData',
          payload,
        })
      }
      if (callback) callback(response)
    },
  },

  reducers: {
    // 保存列表数据
    saveData(state, {payload}) {
      return {
          ...state,
          list: payload,
      }
    },

    // 保存修改后的数据
    saveEditData(state, {payload}) {
      const selectIdx = state.list.findIndex(x=>x.id===payload.id)
      const newList = [...state.list]
      newList[selectIdx] = payload
      
      return {
        ...state,
        list: newList,
      }
    },

    // 删除某条数据
    delData(state, {payload}) {
      const newList = state.list.filter(x=>x.id!==payload.id)
      return {
        ...state,
        list: newList,
      }
    },
  },
};
