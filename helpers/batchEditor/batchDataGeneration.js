/**
  * функция возвращающая настройки для  формы партий
*/

class BatchDataGeneration {
  addBatch () {
    /**
      * настройки модального окна при открытии
    */
    const data = {
      title: 'Добавить партию',
      icon: 'add',
      type: 'batch',
      id: '',
      copyID: '',
      obgUnit: {
        buttonsMaterial: true,
        optionsMaterial: true,
        buttonsElem: true,
        buttonsUnitGroup: true,
        inputPathNumber: true,
        inputBatchNoExtra: true,
        inputBatchScada: true,
        inputPathWeight: true,
        inputBatchLength: true,
        inputWeightMeterWire: true,
        inputWeightMeterFiller: true,
        inputBatchMatDensity: true,
        inputComment: true,
        inputFillingFactor: true
      }
    }
    return data
  }

  copyBatch (id, name) {
    /**
      * настройки модального окна при открытии в случае копирования
    */
    const data = {
      title: `Копировать партию ${name}`,
      icon: 'copy',
      type: 'batch',
      id,
      copyID: '',
      obgUnit: {
        optionsMaterial: true,
        buttonsElem: true,
        buttonsUnitGroup: true,
        inputPathNumber: true,
        inputBatchNoExtra: true,
        inputBatchScada: true,
        inputPathWeight: true,
        inputBatchLength: true,
        inputWeightMeterWire: true,
        inputWeightMeterFiller: true,
        inputBatchMatDensity: true,
        inputComment: true,
        inputFillingFactor: true
      }
    }
    return data
  }
}

export default new BatchDataGeneration()
