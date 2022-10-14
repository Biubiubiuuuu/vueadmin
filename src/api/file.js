import request from '@/utils/request'

export function upload(data) {
  return request({
    url: '/File/UploadAsync',
    method: 'post',
    data
  })
}

export function deleteFile(data) {
  return request({
    url: '/File/DeleteAsync',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
