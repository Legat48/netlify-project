// import { apiService } from '@/api/'
import { apiUrl } from '@/api/'
class SmeltingApi {
  async getSmeltingInfo (smelting) {
    /**
      * функция складывующая два числа
      * @param {string} smelting - номер плавки
    */
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'GetHeatData',
        id: 1,
        params: {
          p_heat_no: smelting
        }
      })
    }
    try {
      const response = await fetch(`${apiUrl}DataHub/DataHubSrv`, head)
      // const response = await fetch(`${apiUrl}ods/scheme_kc-2.json`)
      const responseData = await response.json()
      // return responseData

      if (responseData.result) {
        return responseData
      } else {
        console.error(responseData)
        return responseData
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }

  // const obg = {}

  // data.forEach((e) => {
  //   obg[`${e.methodName}`] = 'тут результат работы функции тайтлов по джсон схеме e.jsonShema'
  // });

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

  async getStatus () {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'GetEQStatus',
        id: 3,
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
    } catch (error) {
      console.error(error)
      return error
    }
  }

  // Универсальный метод получения данных с датахаб
  async getUniversal (methodName, paramArr) {
    /**
      * Универсальный метод получения данных с датахаб
      * @param {Array} paramArr - массив параметров
      * [{
      * key: 'timestamp',
      * value: 0
      * }]
      *  "key":String,  # Название параметра.
      *  "value":Number,String  # значение параметра
    */
    const params = {}
    for (const item of paramArr) {
      params[`${item.key}`] = item.value
    }
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: `${methodName}`,
        id: 3,
        params
      })
    }
    try {
      const response = await fetch(`${apiUrl}DataHub/DataHubSrv`, head)
      // const response = await fetch(`${apiUrl}ods/scheme_kc-2.json`)
      const responseData = await response.json()
      return responseData // для офлайн разработки
    } catch (error) {
      console.error(error)
      return error
    }
  }
}

export default new SmeltingApi()
