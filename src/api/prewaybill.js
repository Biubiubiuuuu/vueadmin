import request from '@/utils/request'

export function insert(data) {
  return request({
    url: '/Client/PreWayBill/InsertAsync',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/Client/PreWayBill/EditAsync',
    method: 'post',
    data
  })
}

export function getDetail(params) {
  return request({
    url: '/Client/PreWayBill/GetAsync',
    method: 'post',
    params
  })
}

export function getList(params) {
  return request({
    url: '/Client/PreWayBill/GetListAsync',
    method: 'post',
    params
  })
}

export function batchImport(params) {
  return request({
    url: '/Client/PreWayBill/BatchImportAsync',
    method: 'post',
    params
  })
}

export function transferDrafts(data) {
  return request({
    url: '/Client/PreWayBill/TransferDraftsAsync',
    method: 'post',
    data
  })
}

export function removesAsync(data) {
  return request({
    url: '/Client/PreWayBill/RemovesAsync',
    method: 'post',
    data
  })
}

export function hardDeleteAsync(data) {
  return request({
    url: '/Client/PreWayBill/hardDeleteAsync',
    method: 'post',
    data
  })
}

export function getRecStateSumAsync() {
  return request({
    url: '/Client/PreWayBill/GetRecStateSumAsync',
    method: 'post'
  })
}

export function cancelSeizureOrReturnAsync(data) {
  return request({
    url: '/Client/PreWayBill/CancelSeizureOrReturnAsync',
    method: 'post',
    data
  })
}

export function submitSeizureAsync(data) {
  return request({
    url: '/Client/PreWayBill/submitSeizureAsync',
    method: 'post',
    data
  })
}

export function submitReturnAsync(data) {
  return request({
    url: '/Client/PreWayBill/submitReturnAsync',
    method: 'post',
    data
  })
}
