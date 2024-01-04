/**
  * Файл стор для представления JSON
*/
import smeltingApi from '~/api/smelting'

export const state = () => ({
  loading: false,
  axiosId: 1,
  numberHeat: '',
  info: null
})

export const getters = {
  getInfo: state => state.info,
  getNumberHeat: state => state.numberHeat,
  getInfoId: state => (id) => {
    return state.info.find(e => e.unitId === id)
  }
}

export const mutations = {
  setAxiosId (state) {
    state.axiosId++
  },
  setNumberHeat (state, number) {
    console.count('getNumberHeat')
    state.numberHeat = number
  },
  setInfo (state, data) {
    state.info = data
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchInfo ({ commit, getters, state, dispatch }) {
    console.count('smelting/fetchInfo')
    commit('setAxiosId')
    if (state.axiosId) {
      try {
        const response = await smeltingApi.getSmeltingInfo(state.numberHeat)
        if (response.result) {
          commit('setInfo', response.result.data)
        } else {
        //   return false
        }
      } catch (error) {
        console.error(error.message)
        return false
      }
    }
  }
}
