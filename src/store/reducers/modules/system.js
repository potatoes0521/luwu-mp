import { SAVESYSTEMINFO } from '../../constants'

const INITIAL_STATE = {}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVESYSTEMINFO: // 修改用户信息
      if (!action.data) return
      const systemInfo = Object.assign({}, state, action.data)
      return {
        ...state,
        systemInfo
      }
    default:
      return state
  }
}
