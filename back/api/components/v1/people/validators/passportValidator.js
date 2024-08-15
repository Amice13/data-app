const validatePassport = (val) => {
  if (typeof val === 'number') val = String(val)
  const test1 = /^\d{9}$/.test(val)
  const test2 = /^[А-ЯЄІЇ]{2} *\d{6}$/.test(val)
  if (!test1 && !test2) throw new Error('This passport number is wrong')
  return val
}

module.exports = validatePassport
