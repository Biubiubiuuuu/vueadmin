import request from '@/utils/request'

export function getCountrySelect() {
  return request({
    url: '/Country/GetSelectAsync',
    method: 'post'
  })
}

export function getClientSelect(data) {
  return request({
    url: '/Client/GetSelectAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCarrierRouteSelect() {
  return request({
    url: '/CarrierRoute/GetCurrentSelectAsync',
    method: 'post'
  })
}

export function getCurrencySelect() {
  return request({
    url: '/Server/GetCurrencyType',
    method: 'post'
  })
}

export function getExtraServiceSelect() {
  return request({
    url: '/',
    method: 'post'
  })
}

export function getGoodsTypeSelect() {
  return request({
    url: '/Server/GetGoodsType',
    method: 'post'
  })
}

export function getPackTypeSelect() {
  return request({
    url: '/Server/GetPackType',
    method: 'post'
  })
}

export function getUnitTypeSelect() {
  return request({
    url: '/Server/GetUnitCodeType',
    method: 'post'
  })
}
