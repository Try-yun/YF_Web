// @ 符号在build/webpack.base.conf.js 中配置 表示 'src' 路径
import request from '@/utils/request'

export default {
  // 分页查询
  pageList(page, limit, searchObj) {
    return request({
      url: `/bill/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  // 删除
  removeById(id) {
    return request({
      url: `/bill/remove/${id}`,
      method: 'delete'
    })
  },
  // 批量删除
  batchRemove(idList) {
    return request({
      url: '/bill/batch-remove',
      method: 'delete',
      data: idList
    })
  },
  // 新增
  save(bill) {
    return request({
      url: '/bill/save',
      method: 'post',
      data: bill
    })
  },
  // 根据id获取账单记录
  getById(id) {
    return request({
      url: `/bill/get/${id}`,
      method: 'get'
    })
  },
  // 修改账单记录
  updateById(bill) {
    return request({
      url: `/bill/update`,
      method: 'put',
      data: bill
    })
  }
}
