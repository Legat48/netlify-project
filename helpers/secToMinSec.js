export function secToMinSec (sec) {
  if (sec) {
    const min = Math.floor(sec / 60)
    const minText = min > 9 ? `${min}` : `0${min}`
    const remSec = sec % 60
    const secText = remSec > 9 ? `${remSec}` : `0${remSec}`
    return `${minText}:${secText}`
  } else {
    return ''
  }
}
