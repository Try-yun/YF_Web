<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="基金名称"
      width="180"/>
    <el-table-column
      prop="name"
      label="资金"
      width="180"/>
    <el-table-column
      prop="address"
      label="时间"/>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loading: true
    }
  },

  created() {
    this.opensaveOrUpdate1()
  },

  methods: {
    opensaveOrUpdate1() {
      this.$notify({
        title: '重要提示',
        message: '系统基金模块功能暂时停止使用',
        duration: 0
      })
    }
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>

