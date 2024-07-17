// import { apiService } from '@/api/'
// eslint-disable-next-line import/named
import { apiUrl } from '@/api/'
class HeadersApi {
  async getHeader () {
    /**
      * функция возвращающая заголовки для таблиц
    */
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'getHeaders',
        id: 1
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()
      const headers = responseData.result.headers.find(e => e.type === 'MAIN').config
      if (headers) {
        return headers
      } else {
        console.error('error Headers1', responseData)
        return responseData.result
      }
    } catch (error) {
      console.error('error Headers1', error)
      return error
    }
  }
}

export default new HeadersApi()
