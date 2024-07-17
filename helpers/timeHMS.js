export function timeHMS (timestamp, abr = false) {
  if (timestamp) {
    const date = new Date(timestamp)
    const hours = date.getHours()
    const hoursText = hours > 9 ? `${hours}` : `0${hours}`
    const min = date.getMinutes()
    const minText = min > 9 ? `${min}` : `0${min}`
    const sec = date.getSeconds()
    const secText = sec > 9 ? `${sec}` : `0${sec}`
    if (abr) {
      return `${hoursText}ч.${minText}мин.${secText}с.`
    }
    return `${hoursText}:${minText}:${secText}`
  } else {
    return ''
  }
}
