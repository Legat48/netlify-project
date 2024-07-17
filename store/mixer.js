export const state = () => ({
  mixer: {
    idTemp: 13,
    valueTemp: 1387,
    lotNumberCurrent: 13,
    ladleNumberCurrent: 15,
    lotTempTimeCurrent: 1713125185,
    ladles: [
      {
        lotId: 1,
        lotNumber: 23,
        lotTemp: 1439,
        ladleNumber: 12
      },
      {
        lotId: 2,
        lotNumber: 25,
        lotTemp: 1249,
        ladleNumber: 13
      },
      {
        lotId: 3,
        lotNumber: 26,
        lotTemp: 1549,
        ladleNumber: 17
      }]
  }
})

export const getters = {
  getArr: state => state.mixer
}

export const mutations = {
  setArr (state, value) {
    state.mixer = value
  },
  setArrValue (state, { index, key, value }) {
    const keys = key.split('.')
    if (keys.length === 2) {
      state.mixer[index][keys[0]][keys[1]] = value
    } else {
      state.mixer[index][key] = value
    }
  }
}

export const actions = {
}
