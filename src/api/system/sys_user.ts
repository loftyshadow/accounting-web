import request from '@/utils/request'

const MODULE_API = '/auth'

export default {
  // 获取验证码
  getCaptcha() {
    return request({
      url: '/captcha?t=' + new Date().getTime().toString(),
      method: 'get'
    })
  },
  // 登录
  login(data: any) {
    return request({
      url: MODULE_API + '/login',
      method: 'post',
      data
      // headers: {
      //   // 客户端信息Base64明文：web:123456
      //   Authorization: 'Basic d2ViOjEyMzQ1Ng==',
      // },
    })
  },
  // 注销
  logout() {
    return request({
      url: MODULE_API + '/logout',
      method: 'delete'
    })
  },
  // 获取用户菜单
  getUserMenu() {
    return request({
      url: MODULE_API + '/userMenu',
      method: 'get'
      // params: { systemSource: 0 }
    })
  }
}
