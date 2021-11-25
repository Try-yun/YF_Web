import request from '@/utils/request'

export function register(loginVo) {
  return request({
    url: '/user/register',
    method: 'post',
    data: loginVo
  })
}

export function getCode(mail) {
  return request({
    url: `/user/send/authCode/${mail}`,
    method: 'get'
  })
}

export function getAuthCode() {
  return request({
    url: `/user/send/updateAuthCode`,
    method: 'get'
  })
}

