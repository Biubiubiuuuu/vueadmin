import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/ClientExpendBill/GetWebClientBillExpendListAsync',
    method: 'post',
    data
  })
}

export function getWebClientRechargeListAsync(data) {
  return request({
    url: '/ClientRecharge/GetWebClientRechargeListAsync',
    method: 'post',
    data
  })
}
