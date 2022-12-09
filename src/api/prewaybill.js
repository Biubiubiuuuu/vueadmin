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

export function getDetail(data) {
  return request({
    url: '/Client/PreWayBill/GetAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getList(data) {
  return request({
    url: '/Client/PreWayBill/GetListAsync',
    method: 'post',
    data
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
    url: '/Client/PreWayBill/SubmitReturnAsync',
    method: 'post',
    data
  })
}

export function batchImportAsync(data) {
  return request({
    url: '/Client/PreWayBill/BatchImportAsync',
    method: 'post',
    data
  })
}

export function convertToPreAsync(data) {
  return request({
    url: '/Client/PreWayBill/ConvertToPreAsync',
    method: 'post',
    data
  })
}

export function printLabelAsync(data) {
  return request({
    url: '/Client/PreWayBill/PrintLabelAsync',
    method: 'post',
    data
  })
}

export function printInvoiceLabelAsync(data) {
  return request({
    url: '/Client/PreWayBill/PrintInvoiceLabelAsync',
    method: 'post',
    data
  })
}

export function getExtraServiceKindAsync(data) {
  return request({
    url: '/CarrierRoute/GetExtraServiceKindAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getSharedTranParametersListAsync() {
  return request({
    url: '/SharedTran/GetSharedTranParametersListAsync',
    method: 'post'
  })
}

export function exportExcelAsync(data) {
  return request({
    url: '/Client/PreWayBill/ExportExcelAsync',
    method: 'post',
    data
  })
}
