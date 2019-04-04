import { userInfo } from '../../../services/api.js'
import {SUCCESS} from '../../../utils/enum.js'

export default {
  namespace: 'my',
  state: {
    userInfo: {},
  },

  effects: {
    // 获取用户信息
    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(userInfo, payload);
      const {error_code, data} = response
      if (error_code === SUCCESS) {
          yield put({
              type: 'saveData',
              payload: data,
          })
      }
    },
  },

  reducers: {
    // 保存用户信息
    saveData(state, {payload}) {
        return {
            ...state,
            userInfo: payload,
        }
    },
  },
};