import request from '@/utils/request'

export default {

  showChart(searchObj) {
    return request({
      url: '/bill/statistics/billType',
      method: 'post',
      data: searchObj
    })
  },

  // 用户统计信息展示
  indexReveal(searchObj) {
    return request({
      url: '/bill/statistics/index/reveal',
      method: 'post',
      data: searchObj
    })
  },

  // 3个月账单信息展示
  showInfo() {
    return request({
      url: `/bill/statistics/get/sumMonth`,
      method: 'get'
    })
  }
}

