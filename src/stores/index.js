import { createStore, Store } from 'vuex'
import { JSONstringfy, localGet, localRemove, localSet, sessionGet } from '../utils/helper'
const noImg = import.meta.glob('../assets/images/timg.jpeg')

const store = createStore({
  state() {
    return {
      userInfo: localGet('userInfo') || null,
      token: localGet('token') || '',
      headImg: localGet('headImg') || noImg['../assets/images/timg.jpeg']
    }
  },
  getters: {
    token(state) {
      return !!state.token && localGet('token')
    },
    hasLogin(state) {
      return !!state.token
    }
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
      const date = new Date(new Date().getTime() + 120 * 60 * 1000)
      localSet('userInfo', Object.assign({ expires: date }, userInfo))
    },
    SET_TOKEN(state, token) {
      state.token = token
      localSet('token', token)
    },
    SET_HEADIMG(state, img) {
      state.headImg = img
      localSet('headImg', img)
    },
    LOGIN_OUT(state) {
      localRemove('userInfo')
      localRemove('token')
      state.userInfo = null
      state.token = null
    }
  },
  actions: {
    commitUserInfo({ commit }, userInfo) {
      commit('SET_USERINFO', userInfo)
    },
    commitToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    commitHeadImg({ commit }, img) {
      commit('SET_HEADIMG', img)
    }
  }
})

export default store
