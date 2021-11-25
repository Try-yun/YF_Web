<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="searchObj.dealTimeBegin"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.dealTimeEnd"
          type="datetime"
          placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>

      <el-form-item label="金额范围">
        <el-input-number v-model="searchObj.moneyBegin" placeholder="(小)" />
      </el-form-item>
      <el-form-item label="-">
        <el-input-number v-model="searchObj.moneyEnd" placeholder="(大)" />
      </el-form-item>

      <el-form-item label="收/支">
        <el-select v-model="searchObj.incomeAndExpenditure" clearable placeholder="收/支">
          <el-option value="支出" label="支出"/>
          <el-option value="收入" label="收入"/>
          <el-option value="其他" label="其他"/>
        </el-select>
      </el-form-item>

      <el-form-item label="上传时间">
        <el-date-picker
          v-model="searchObj.uploadingTimeBegin"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.uploadingTimeEnd"
          type="datetime"
          placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 工具条 -->
    <div style="margin-bottom: 15px;">
      <el-button type="danger" size="mini" @click="batchRemove()">批量删除</el-button>
      <router-link :to="'/bill/create'">
        <el-button type="primary" size="mini" icon="el-icon-plus">添加账单记录</el-button>
      </router-link>
      <el-tag >
        <i class="el-icon-download"/>
        <a ref="a" @click.prevent="downloadEXCEL">点击导出账单</a>
      </el-tag>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="dealTime" label="交易时间" width="155" align="center"/>
      <el-table-column prop="dealType" label="交易类型" width="80" align="center"/>
      <el-table-column prop="productName" label="商品名称" align="center"/>
      <el-table-column prop="money" label="金额(元)" width="100" align="center">
        <template slot-scope="scope">
          <el-tag >{{ Number(scope.row.money).toFixed(2) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="counterparty" label="交易对方" width="80" align="center"/>
      <el-table-column prop="patternOfPayment" label="支付方式" width="80" align="center"/>
      <el-table-column prop="incomeAndExpenditure" label="收/支" width="60" align="center"/>
      <el-table-column prop="transactionStatus" label="交易状态" width="80" align="center"/>
      <el-table-column prop="gmtCreate" label="上传时间" width="160" align="center"/>
      <el-table-column prop="remark" label="备注" width="80" align="center"/>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <router-link :to="'/bill/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"/>
  </div>

</template>

<script>
import detailApi from '@/api/bill/detail'
import { getToken } from '@/utils/auth' // 验
export default {

  data() {
    return {
      list: [], // 讲师列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 5, // 每页记录数
      searchObj: { dealTimeBegin: '', dealTimeEnd: '' }, // 查询表单
      multipleSelection: [], // 批量选中的记录列表
      myHeaders: { token: getToken() },
      defaultExcelTemplate: ''// 导出Excel地址
    }
  },

  created() {
    this.fetchData()
  },

  methods: {

    // 调用api模块，加载列表
    fetchData() {
      detailApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },

    // 改编页码
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },

    // 改变每页记录数
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },

    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },

    // 删除记录
    removeById(id) {
      // 询问是否删除
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return detailApi.removeById(id)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },

    // 当表格中多选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },

    // 批量删除
    batchRemove() {
      // 判断是否选中记录
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录'
        })
        return
      }

      // 询问是否删除
      this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 拿到选中数据
        const idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        return detailApi.batchRemove(idList)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },

    // 输入建议
    querySearch(queryString, callback) {
      detailApi.selectNameListByKey(queryString).then(response => {
        callback(response.data.nameList)
      })
    },
    downloadEXCEL() {
      if (this.searchObj.dealTimeBegin === '') {
        this.searchObj.dealTimeBegin = '2021-01-01 00:00:00'
      }
      if (this.searchObj.dealTimeEnd === '') {
        this.searchObj.dealTimeEnd = '2021-12-31 00:00:00'
      }
      this.defaultExcelTemplate = process.env.BASE_API + '/gfs/export/excel/' + this.searchObj.dealTimeBegin + '/' + this.searchObj.dealTimeEnd + '/' + this.myHeaders.token
      window.location.href = this.defaultExcelTemplate
    }
  }
}
</script>
