
// api地址
export const defaultApiURL = 'https://gateway.lw.4dtec.cn/'

// 默认读取文件地址URL
export const defaultFileUrl = ''

// 图片资源服务器
export const defaultResourceImgURL = 'https://luwu.oss-cn-beijing.aliyuncs.com/luwu-mp/image/'

// 文件资源服务器
export const defaultResourceConfigURL = 'https://luwu.oss-cn-beijing.aliyuncs.com/luwu-mp/mock/'

export const defaultFileURL = ''

export const HTTP_STATUS = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

// promise status
export const SUCCESS = {
  success: 'success'
}
export const FAIL = {
  fail: 'fail'
}
export const COMPLETE = {
  complete: 'complete'
}

export const PROMISE_STATUS = {
  success: 'success',
  fail: 'fail',
  complete: 'complete'
}

export const RESULT_STATUS = {
  SUCCESS: 0,
  SIGNATURE_FAILED: 1000 // 签名失败
}
