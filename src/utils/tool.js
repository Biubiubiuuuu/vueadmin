
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

