/**
  * функция возвращающая настройки для  формы партий
*/

class EditorForm {
  defaultData () {
    /**
      * настройки модального окна при открытии
    */
    const data = {
      loaded: false,
      error: '',
      type: '',
      choiseMatType: 2,
      choiseMatTypeArr: [
        {
          id: 1,
          name: 'Сыпучие'
        },
        {
          id: 2,
          name: 'Проволока'
        },
        {
          id: 3,
          name: 'Газ'
        }],
      idBatch: null,
      batch_no_extra: null,
      batch_no_scada: null,
      idMaterial: null,
      batch_no: null,
      wght: null,
      len: null,
      run_meter_wght: null,
      run_meter_wght_fill: null,
      fill_factor: null,
      dflt_wght: null,
      comment: null,
      type_id: null,
      name: null,
      abbr: null,
      cost: null,
      id_level3: null,
      run_meter_wght_default: null,
      run_meter_wght_filler_default: null,
      batch_mat_density: null,
      mat_density: null,
      usage_tag: null,
      hdl_type_id: null,
      packaged_output: null,
      errorIdMaterial: '',
      selectedUnits: 0,
      selectedMatType: 1,
      selectedUsage: 0,
      selectedStatus: 1, // по дефолту единичка - используется
      selectedMaterial: null,
      selectedMaterialName: '',
      selectedPath: 0,
      selectedUsageTag: 1,
      optionsUsageTag: [{ id: 0, name: 'Не используется' }, { id: 1, name: 'Используется' }],
      errorNumberPart: '',
      elemInfo: [],
      elemInfoOld: {},
      unitGroupInfo: [],
      unitGroupOld: {}
    }
    return data
  }
}

export default new EditorForm()
