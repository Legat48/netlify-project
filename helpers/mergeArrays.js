export default function (arr1, arr2, key) {
  const newArr = arr1
  if (arr2 && Array.isArray(arr2)) {
    for (const [index, item] of arr2.entries()) {
      const newIndex = newArr.findIndex(i => i[key] === item[key])
      if (newIndex === -1) {
        if (newArr[index]) {
          newArr.splice(index, 0, item)
        } else {
          newArr.push(item)
        }
      }
    }
  }
  return newArr
}
