<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-position="left" inline class="demo-form-expand">
      <el-form-item label="交易时间">
        <el-date-picker v-model="bill.dealTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>
      <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
      <el-form-item label="交易金额">
        <el-input-number v-model="bill.money"/>
      </el-form-item>

      <el-form-item label="收/支">
        <el-select v-model="bill.incomeAndExpenditure" clearable placeholder="收/支">
          <el-option value="支出" label="支出"/>
          <el-option value="收入" label="收入"/>
          <el-option value="其他" label="其他"/>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="bill.productName"/>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-input v-model="bill.dealType"/>
      </el-form-item>
      <el-form-item label="交易对方">
        <el-input v-model="bill.counterparty"/>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-input v-model="bill.patternOfPayment"/>
      </el-form-item>
      <el-form-item label="交易状态">
        <el-input v-model="bill.transactionStatus"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="bill.remark"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
  </el-form></div>
</template>

<script>
import detailApi from '@/api/bill/detail'

export default {

  data() {
    return {
      // 账单对象
      bill: {},
      saveBtnDisabled: false // 默认按钮可用
      // BASE_API: process.env.BASE_API   环境
    }
  },

  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },

  methods: {
    saveOrUpdate() {
      console.log(this.bill)
      this.saveBtnDisabled = true
      if (!this.bill.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 数据保存
    saveData() {
      detailApi.save(this.bill).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/bill' })
      })
    },

    // 数据更新
    updateData() {
      detailApi.updateById(this.bill).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/bill' })
      })
    },

    // 根据id查询数据
    fetchDataById(id) {
      detailApi.getById(id).then(response => {
        this.bill = response.data.item
      })
    }
  }
}
</script>

<style>
  .demo-form-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 10;
    width: 50%;
  }
  .demo-form-expand {
    font-size: 0;
  }
  .demo-form-expand label {
    width: 120px;
    color: #99a9bf;
  }
</style>
