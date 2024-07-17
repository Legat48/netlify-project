// import { apiService } from '@/api/'
import { apiUrl } from '@/api/'
class UserStatApi {
  async getInfo (data) {
    /**
      * функция получения информации по юзерам по методам
      * @param {string} data -
    */
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'GETCURRENTSTAT',
        id: 1,
        params: {
          data
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

  async getUser (data) {
    /**
      * функция получения информации по юзерам
      * @param {string} data -
    */
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'GETUSERLIST',
        id: 1,
        params: {
          data
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
}

export default new UserStatApi()
