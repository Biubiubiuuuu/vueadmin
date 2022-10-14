import request from '@/utils/request'

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
