import { apiUrl } from '@/api/'
class MaterialApi {
  async modifyChemistry (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - номер плавки
      *  "mat_id":Number,  # Ид материала
          "element_num":Number,  # Номер элемента в период. таблице.
          "element_content":Number, # Содержание элемента в партии, % (0...100). Nullable (если null - обнулить элемент)
          "element_assim":Number Усвоение элемента при добавлении в расплав, % (0...100). Nullable (если null - обнулить элемент)
    */
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'modifyMaterialChemistry',
        id: 1,
        params: data
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()
      if (responseData.error && responseData.error.code === -32010) {
        return { errorToken: true, message: 'Ошибка проверки авторизации' }
      }
      if (responseData.result) {
        return responseData
      } else {
        console.error('modifyChemistry', responseData)
        return responseData
      }
    } catch (error) {
      console.error('modifyChemistry', error)
      return error
    }
  }

  async modifyUnitGroup (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - номер плавки
      *  "mat_id":Number,  # Ид материала
          "unit_group_id":Number,  # Ид группы агрегатов.
    */
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'createUnitGroupMaterials',
        id: 1,
        params: data
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()
      if (responseData.error && responseData.error.code === -32010) {
        return { errorToken: true, message: 'Ошибка проверки авторизации' }
      }
      if (responseData.result) {
        return responseData
      } else {
        console.error('modifyUnitGroup', responseData)
        return responseData
      }
    } catch (error) {
      console.error('modifyUnitGroup', error)
      return error
    }
  }

  async delUnitGroup (data, token) {
    /**
      * функция удаление группы материалов на сервере
      * @param {Object} data - номер материала
      *  "mat_id":Number,  # Ид партии.
      *  "unit_group_id":Number,  # Ид группы агрегатов.
    */
    const head = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'deleteUnitGroupMaterials',
        id: 1,
        params: data
      })
    }

    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()
      if (responseData.error && responseData.error.code === -32010) {
        return { errorToken: true, message: 'Ошибка проверки авторизации' }
      }
      if (responseData.result) {
        return responseData
      } else {
        console.error(responseData)
        return responseData
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async modifyMaterial (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - объект data в большом компоненте формы
    */
    try {
      // Отправка сначала хим элементов
      for (const e of data.elemInfo) {
        // отправляем на сервер элемент если он изменился или добавили новый
        if ((data.elemInfoOld[`element_${e.element_num}`] && (e.element_abbr !== data.elemInfoOld[`element_${e.element_num}`].element_abbr || e.element_content !== data.elemInfoOld[`element_${e.element_num}`].element_content || e.element_assim !== data.elemInfoOld[`element_${e.element_num}`].element_assim)) || !data.elemInfoOld[`element_${e.element_num}`]) {
          const response = await this.modifyChemistry({
            mat_id: data.idMaterial, //  # Ид материала
            element_num: e.element_num, //  # Номер элемента в период. таблице.
            element_content: Number(e.element_content), //  # Содержание элемента в партии,
            element_assim: Number(e.element_assim) // # Усвоение элемента при добавлении в расплав
          }, token)
          if (response.errorToken) {
            return { errorToken: true, message: 'Ошибка проверки авторизации' }
          }
          if (!response.result?.modified_entities) {
            return false
          }
        }
      }
      // обнулить элемент в базе если его удалили из списка
      for (const e of Object.values(data.elemInfoOld)) {
        if (data.elemInfo && !data.elemInfo.some(j => j.element_num === e.element_num)) {
          const response = await this.modifyChemistry({
            mat_id: data.idMaterial, //  # Ид материала
            element_num: e.element_num, //  # Номер элемента в период. таблице.
            element_content: 0, //  # Содержание элемента в партии,
            //  % (0...100). Nullable (если null - обнулить элемент)
            elem_assim: Number(e.element_assim) // # Усвоение элемента при добавлении в расплав
          }, token)
          if (response.errorToken) {
            return { errorToken: true, message: 'Ошибка проверки авторизации' }
          }
          if (!response.result?.modified_entities) {
            return false
          }
        }
      }
      // Отправка групп агрегатов
      for (const e of data.unitGroupInfo) {
        // отправляем на сервер элемент если он изменился или добавили новый
        if ((data.unitGroupOld[`id_${e.unit_group_id}`] && e.unit_group_id !== data.unitGroupOld[`id_${e.unit_group_id}`].unit_group_id) || !data.unitGroupOld[`id_${e.unit_group_id}`]) {
          const response = await this.modifyUnitGroup({
            mat_id: data.idMaterial, //  # Ид материала
            unit_group_id: e.unit_group_id //  Ид группы агрегатов.
          }, token)
          if (response.errorToken) {
            return { errorToken: true, message: 'Ошибка проверки авторизации' }
          }
          if (!response.result?.modified_entities) {
            return false
          }
        }
      }

      // удаление групп агрегатов
      for (const e of Object.values(data.unitGroupOld)) {
        // отправляем на сервер элемент если он изменился или добавили новый
        if (!data.unitGroupInfo.find(unit => unit.unit_group_id !== e.unit_group_id)) {
          const response = await this.delUnitGroup({
            mat_id: data.idMaterial, //  # Ид материала
            unit_group_id: e.unit_group_id //  Ид группы агрегатов.
          }, token)
          if (response.errorToken) {
            return { errorToken: true, message: 'Ошибка проверки авторизации' }
          }
          if (!response.result?.modified_entities) {
            return { message: 'Ошибка при удалении групп агрегатов' }
          }
        }
      }

      const newData = {}
      // Отправляем весь материал на фиксацию
      newData.id = data.idMaterial
      newData.type_id = data.type_id
      newData.name = data.name
      newData.abbr = data.abbr
      newData.cost = Number(data.cost)
      newData.dflt_wght = Number(data.dflt_wght)
      newData.id_level3 = data.id_level3
      newData.run_meter_wght_default = Number(data.run_meter_wght_default)
      newData.run_meter_wght_filler_default = Number(data.run_meter_wght_filler_default)
      newData.mat_density = Number(data.mat_density)
      newData.usage_tag = data.selectedUsageTag
      newData.fill_factor = Number(data.fill_factor)
      newData.hdl_type_id = data.hdl_type_id
      newData.packaged_output = data.packaged_output
      const head = {
        jsonrpc: '2.0',
        method: 'post',
        credentials: 'same-origin',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: token
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'modifyMaterial',
          id: 1,
          params: newData
        })
      }
      try {
        const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
        const responseData = await response.json()
        if (responseData.error && responseData.error.code === -32010) {
          return { errorToken: true, message: 'Ошибка проверки авторизации' }
        }
        if (responseData.result) {
          return true
          // commit('setPortfolioInfoArr', responseData)
        } else {
          console.error('submitFormBatch', responseData)
          return responseData?.error || { message: 'Ошибка при записи материала' }
        }
      } catch (error) {
        console.error('submitFormBatch', error)
        return error || { message: 'Ошибка при записи материала' }
      }
    } catch {
      return false
    }
  }
}

export default new MaterialApi()
