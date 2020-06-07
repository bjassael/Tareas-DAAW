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
    url: '/current/',
    method: 'get'
  })
}

export function newBook () {
  return request({
    url: '/books/',
    method: 'post'
  })
}
