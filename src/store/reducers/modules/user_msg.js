import {
  CHANGEUSERINFO,
  LOGINOUT
} from '../../constants'

// import api from '@api/index'

const INITIAL_STATE = {
  userInfo: {},
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGEUSERINFO:  // 修改用户信息
      if (!action.data) return
      // if (env === 'development') {
      //   let newUserInfoData = Object.assign({}, state.userInfo)
      //   if (action.data.token) {
      //     newUserInfoData = Object.assign({}, state.userInfo, {
      //       token: action.data.token
      //     })
      //   }
      //   return {
      //     ...state,
      //     userInfo: newUserInfoData
      //   }
      // }
      const newUserInfoData = Object.assign({}, state.userInfo, action.data)
      return {
        ...state,
        userInfo: newUserInfoData
      }
    case LOGINOUT:
      return {
        ...state,
        userInfo: {}
      }
    default:
      return state
  }
}
