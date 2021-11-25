<template>
  <div class="app-container">
    <div>
      <!-- Form -->
      <el-tooltip class="item" effect="dark" content="建议在闭市时间添加股票" placement="bottom">
        <el-button type="primary" @click="dialogFormVisible = true">添加新股票</el-button>
      </el-tooltip>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="添加股票">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="股票代码">
          <el-input v-model="form.symbol" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="购买金额(元)">
          <el-input v-model="form.principal" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="收益金额(元)">
          <el-input v-model="form.profit" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddData()">添 加</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="股票代码">
              <span>{{ props.row.tsCode }}</span>
            </el-form-item>
            <el-form-item label="交易时间">
              <span>{{ props.row.tradeDate | dateShow }}</span>
            </el-form-item>
            <el-form-item label="股票本金">
              <span>{{ props.row.principal }}</span>
            </el-form-item>
            <el-form-item label="股票昨日收盘价">
              <span>{{ props.row.preClose }}</span>
            </el-form-item>
            <el-form-item label="股票收益率">
              <el-tag v-if="props.row.yieldRate > 0" type="danger">{{ props.row.yieldRate | showBFB }}</el-tag>
              <el-tag v-else type="success">{{ props.row.yieldRate | showBFB }}</el-tag>
            </el-form-item>
            <el-form-item label="股票今日开盘价">
              <span>{{ props.row.open }}</span>
            </el-form-item>
            <el-form-item label="股票所属行业">
              <span>{{ props.row.industry }}</span>
            </el-form-item>
            <el-form-item label="股票今日最高价">
              <span>{{ props.row.high }}</span>
            </el-form-item>
            <el-form-item label="市场类型">
              <span>{{ props.row.market }}</span>
            </el-form-item>
            <el-form-item label="股票今日最低价">
              <span>{{ props.row.low }}</span>
            </el-form-item>
            <el-form-item label="股票地域">
              <span>{{ props.row.area }}</span>
            </el-form-item>
            <el-form-item label="股票今日收盘价">
              <span>{{ props.row.close }}</span>
            </el-form-item>
            <el-form-item label="股票今日成交量(手)">
              <span>{{ props.row.vol }}</span>
            </el-form-item>
            <el-form-item label="股票今日涨跌额">
              <span>{{ props.row.changes }}</span>
            </el-form-item>
            <el-form-item label="股票今日成交额(千元)">
              <span>{{ props.row.amount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="股票名称"
        prop="name"/>
      <el-table-column
        label="持仓金额(元)"
        prop="holdAPosition"/>
      <el-table-column
        label="今日涨跌幅"
      >
        <template slot-scope="scope" >
          <el-tag v-if="scope.row.pctChg > 0" type="danger">{{ scope.row.pctChg }}</el-tag>
          <el-tag v-else type="success">{{ scope.row.pctChg }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="持仓盈利"
      >
        <template slot-scope="scope" >
          <el-tag v-if="scope.row.profit > 0" type="danger">{{ scope.row.profit }}</el-tag>
          <el-tag v-else type="success">{{ scope.row.profit }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="股票数据时间"
      >
        <template slot-scope="scope" >
          {{ scope.row.tradeDate | dateShow }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        prop="desc">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="建议在闭市时间修改股票数据" placement="bottom">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="fn(scope.row)">修改仓位</el-button>
          </el-tooltip>
          <el-button size="mini" type="danger" @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogStockFormVisible" title="股票修改">
      <el-form :model="stockform">
        <el-form-item :label-width="formLabelWidth" label="股票代码">
          <el-input v-model="stockform.tsCode" :disabled="true" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="购买金额(元)">
          <el-input v-model="stockform.principal" autocomplete="off"/>
        </el-form-item>
        <el-form-item v-show="inShow" :label-width="formLabelWidth" label="收益金额(元)">
          <el-input v-model="stockform.profit" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="修改类型">
          <el-select v-model="stockform.region" @change="changeFn">
            <el-option label="数据修改" value="1"/>
            <el-option label="加仓" value="2"/>
            <el-option label="减仓" value="3"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStockFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpdateData()">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import stockApi from '@/api/securities/stock'

export default {
  filters: {
    dateShow: function(val) {
      let str = ''
      str = str + val.slice(0, 4) + '/'
      str = str + val.slice(4, 6) + '/'
      str = str + val.slice(6, 8)
      return str
    },
    showBFB: (val) => {
      const num = (val * 100).toFixed(3)
      let str = ''
      str = str + num + '%'
      return str
    }
  },
  data() {
    return {
      dialogStockFormVisible: false,
      tableData: [],
      dialogFormVisible: false,
      stockform: {},
      formLabelWidth: '120px',
      form: {},
      oldDate: {
        principal: '',
        profit: ''
      },
      inShow: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      stockApi.getList().then(response => {
        this.tableData = response.data.list
      })
    },
    // 数据添加
    AddData() {
      this.dialogFormVisible = false
      stockApi.save(this.form).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.form = {}
      })
      this.fetchData()
    },
    // 删除记录
    removeById(id) {
      // 询问是否删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return stockApi.removeById(id)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    fn(val) {
      this.dialogStockFormVisible = true
      this.stockform = val
    },
    changeFn(value) {
      if (value !== '1') {
        this.inShow = false
        if (this.form.principal === '') return false
        this.oldDate.principal = this.form.principal
        this.oldDate.profit = this.form.profit
        this.form.principal = ''
        this.form.profit = ''
      } else {
        this.inShow = true
        if (this.oldDate.principal === '') return false
        this.form.principal = this.oldDate.principal
        this.form.profit = this.oldDate.profit
      }
    },
    // 数据添加
    UpdateData() {
      this.dialogStockFormVisible = false
      stockApi.update(this.stockform).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
      this.stockform = {}
      this.fetchData()
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 160px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

