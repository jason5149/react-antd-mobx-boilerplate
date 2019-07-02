import { Notification } from 'antd'
import * as CONFIG from '@utils/config'

const { HTTP_STATUS_DESC, NOTIFICATION_DURATION } = CONFIG

export function HttpBizError(message, request) {
  this.name = 'HttpBizError'
  this.message = message
  this.request = request
}

HttpBizError.prototype = new Error

export function HttpNetworkError(message) {
  this.name = 'HttpNetworkError'
  this.message = message
}

HttpNetworkError.prototype = new Error

function Catcher(response, isHttpError = false) {
  const duration = NOTIFICATION_DURATION

  if (isHttpError) {
    const { status } = response
    const message = '网络请求错误'
    const description = HTTP_STATUS_DESC[status]  

    Notification.error({
      message,
      description,
      duration,
    })

    throw new HttpNetworkError(message)
  } else {
    const { request } = response
    const message = '请求接口报错'
    const description = '后端接口请求报错'

    Notification.error({
      message,
      description,
      duration,
    })

    throw new HttpBizError(message, request)
  }
}

export default Catcher
