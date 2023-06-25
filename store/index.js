export const state = () => ({
  persNumber: '',
  min: '',
  max: '',
  jump: '',
  statusApp: 1 // этапы работы приложения
})

export const getters = {
  getPersNumber: state => state.persNumber,
  getMin: state => state.min,
  getMax: state => state.max,
  getJump: state => state.jump,
  getStatusApp: state => state.statusApp
}

export const mutations = {
  setPersNumber: (state, value) => {
    state.persNumber = value
  },
  setMin: (state, value) => {
    state.min = Number(value)
    if (!isNaN(state.max) && !isNaN(state.min) && Number(state.max) - Number(state.min) > 0 && !state.jump) {
      state.jump = state.max - state.min
    }
  },
  setMax: (state, value) => {
    state.max = Number(value)
    if (!isNaN(state.max) && !isNaN(state.min) && Number(state.max) - Number(state.min) > 0 && !state.jump) {
      state.jump = state.max - state.min
    }
  },
  setJump: (state, value) => {
    state.jump = Number(value)
  },
  setStatusApp (state, value) {
    state.statusApp = value
    if (state.statusApp < 1) {
      state.statusApp = 1
    }
  }
}

export const actions = {
}
