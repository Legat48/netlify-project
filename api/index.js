/**
  * базовая страница API
  * @param {string} apiUrl - общий эндпоинт по всему проекту
*/
import acvService from './acv'
import batchApi from './batch'
import headersApi from './headers'
import materiaApi from './material'
import schemeApi from './scheme'
import smeltingApi from './smelting'
import userStatApi from './userStat'
import mnlzApi from './mnlz'

export const apiUrl = '/'
// export const apiUrl = 'https://odskc2.nlmk:8181/'
export const api = {
  acvService,
  batchApi,
  headersApi,
  materiaApi,
  schemeApi,
  smeltingApi,
  mnlzApi,
  userStatApi
}
