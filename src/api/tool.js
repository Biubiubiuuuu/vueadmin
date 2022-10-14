import request from '@/utils/request'

export function searchAddressbook(data) {
  return request({
    url: '/Tool/SearchAddressbook',
    method: 'post',
    data
  })
}

export function SearchAddressbookDHL(data) {
  return request({
    url: '/Tool/SearchAddressbookDHL',
    method: 'post',
    data
  })
}

export function SearchRemotebook(data) {
  return request({
    url: '/Tool/SearchRemotebook',
    method: 'post',
    data
  })
}
