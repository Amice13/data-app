const mult = [-1, 5, 7, 9, 4, 6, 10, 5, 7]
const sourceDate = new Date('1899-12-31')

const checkIPN = (value, helper) => {
  if (value === '0000000000') return value
  if (!value) throw new Error('Tax ID is not set')
  value = String(value).trim()
  if (!value.match(/^\d{10}$/)) throw new Error('Tax ID must contain 10 digits')
  const numbers = value.slice(0,9).split('').map(el => parseInt(el))
  const checkSum = numbers.reduce((acc, val, i) => acc + val * mult[i], 0) % 11 % 10
  if (parseInt(value.slice(9, 10)) !== checkSum) throw new Error('This tax ID is wrong')
  return value
}

module.exports = checkIPN
