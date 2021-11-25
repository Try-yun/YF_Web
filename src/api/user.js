import request from '@/utils/request'

export default {
  // 获取用户资产信息
  getUserProperty() {
    return request({
      url: '/user/user-property/get',
      method: 'get'
    })
  },
  // 用户重置资产
  save(propertyVo) {
    return request({
      url: '/user/user-property/save',
      method: 'post',
      data: propertyVo
    })
  },
  // 获取用户资产信息
  getUserWarning() {
    return request({
      url: '/user/consumption-warning/get',
      method: 'get'
    })
  },
  // 用户重置资产
  saveWarning(warningVo) {
    return request({
      url: '/user/consumption-warning/save',
      method: 'post',
      data: warningVo
    })
  },
  // 获取用户资金占比
  getPropertyPercentage() {
    return request({
      url: '/user/user-property/get/property/percentage',
      method: 'get'
    })
  },
  // 获取用户资金流水
  getPropertyStat() {
    return request({
      url: '/bill/statistics/get/property/stat',
      method: 'get'
    })
  }

}
