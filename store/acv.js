import AcvService from '~/api/acv'
/**
 Хранилище для страницы АЦВ
 @param {string} bunkers 'Все бункера, их текущее состояние, будет обновляться с базы, а так же их доступные данные'
 */

export const state = () => ({
  bunkers: {
    bunkersFirst: null,
    bunkersSecond: null,
    bunkersThird: null,
    bunkersFourth: null
  },
  tasks: [
    {
      id: 1,
      idStart: 1,
      idEnd: 41,
      substanceId: 2,
      substanceArr: ['FeSi1'],
      weight: 100,
      priority: 1
    }
  ],
  activeTasks: {
    idStart: '',
    idEnd: '',
    anchorsArr: [],
    substanceArr: '',
    priority: 1
  }
})

export const getters = {
  getBunkers: state => state.bunkers,
  getActiveTasks: state => state.activeTasks,
  getTasks: state => state.tasks
}

export const mutations = {
  setBunkers (state, bunkers) {
    state.bunkers = bunkers
  },
  setActiveIdStart (state, id) {
    state.activeTasks.idStart = id
  },
  setActiveIdEnd (state, id) {
    state.activeTasks.idStart = id
  },
  setActiveAnchorsArr (state, arr) {
    state.activeTasks.anchorsArr = arr
  },
  setActiveSubstanceArr (state, arr) {
    state.activeTasks.substanceArr = arr
  },
  resetActiveTask (state) {
    state.activeTasks = {
      idStart: '',
      idEnd: '',
      anchorsArr: [],
      substanceArr: '',
      priority: 1
    }
  },
  pushNewTasks (state, task) {
    state.tasks.push(task)
  },
  delTask (state, id) {
    state.tasks = state.tasks.filter(e => e.id !== id)
  }
}

export const actions = {
  fetchBunkers ({ commit }) {
    const bunkers = {}
    bunkers.bunkersFirst = AcvService.addInfoBunkersFirst()
    bunkers.bunkersSecond = AcvService.addInfoBunkersSecond()
    bunkers.bunkersThird = AcvService.addInfoBunkersThird()
    bunkers.bunkersFourth = AcvService.addInfoBunkersFourth()
    commit('setBunkers', bunkers)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addNewTasks ({ commit, getters }) {
    // 1
  }
}
