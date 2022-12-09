
export const delEmptyQueryNodes = (obj = {}) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    value && typeof value === 'object' && delEmptyQueryNodes(value)
    if (key !== 'hidden') {
      (value === '' || value === null || value === undefined || value.length === 0 || Object.keys(value).length === 0) && delete obj[key]
    }
  })
  if (obj.meta && obj.hidden) {
    obj.meta.breadcrumb = false
  }
  return obj
}

export function newCode() {
  var data = new Date()
  var month = (data.getMonth() + 1).toString()
  var day = data.getDate().toString()
  return month + (day.length < 2 ? '0' + day : day) + uniqueNumber().toString().substring(7)
}

uniqueNumber.previous = 0

function uniqueNumber() {
  var date = Date.now()
  if (date <= uniqueNumber.previous) {
    date = ++uniqueNumber.previous
  } else {
    uniqueNumber.previous = date
  }
  return date
}
