export function secToMin (sec) {
  if (sec) {
    const min = Math.floor(sec / 60)
    const minText = min > 9 ? `${min}` : `0${min}`
    return `${minText}`
  } else {
    return ''
  }
}
