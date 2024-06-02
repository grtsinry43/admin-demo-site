import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/admin/login',
    contentType: 'application/json',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/admin/whoami',
    contentType: 'application/json',
    method: 'get',
    params: {
      authorization: "Bearer " + token,
    }
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
