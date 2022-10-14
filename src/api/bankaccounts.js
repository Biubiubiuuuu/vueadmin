import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/CompanyBrankAccount/GetBrankAccountList',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
