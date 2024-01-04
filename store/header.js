/**
 Хранилище для генерации шапки страницы
 @param {string} headerTitle 'то что будет вписано в заголовок шапки'
 */

export const state = () => ({
  headerTitle: ''
})

export const getters = {
  getLoading: state => state.headerTitle,
  getHeaderTitle: state => state.headerTitle
}

export const mutations = {
  setHeaderTitle (state, header) {
    state.headerTitle = header
  }
}

export const actions = {
}
