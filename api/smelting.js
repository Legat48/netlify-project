// import { apiService } from '@/api/'
export const apiUrl = process.env.API_ENDPOINT || ''
class SmeltingApi {
  async getSmeltingInfo (smelting) {
    /**
      * функция складывующая два числа
      * @param {string} smelting - номер плавки
    */
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
      const responseData = await response.json()

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
}

export default new SmeltingApi()
