import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Client/PostLoginAsync',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/Client/GetLoginInfoAsync',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/Client/PostLoginOutAsync',
    method: 'post'
  })
}

export function getSysInfoByDomainPrefixAsync() {
  return request({
    url: '/Client/GetSysInfoByDomainPrefixAsync',
    method: 'post'
  })
}
