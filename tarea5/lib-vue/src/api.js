import request from '@/request'

export function getOrCreateUserToken (userData) {
  return request({
    url: '/token/',
    method: 'post',
    data: userData
  })
}

export function deleteUserToken () {
  return request({
    url: '/token/',
    method: 'delete'
  })
}

export function getCurrentUserRequest () {
  return request({
    url: '/users/current/',
    method: 'get'
  })
}
