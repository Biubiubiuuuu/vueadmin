import request from '@/utils/request'

export function getListAsync(data) {
  return request({
    url: '/Client/GetListAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCommonConsigneeAsync(data) {
  return request({
    url: '/Client/GetCommonConsigneeAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCommonConsigneeListAsync(data) {
  return request({
    url: '/Client/GetCommonConsigneeListAsync',
    method: 'post',
    data
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

export function getCommonSenderAsync(data) {
  return request({
    url: '/Client/GetCommonSenderAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCommonSenderDefaultAsync(data) {
  return request({
    url: '/Client/GetCommonSenderDefaultAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCommonSenderListAsync(data) {
  return request({
    url: '/Client/GetCommonSenderListAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function editCommonSenderAsync(data) {
  return request({
    url: '/Client/EditCommonSenderAsync',
    method: 'post',
    data
  })
}

export function setCommonSenderDefaultAsync(data) {
  return request({
    url: '/Client/SetCommonSenderDefaultAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function setCommonInvoiceAsync(data) {
  return request({
    url: '/Client/SetCommonInvoiceAsync',
    method: 'post',
    data
  })
}

export function getCommonInvoiceAsync(data) {
  return request({
    url: '/Client/GetCommonInvoiceAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCommonInvoiceListAsync(data) {
  return request({
    url: '/Client/GetCommonInvoiceListAsync',
    method: 'post',
    data
  })
}

export function editCommonInvoiceAsync(data) {
  return request({
    url: '/Client/EditCommonInvoiceAsync',
    method: 'post',
    data
  })
}

export function deleteCommonInvoiceAsync(data) {
  return request({
    url: '/Client/DeleteCommonInvoiceAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteCommonConsigneeAsync(data) {
  return request({
    url: '/Client/DeleteCommonConsigneeAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteCommonSenderAsync(data) {
  return request({
    url: '/Client/DeleteCommonSenderAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function changePassAsync(data) {
  return request({
    url: '/Client/ChangePassAsync',
    method: 'post',
    data
  })
}

export function changeStatusAsync(data) {
  return request({
    url: '/Client/ChangeStatusAsync',
    method: 'post',
    data
  })
}
