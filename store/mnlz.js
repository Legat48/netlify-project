import { api } from '@/api/'

export const state = () => ({
  arr: [],
  obgCopy: null
})

export const getters = {
  getArr: state => state.arr,
  getObgCopy: state => state.obgCopy
}

export const mutations = {
  setArr (state, value) {
    state.arr = value
  },
  setObgCopy (state, value) {
    state.obgCopy = value
  },
  editCard (state, { card, idRow }) {
    const index = state.arr.findIndex(e => e.id === idRow)
    if (index !== -1) {
      const indexCard = state.arr[index].settingArr.findIndex(e => e.id === card.id)
      if (indexCard !== -1) {
        state.arr[index].settingArr[indexCard].card = card
        // console.log('indexCard', card)
      }
    }
  },
  setArrValue (state, { index, key, value }) {
    const keys = key.split('.')
    if (keys.length === 2) {
      state.arr[index][keys[0]][keys[1]] = value
    } else {
      state.arr[index][key] = value
    }
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchArr ({ commit, getters, state, dispatch }, lang = '') {
    try {
      const response = await api.mnlzApi.getArr(lang)
      if (response.result) {
        commit('setArr', response.result.data.arr)
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
