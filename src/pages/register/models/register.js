import { register } from '../../../services/api.js'

export default {
  namespace: 'register',
  state: {
      
  },

  effects: {
    // 核销列表
    *register({ payload, callback }, { call }) {
      const response = yield call(register, payload);
      if (callback) callback(response)
    },
  },

  reducers: {
  },
};
