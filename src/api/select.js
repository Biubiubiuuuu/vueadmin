import request from '@/utils/request'

export async function getCountrySelect() {
  return request({
    url: '/Country/GetSelectAsync',
    method: 'post'
  })
}

export async function getClientSelect(data) {
  return request({
    url: '/Client/GetSelectAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function getCarrierRouteSelect() {
  return request({
    url: '/CarrierRoute/GetCurrentSelectAsync',
    method: 'post'
  })
}

export async function getCurrencySelect() {
  return request({
    url: '/Server/GetCurrencyType',
    method: 'post'
  })
}

export async function getExtraServiceSelect() {
  return request({
    url: '/',
    method: 'post'
  })
}

export async function getGoodsTypeSelect() {
  return request({
    url: '/Server/GetGoodsType',
    method: 'post'
  })
}

export async function getPackTypeSelect() {
  return request({
    url: '/Server/GetPackType',
    method: 'post'
  })
}

export async function getUnitTypeSelect() {
  return request({
    url: '/Server/GetUnitCodeType',
    method: 'post'
  })
}
