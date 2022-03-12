import request from '@/utils/request'

export function getCommonConsigneeAsync(params) {
  return request({
    url: '/Client/GetCommonConsigneeAsync',
    method: 'post',
    params
  })
}

export function setCommonConsigneeAsync(data) {
  return request({
    url: '/Client/SetCommonConsigneeAsync',
    method: 'post',
    data
  })
}

export function editCommonConsigneeAsync(data) {
  return request({
    url: '/Client/EditCommonConsigneeAsync',
    method: 'post',
    data
  })
}

export function setCommonSenderAsync(data) {
  return request({
    url: '/Client/SetCommonSenderAsync',
    method: 'post',
    data
  })
}

export function getCommonSenderAsync(params) {
  return request({
    url: '/Client/GetCommonSenderAsync',
    method: 'post',
    params
  })
}

export function editCommonSenderAsync(data) {
  return request({
    url: '/Client/EditCommonSenderAsync',
    method: 'post',
    data
  })
}

export function setCommonInvoiceAsync(data) {
  return request({
    url: '/Client/SetCommonInvoiceAsync',
    method: 'post',
    data
  })
}

export function getCommonInvoiceAsync(params) {
  return request({
    url: '/Client/GetCommonInvoiceAsync',
    method: 'post',
    params
  })
}

export function editCommonInvoiceAsync(data) {
  return request({
    url: '/Client/EditCommonInvoiceAsync',
    method: 'post',
    data
  })
}
