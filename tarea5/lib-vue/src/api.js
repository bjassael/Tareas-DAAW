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

export function getBooksByUser (searchParams) {
  return request({
    url: '/books/',
    method: 'get',
    params: {
      name: searchParams.searchParams.name
    }
  })
}

export function newBook (bookData) {
  return request({
    url: '/books/',
    method: 'post',
    data: bookData
  })
}
