// import { apiService } from '@/api/'
import { apiUrl } from '@/api/'
class SchemeApi {
  async getSchemeInfo () {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'GetMetaData',
        id: 2,
        params: {
          timestamp: 0
        }
      })
    }
    try {
      const response = await fetch(`${apiUrl}DataHub/DataHubSrv`, head)
      // const response = await fetch(`${apiUrl}ods/scheme_kc-2.json`)
      const responseData = await response.json()
      return responseData // для офлайн разработки
      // const obg = responseData.result?.data.find(e => e.jsonSchema && e.methodName && e.methodName === 'GETHEATDATA:XXXXXXX')
      // return JSON.parse(obg.jsonSchema)
      // if (responseData.result) {
      //   if (responseData.result?.data) {
      //     const obg = responseData.result?.data.find(e => e.jsonSchema && e.methodName && e.methodName === 'GETHEATDATA:XXXXXXX')
      //     return JSON.parse(obg.jsonSchema) || {}
      //   } else {
      //     console.error(responseData)
      //     return responseData
      //   }
      // }
    } catch (error) {
      console.error(error)
      return error
    }
  }
}

export default new SchemeApi()
