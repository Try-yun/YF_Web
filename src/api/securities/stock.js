// @ 符号在build/webpack.base.conf.js 中配置 表示 'src' 路径
import request from '@/utils/request'

export default {
  // 获取列表
  getList() {
    return request({
      url: '/stock/user/list',
      method: 'get'
    })
  },
  // 删除
  removeById(id) {
    return request({
      url: `/stock/user/remove/${id}`,
      method: 'delete'
    })
  },
  // 新增
  save(stockformVo) {
    return request({
      url: '/stock/user/save',
      method: 'post',
      data: stockformVo
    })
  },

  // 修改账单记录
  update(updatestockVo) {
    return request({
      url: `/stock/user/update`,
      method: 'put',
      data: updatestockVo
    })
  }
}
