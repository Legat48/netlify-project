/**
 Хранилище для страницы АЦВ
 @param {string} bunkers 'Все бункера, их текущее состояние, будет обновляться с базы, а так же их доступные данные'
 */

export const state = () => ({
  dialogAddTaskOpen: false,
  dialogAddTaskObg: {}
})

export const getters = {
  getDialogAddTaskStatus: state => state.dialogAddTaskOpen,
  getDialogAddTaskObg: state => state.dialogAddTaskObg
}

export const mutations = {
  SET_DIALOG_OPEN (state) {
    state.dialogAddTaskOpen = true
  },
  closeDialogAddTask (state) {
    state.dialogAddTaskOpen = false
    state.dialogAddTaskObg = {}
  },
  SET_DIALOG_OBG (state, data) {
    data.weight = data.substanceArr.reduce((sum, substance) => sum + substance.weight, 0)
    state.dialogAddTaskObg = data
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDialogAddTaskObg ({ commit, rootState }, data) {
    commit('SET_DIALOG_OPEN')
    commit('SET_DIALOG_OBG', data)
  }
}
