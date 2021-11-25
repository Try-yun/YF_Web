import request from '@/utils/request'

export function login(loginVo) {
  return request({
    url: '/user/login',
    method: 'post',
    data: loginVo
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function updateUserInfo(userInfo) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data: userInfo
  })
}

export function updateUserPass(userInfo) {
  return request({
    url: '/user/updateUserPass',
    method: 'post',
    data: userInfo
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
