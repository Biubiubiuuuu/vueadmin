var store = require('store')

export function setCountryListCache(data) {
  store.set('dy_country', data)
}

export function getCountryListCache() {
  return store.get('dy_country')
}

export function setCarrierRouteCache(data) {
  store.set('dy_carrier_route', data)
}

export function getCarrierRouteCache() {
  return store.get('dy_carrier_route')
}

export function setClientCache(data) {
  store.set('dy_client', data)
}

export function getClientCache() {
  return store.get('dy_client')
}

export function setCurrencyCache(data) {
  store.set('dy_currency', data)
}

export function getCurrencyCache() {
  return store.get('dy_currency')
}

export function setGoodsTypeCache(data) {
  store.set('dy_goodsType', data)
}

export function getGoodsTypeCache() {
  return store.get('dy_goodsType')
}

export function setPackTypeCache(data) {
  store.set('dy_packType', data)
}

export function getPackTypeCache() {
  return store.get('dy_packType')
}

export function setUnitTypeCache(data) {
  store.set('dy_unitType', data)
}

export function getUnitTypeCache() {
  return store.get('dy_unitType')
}
