/**
  * функция возвращающая отфильтрованный массив материалов в форму добавления/редактирования партий и материалов
*/

export function optionsMaterial (materialArr, choiseMatType, add = false) {
  let arr = materialArr
  // если выбран тип материала
  if (choiseMatType && arr && arr.length > 0) {
    if (add) { // это если идёт добавление новой партии, убираем пусто и не используемое
      arr = arr.filter(e => e.usage_tag === 1)
      arr = arr.filter(e => !`${e.name}`.includes('[Пусто]')) // Убираем все пусто
    }
    return arr.filter(e => e.type_id === choiseMatType)
  }
  return arr
}
