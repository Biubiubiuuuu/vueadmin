/**
 * 封装操作localstorage本地存储的方法
 */
export const storage = {
  // 存储
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  // 取出
  get(key) {
    const value = localStorage.getItem(key)
    if (value && value !== 'undefined' && value !== 'null') {
      return JSON.parse(value)
    }
    return null
  },
  // 删除
  remove(key) {
    localStorage.removeItem(key)
  }
}
