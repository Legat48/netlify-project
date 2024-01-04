export const state = () => ({
  loading: false,
  axiosId: 1,
  token: '',
  user: null,
  dialogOpen: false
})

export const getters = {
  getLoading: state => state.loading,
  getUser: state => state.user,
  getDialogStatus: state => state.dialogOpen
}

export const mutations = {
  closeDialog (state) {
    state.dialogOpen = false
  },
  openDialog (state) {
    state.dialogOpen = false
  },
  setAxiosId (state) {
    state.axiosId++
  },
  setUser: (state, data) => {
    state.user = data
    if (data && data.auth_token) {
      state.token = data.auth_token
    } else {
      state.token = ''
    }
  },
  setLoading (state, value) {
    state.loading = value
  }
}

export const actions = {
}
