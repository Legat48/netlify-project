import { apiUrl } from '@/api/'

class BatchApi {
  async submitFormBatch (data, axiosId = 1, token) {
    const head = {
      jsonrpc: '2.0',
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${token}`
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: data.id ? 'modifyBatch' : 'createBatch',
        id: axiosId,
        params: data
      })
    }
    try {
      const response = await fetch(`${apiUrl}BatchEditor/BatchEditorSrv`, head)
      const responseData = await response.json()
      if (responseData.error && responseData.error.code === -32010) {
        return { errorToken: true, message: 'Ошибка проверки авторизации' }
      }
      return responseData.result
    } catch (error) {
      return error
    }
  }

  async modifyChemistry (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - номер плавки
      *  "batch_id":Number,  # Ид партии.
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
        method: 'modifyBatchChemistry',
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

  async modifyUnitGroup (data, token) {
    /**
      * функция изменения материала на сервере
      * @param {Object} data - номер плавки
      *  "batch_id":Number,  # Ид партии.
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
        method: 'createUnitGroupBatches',
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
      * @param {Object} data - номер плавки
      *  "batch_id":Number,  # Ид партии.
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
        method: 'deleteUnitGroupBatch',
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

  async modifyBatch (data, token) {
    /**
      * функция изменения партии на сервере
      * @param {Object} data - объект data в большом компоненте формы
    */
    // Отправка сначала хим элементов
    for (const e of data.elemInfo) {
      // отправляем на сервер элемент если он изменился или добавили новый
      if (
        ( // если такой элемент уже был, но он изменился
          data.elemInfoOld[`element_${e.element_num}`] &&
          ( //
            e.element_abbr !== data.elemInfoOld[`element_${e.element_num}`].element_abbr ||
            e.element_content !== data.elemInfoOld[`element_${e.element_num}`].element_content ||
            e.element_assim !== data.elemInfoOld[`element_${e.element_num}`].element_assim
          ) // или элемент новый
        ) || !data.elemInfoOld[`element_${e.element_num}`]) {
        const response = await this.modifyChemistry({
          batch_id: data.idBatch, //  # Ид партии
          element_num: e.element_num, //  # Номер элемента в период. таблице.
          element_content: Number(e.element_content), //  # Содержание элемента в партии
          element_assim: Number(e.element_assim) ? Number(e.element_assim) : null // # Усвоение элемента при добавлении в расплав
        }, token)
        if (response.errorToken) {
          return { errorToken: true, message: 'Ошибка проверки авторизации' }
        }
        if (!response.result?.modified_entities) {
          return { message: 'Ошибка при записи химии' }
        }
      }
    }

    for (const e of Object.values(data.elemInfoOld)) {
      // обнулить элемент в базе если его удалили из списка
      if (data.elemInfo && !data.elemInfo.some(j => j.element_num === e.element_num)) {
        const response = await this.modifyChemistry({
          batch_id: data.idBatch, //  # Ид партии
          element_num: e.element_num, //  # Номер элемента в период. таблице.
          element_content: 0, //  # Содержание элемента в партии,
          elem_assim: Number(e.elem_assimilation) // # Усвоение элемента при добавлении в расплав,
        }, token)
        if (!response.result?.modified_entities) {
          return { message: 'Ошибка при записи химии' }
        }
      }
    }

    // Отправка групп агрегатов
    for (const e of Object.values(data.unitGroupInfo)) {
      // отправляем на сервер элемент если он изменился или добавили новый
      if ((data.unitGroupOld[`id_${e.unit_group_id}`] && e.unit_group_id !== data.unitGroupOld[`id_${e.unit_group_id}`].unit_group_id) || !data.unitGroupOld[`id_${e.unit_group_id}`]) {
        const response = await this.modifyUnitGroup({
          batch_id: data.idBatch, //  # Ид партии
          unit_group_id: e.unit_group_id //  Ид группы агрегатов.
        }, token)
        if (!response.result?.modified_entities) {
          return { message: 'Ошибка при записи групп агрегатов' }
        }
      }
    }

    // удаление групп агрегатов
    for (const e of Object.values(data.unitGroupOld)) {
      // отправляем на сервер элемент если он изменился или добавили новый
      if (!data.unitGroupInfo.find(unit => unit.unit_group_id !== e.unit_group_id)) {
        const response = await this.delUnitGroup({
          batch_id: data.idBatch, //  # Ид партии
          unit_group_id: e.unit_group_id //  Ид группы агрегатов.
        }, token)
        if (!response.result?.modified_entities) {
          return { message: 'Ошибка при удалении групп агрегатов' }
        }
      }
    }

    return await this.createBatch(data, token, data.idBatch)
  }

  // eslint-disable-next-line require-await, @typescript-eslint/no-unused-vars
  async createBatch (data, token, id = null) {
    /**
     * функция изменения партии на сервере
     * @param {Object} data - объект data в большом компоненте формы
    */
    const newData = {}
    // Отправляем партию на фиксацию
    if (id !== null) {
      newData.id = id
    }

    newData.batch_no_extra = data.batch_no_extra
    newData.batch_no_scada = `${data.selectedMaterialName}-${data.batch_no_extra}`
    newData.mat_id = Number(data.selectedMaterial)
    newData.batch_no = data.batch_no
    newData.wght = Number(data.wght)
    newData.len = Number(data.len)
    newData.batch_mat_density = Number(data.batch_mat_density)
    // статусы для партий
    const optionsStatus = [
      { id: 1, name: 'Создана', text: 'I' },
      { id: 2, name: 'Израсходована', text: 'C' },
      { id: 3, name: 'Отменена', text: 'F' },
      { id: 4, name: 'Назначена', text: 'A' }
    ]

    newData.status = optionsStatus.find((item) => {
      return item.id === data.selectedStatus
    }).text
    newData.run_meter_wght = Number(data.run_meter_wght)
    newData.run_meter_wght_fill = Number(data.run_meter_wght_fill)
    newData.fill_factor = Number(data.fill_factor)
    newData.comment = data.comment
    try {
      const response = await this.submitFormBatch(newData, 1, token)
      if (response.errorToken) {
        return { errorToken: true, message: 'Ошибка проверки авторизации' }
      }
      if (response.modified_entities && response.modified_entities.length > 0) {
        return response.modified_entities
      } else {
        console.error('submitFormBatch', response)
        return response?.error || { message: 'Ошибка при записи партии' }
      }
    } catch (error) {
      console.error('submitFormBatch', error)
      return error || { message: 'Ошибка при записи партии' }
    }
  }

  async createNewBatch (data, token) {
    /**
      * функция создании партии на сервере через УДМ
      * @param {Object} data - объект data в большом компоненте формы
      * @param {Object} unitGroupInfo - каталог групп агрегатов в которых будем искать группу УДМ
    */
    const result = await this.createBatch(data, token, data.idBatch)
    if (result.errorToken) {
      return { errorToken: true, message: 'Ошибка проверки авторизации' }
    }
    // если партия создалась и вернулся айди
    if (result[0] && result[0].entity_name === 'batch_of_material') {
      const batchId = result[0].key1 //  # Ид партии
      // Отправка хим элементов не требуется
      if (data.elemInfo && data.elemInfo.length > 0) {
        for (const e of data.elemInfo) {
        // отправляем на сервер элемент
          const response = await this.modifyChemistry({
            batch_id: batchId, //  # Ид партии
            element_num: e.element_num, //  # Номер элемента в период. таблице.
            element_content: e.element_content, //  # Содержание элемента в партии
            element_assim: Number(e.element_assim) ? Number(e.element_assim) : null // # Усвоение элемента при добавлении в расплав
          }, token)
          if (!response.result?.modified_entities) {
            return { message: 'Ошибка при записи химии' }
          }
        }
      }

      // Отправка групп агрегатов
      if (data.unitGroupInfo && data.unitGroupInfo.length > 0) {
        for (const e of Object.values(data.unitGroupInfo)) {
        // отправляем на сервер элемент если он изменился или добавили новый
          const response = await this.modifyUnitGroup({
            batch_id: batchId, //  # Ид партии
            unit_group_id: e.unit_group_id //  Ид группы агрегатов.
          }, token)
          if (!response.result?.modified_entities) {
            return { message: 'Ошибка при записи групп агрегатов' }
          }
        }
      }
      return result
    }
    return { message: 'Ошибка при создании партии' }
  }

  async createBatchUdm (data, token, unitGroupInfo) {
    /**
      * функция создании партии на сервере через УДМ
      * @param {Object} data - объект data в большом компоненте формы
      * @param {Object} unitGroupInfo - каталог групп агрегатов в которых будем искать группу УДМ
    */

    const unitGroupId = unitGroupInfo.find(e => e.name.toLowerCase() === 'удм')
    if (!unitGroupId.id) {
      return { message: 'Ошибка при создании(не найдена группа УДМ)' }
    }

    const result = await this.createBatch(data, token, data.idBatch)
    if (result.errorToken) {
      return { errorToken: true, message: 'Ошибка проверки авторизации' }
    }
    // Отправка хим элементов не требуется
    if (data.elemInfo && data.elemInfo.length > 0) {
      for (const e of data.elemInfo) {
        // отправляем на сервер элемент
        const response = await this.modifyChemistry({
          batch_id: result[0].key1, //  # Ид партии
          element_num: e.element_num, //  # Номер элемента в период. таблице.
          element_content: e.element_content, //  # Содержание элемента в партии
          element_assim: Number(e.element_assim) ? Number(e.element_assim) : null // # Усвоение элемента при добавлении в расплав
        }, token)
        if (!response.result?.modified_entities) {
          return { message: 'Ошибка при записи химии' }
        }
      }
    }
    if (result[0] && result[0].entity_name === 'batch_of_material') {
      const response = await this.modifyUnitGroup({
        batch_id: result[0].key1, //  # Ид партии
        unit_group_id: unitGroupId.id//  Ид группы агрегатов УДМ.
      }, token)
      if (result.errorToken) {
        return { errorToken: true, message: 'Ошибка проверки авторизации' }
      }
      if (!response.result?.modified_entities) {
        return { message: 'Ошибка при записи групп агрегатов' }
      }
      return true
    }

    if (result.errorToken) {
      return { errorToken: true, message: 'Ошибка проверки авторизации' }
    }
    return { message: 'Ошибка при создании партии t' }
  }

  async copyBatch (data, token) {
    /**
      * функция создании партии на сервере через УДМ
      * @param {Object} data - объект data в большом компоненте формы
      * @param {Object} unitGroupInfo - каталог групп агрегатов в которых будем искать группу УДМ
    */
    const result = await this.createBatch(data, token, data.idBatch)
    if (result.errorToken) {
      return { errorToken: true, message: 'Ошибка проверки авторизации' }
    }
    // если партия создалась и вернулся айди
    if (result[0] && result[0].entity_name === 'batch_of_material') {
      const batchId = result[0].key1 //  # Ид партии
      // Отправка хим элементов не требуется
      if (data.elemInfo && data.elemInfo.length > 0) {
        for (const e of data.elemInfo) {
        // отправляем на сервер элемент
          const response = await this.modifyChemistry({
            batch_id: batchId, //  # Ид партии
            element_num: e.element_num, //  # Номер элемента в период. таблице.
            element_content: e.element_content, //  # Содержание элемента в партии
            element_assim: Number(e.element_assim) ? Number(e.element_assim) : null // # Усвоение элемента при добавлении в расплав
          }, token)
          if (!response.result?.modified_entities) {
            return { message: 'Ошибка при записи химии' }
          }
        }
      }
      // Отправка групп агрегатов
      if (data.unitGroupInfo && data.unitGroupInfo.length > 0) {
        for (const e of Object.values(data.unitGroupInfo)) {
        // отправляем на сервер элемент если он изменился или добавили новый
          const response = await this.modifyUnitGroup({
            batch_id: batchId, //  # Ид партии
            unit_group_id: e.unit_group_id //  Ид группы агрегатов.
          }, token)
          if (!response.result?.modified_entities) {
            return { message: 'Ошибка при записи групп агрегатов' }
          }
        }
      }
      return true
    }
    return { message: 'Ошибка при копировании партии' }
  }
}

export default new BatchApi()
