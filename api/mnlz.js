// import { apiService } from '@/api/'
// eslint-disable-next-line import/named
import { apiUrl } from '@/api/'
class MnlzApi {
  async getArr (lang) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'getEmsTechKey',
        id: 2,
        params: {
          timestamp: 0
        }
      })
    }
    try {
      // const response = await fetch(`${apiUrl}DataHub/DataHubSrv`, head)
      const response = await fetch(`${apiUrl}mnlzArr${lang}.json`)

      const responseData = await response.json()
      return responseData // для офлайн разработки
    } catch (error) {
      console.error(error)
      return error
    }
  }
}

export default new MnlzApi()
