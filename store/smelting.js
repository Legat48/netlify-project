/**
  * Файл стор для представления JSON
*/
// eslint-disable-next-line import/named
import { api } from '@/api/'

export const state = () => ({
  loading: false,
  axiosId: 1,
  numberHeat: '',
  info: null,
  infoDescr: null,
  scheme: null,
  baseScheme: null,
  status: null
})

export const getters = {
  getInfo: state => state.info,
  getInfoDescr: state => state.infoDescr,
  getNumberHeat: state => state.numberHeat,
  getScheme: state => state.scheme,
  getBaseScheme: state => state.baseScheme,
  getStatus: state => state.status
}

export const mutations = {
  setAxiosId (state) {
    state.axiosId++
  },
  setNumberHeat (state, number) {
    state.numberHeat = number
  },
  setInfo (state, data) {
    state.info = data
  },
  setStatus (state, data) {
    state.status = data
  },
  // по которой подставляются тайтлы
  // объект по форме ключ:тайтл
  setScheme (state, data) {
    const newObg = {}
    // парсинг вложенной схемы
    data.forEach((e) => {
      newObg[`${e.methodName}`] = e
      if (!!newObg[`${e.methodName}`].jsonSchema && Object.keys(newObg[`${e.methodName}`].jsonSchema).length > 0) {
        if (typeof (newObg[`${e.methodName}`].jsonSchema) === 'string') {
          newObg[`${e.methodName}`].jsonSchema = JSON.parse(e.jsonSchema)
        }
        const schemeObg = {}
        function findTitle (obg) {
          if (Array.isArray(obg)) {
            obg.forEach((item) => {
              findTitle(item)
            })
          } else if (typeof obg === 'object' && obg !== null) {
            for (const [key, value] of Object.entries(obg)) {
              if (key === 'title') {
                schemeObg[`${keyObg}`.toLowerCase()] = value
                keyObg = key
              }
              if (value.title) {
                schemeObg[`${key}`.toLowerCase()] = value.title
              }
              if (typeof value === 'object' && value !== null) {
                keyObg = key
                if (Array.isArray(value)) {
                  findTitle(value)
                } else {
                  const array = Object.entries(value).map(([key, value]) => ({
                    [key]: value
                  }))
                  findTitle(array)
                }
              }
            }
          }
        }
        let keyObg = 'scheme'
        findTitle(newObg[`${e.methodName}`].jsonSchema)
        newObg[`${e.methodName}`].jsonTitle = schemeObg
      }
    })

    // ключ для записи в объект
    // рекурсивная функция заполнения объекта
    state.scheme = newObg
  },
  setBaseScheme (state, data) {
    const newData = data.map((e) => {
      if (typeof (e.jsonSchema) === 'string') {
        e.jsonSchema = JSON.parse(e.jsonSchema)
      }
      return e
    })
    // const schemeObg = {}
    state.baseScheme = newData
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchInfo ({ commit, getters, state, dispatch }) {
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await api.smeltingApi.getSmeltingInfo(state.numberHeat)
        if (response.result?.data?.processes) {
          commit('setInfo', response.result.data)
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchScheme ({ commit, getters, state, dispatch }) {
    console.count('smelting/fetchScheme')
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await api.smeltingApi.getSchemeInfo()
        if (response) {
          commit('setScheme', response.result.data)
          commit('setBaseScheme', response.result.data)
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchStatus ({ commit, getters, state, dispatch }) {
    console.count('smelting/fetchStatus')
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await api.smeltingApi.getUniversal('GetEQStatus', [{ key: 'timestamp', value: 0 }])
        if (response) {
          commit('setStatus', response.result.data)
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchUniversal ({ commit, getters, state, dispatch }, data) {
    console.count('smelting/fetchStatus')
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await api.smeltingApi.getUniversal(data.methodName, data.paramArr)
        if (response) {
          commit('setStatus', response.result.data)
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
  }
}
