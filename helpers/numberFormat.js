export default function numberFormat (value) {
  return new Intl.NumberFormat().format(Number(value))
}

export function outputNumber (number) {
  return number && typeof number === 'number' ? numberFormat(number) : ''
}
