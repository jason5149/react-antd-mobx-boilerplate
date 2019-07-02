import axios from 'axios'
import { message } from 'antd'
import * as CONFIG from '@utils/config'
import Catcher from '@utils/catcher'
import { startLoading, stopLoading } from '@utils/loading'

window.cancelTokenList = []

const instance = axios.create({
  timeout: CONFIG.REQUEST_TIMEOUT,
})

const requestHandler = config => {
  startLoading(config)

  const source = axios.CancelToken.source()

  window.cancelTokenList.push(source)
  config.cancelToken = source.token

  return config
}

const requestErroHandler = error => {
  /* eslint-disable-next-line */
  Promise.reject(error)
}

const responseHandler = response => {
  stopLoading()

  window.cancelTokenList = window.cancelTokenList.filter(
    item => item.token !== response.config.cancelToken
  )

  const { status } = response

  if (status !== 200) Catcher(response)

  const { code, msg, info } = response.data

  if (code !== 0) {
    message.error(msg || info, 2)
    return false
  }

  return response.data
}

const responseErrorHandler = error => {
  stopLoading()

  Catcher(error.response, true)
}

instance.interceptors.request.use(requestHandler, requestErroHandler)
instance.interceptors.response.use(responseHandler, responseErrorHandler)

export default instance
