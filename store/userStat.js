import userStat from '~/api/userStat'
import numberFormat from '~/helpers/numberFormat'

/**
 Хранилище для страницы АЦВ
 @param {string} bunkers 'Все бункера, их текущее состояние, будет обновляться с базы, а так же их доступные данные'
 */

export const state = () => ({
  info: {},
  user: {},
  selectUser: '',
  optionsUser: [],
  stat: []
})

export const getters = {
  getInfo: state => state.info,
  getUser: state => state.user,
  getOptionsUser: state => state.optionsUser,
  getStat: state => state.stat
}

export const mutations = {
  setInfo (state, data) {
    state.info = data.stats
    this.commit('userStat/setStat', data.stats)
  },
  setUser (state, data) {
    state.user = data.data
    this.commit('userStat/setOptionsUser', data.stats)
  },
  setOptionsUser (state) {
    const arr = []
    let id = 0
    if (state.info) {
      for (const [key, value] of Object.entries(state.info)) {
        const obg = {
          id: id++,
          name: key,
          userName: '',
          userDescr: '',
          valueUser: value
        }
        let user = {}
        if (state.user && state.user.length > 0) {
          user = state.user.find((e) => {
            return e.user_ip === key
          })
          if (user) {
            obg.userName = user.user_name
            obg.userDescr = user.user_descr
          }
        }
        // const userInfo = {}
        arr.push(obg)
      }
    }
    state.optionsUser = arr
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setStat (state, data) {
    let totalInvalidCalls = 0
    let totalCalls = 0
    let totalMethod = 0
    const methodArr = []
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    for (const value of Object.values(data)) {
      value.called_methods.forEach((e) => {
        for (const [itemKeys, itemValue] of Object.entries(e)) {
          if (itemKeys.includes('call') && itemValue) {
            totalCalls = totalCalls + itemValue
          } else if (itemKeys === 'method_name' && !methodArr.find(e => e === itemValue)) {
            totalMethod++
            methodArr.push(itemValue)
          }
        }
      })
      if (value.total_invalid_calls) {
        totalInvalidCalls = totalInvalidCalls + value.total_invalid_calls
      }
    }
    let methodString = ''
    methodArr.forEach((e) => {
      methodString = `${methodString}  |  ${e}`
    })
    state.stat = [
      {
        title: 'Всего пользователей',
        maxWight: 170,
        value: Object.keys(data).length
      },
      {
        title: 'Всего вызовов',
        maxWight: 170,
        value: numberFormat(totalCalls)
      },
      {
        title: 'Всего ошибок вызова',
        maxWight: 170,
        value: totalInvalidCalls
      },
      {
        title: 'Всего уникальных методов',
        maxWight: 170,
        value: totalMethod
      },
      {
        title: 'Методы',
        maxWight: 600,
        value: methodString
      }
    ]
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchInfo ({ commit, getters, state, dispatch }) {
    try {
      const response = await userStat.getInfo()
      if (response.result) {
        commit('setInfo', response.result)
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error(error.message)
      return false
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetchUser ({ commit, getters, state, dispatch }) {
    try {
      const response = await userStat.getUser()
      if (response.result) {
        commit('setUser', response.result)
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
