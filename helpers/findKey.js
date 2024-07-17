export const findKey = (obj, key) => {
  for (const prop of obj) {
    if (obj.hasOwnProperty(prop)) {
      if (Array.isArray(obj[prop])) {
        for (const item of obj[prop]) {
          const result = findKey(item, key)
          if (result) {
            return result
          }
        }
      } else if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        const result = findKey(obj[prop], key)
        if (result) {
          return result
        }
      }
    }
  }
  return null
}
