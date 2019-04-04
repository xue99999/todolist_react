import {routerRedux} from 'dva/router'
import { login } from '../services/api.js'
import { setAuthority } from '../utils/authority.js'
import {SUCCESS} from '../utils/enum.js'

export default {
  namespace: 'login',
  state: {
      
  },

  effects: {
    // 核销列表
    *login({ payload, callback }, { call, put }) {
      const response = yield call(login, payload);
      const {error_code, data: {token='', uid=''}} = response
      if (error_code === SUCCESS) {
        setAuthority({token, uid})
        if (callback) callback()
      }
    },
    *logout(_, {put}) {
      setAuthority('')
      yield put(routerRedux.push('/login'))
    }
  },

  reducers: {
  },
};
