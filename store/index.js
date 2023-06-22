import axios from 'axios'
import testItem from '~/helpers/testItem'

export const state = () => ({
  name: '',
  phone: '',
  deskOne: 1,
  deskTwo: 1,
  loaded: false,
  lang: 'ru',
  dialogOpen: false,
  dialogComponent: '',
  statusApp: 1 // этапы работы приложения

})

export const getters = {
  getLang (state) {
    return state.lang
  },
  getName (state) {
    return state.name
  },
  getPhone (state) {
    return state.phone
  },
  getDeskOne (state) {
    return state.deskOne
  },
  getDeskTwo (state) {
    return state.deskTwo
  },
  getDialogOpen (state) {
    return state.dialogOpen
  },
  getDialogComponent (state) {
    return state.dialogComponent
  },
  getStatusApp (state) {
    return state.statusApp
  }

}

export const mutations = {
  setLoaded (state, value) {
    state.loaded = value
  },
  setLang (state, value) {
    state.lang = value
  },
  setName (state, value) {
    state.name = value
  },
  setPhone (state, value) {
    state.phone = value
  },
  setDeskOne (state, value) {
    state.deskOne = value
  },
  setDeskTwo (state, value) {
    state.deskTwo = value
  },
  toggleDialogOpen (state) {
    state.dialogOpen ? state.dialogOpen = false : state.dialogOpen = true
  },
  setDialogComponent (state, value) {
    state.countries = value
  },
  setStatusApp (state, value) {
    state.statusApp = value
    if (state.statusApp < 1) {
      state.statusApp = 1
    }
  }
}

export const actions = {
  async submit ({ state }) {
    const bodyFormData = new FormData()
    bodyFormData.append('name', state.name)
    bodyFormData.append('phone', state.phone)
    const deskOne = testItem.testItem1.find(item => item.id === state.deskOne)
    const deskTwo = testItem.testItem2.find(item => item.id === state.deskTwo)
    bodyFormData.append('description', `Первый ответ: ${deskOne.text} Второй ответ: ${deskTwo.text}`)
    const config = {
      method: 'post',
      // тут нужно разместить адрес куда отправить данные клиента
      url: 'https://research.ranks.pro/api/amo-crm-create-quiz-lead/',
      data: bodyFormData
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await axios(config).then((response) => {
      return true
    })
      .catch(function (error) {
        console.error(error)
        return false
      })
  }
}
