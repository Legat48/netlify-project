import axios from 'axios'
import { apiService } from '@/api/'

class AuthService {
  login (user) {
    return apiService
      .post('token/', {
        email: user.email,
        password: user.password
      })
      .then((response) => {
        if (response.data.access) {
          localStorage.setItem('user', JSON.stringify(response.data))
          window.$nuxt.$store.commit('user/initializeStore')
        }
        return response.data
      })
  }

  async refresh () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.refresh) {
      try {
        const response = await axios.post((process.env.API_ENDPOINT || '') + '/token/refresh/', {
          refresh: user.refresh
        })
        if (response.data.access) {
          user.access = response.data.access
          localStorage.setItem('user', JSON.stringify(user))
          // console.log('token refreshed')
          return response.data.access
        }
      } catch {
        return null
      }
    }
  }

  async registration (user) {
    return await axios.post((process.env.API_ENDPOINT || '') + '/register/', user)
  }

  async verify (data) {
    // console.log(data)
    const config = {
      method: 'get',
      url: `${process.env.API_ENDPOINT}/verify/${data}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await axios(config)
  }

  async setProfileLanguage (lang) {
    const config = {
      method: 'post',
      url: `${process.env.API_ENDPOINT}/profile/`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        language: lang
      }
    }
    await apiService(config)
  }

  async resetPassword (data) {
    // console.log(data)
    const config = {
      method: 'post',
      url: `${process.env.API_ENDPOINT}/reset/${window.$nuxt.$store.state.user.uuidPasswordReset}/`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        new_password: data.newPassword,
        new_password_confirm: data.newPasswordConfirm
      }
    }
    await apiService(config)
  }

  async passwordChange (data) {
    const response = await apiService
      .post('profile/password/', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        newPasswordConfirm: data.newPasswordConfirm
      })
      .then((response) => {
        return response.data
      })
    return response
  }

  async personalDataChange (data) {
    // console.log('personal')
    const response = await apiService
      .post('profile/', data)
      .then((response) => {
        return response.data
      })
    return response
  }

  logout () {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
