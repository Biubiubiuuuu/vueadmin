import request from '@/utils/fileUpdate'

export async function upload(data) {
  return request({
    url: '/file',
    method: 'post',
    data
  })
}

export function deleteFile(data) {
  return request({
    url: '/file',
    method: 'post',
    data
  })
}
