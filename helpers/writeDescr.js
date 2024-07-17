export default function writeDescr (arr, scheme) {
  Object.values(arr).map((e) => {
    Object.keys((key) => {
      if (scheme.key) {
        e[key] = `${e[key]} (${scheme[key]})`
      }
    })
    return {
      ...e
    }
  })
  return arr
}
