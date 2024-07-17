export function timeHM (timestamp) {
  if (timestamp) {
    const date = new Date(timestamp)
    const hours = date.getHours()
    const hoursText = hours > 9 ? `${hours}` : `0${hours}`
    const min = date.getMinutes()
    const minText = min > 9 ? `${min}` : `0${min}`
    return `${hoursText}:${minText}`
  } else {
    return ''
  }
}
