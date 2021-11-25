<template>
  <div class="app-container">
    <el-form label-width="200px">

      <el-form-item label="信息描述">

        <el-tag type="info">账单模版下载</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="defaultExcelTemplate">点击下载模版</a>
        </el-tag>

      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="open1">微信账单下载步骤</el-button>
      </el-form-item>
      <el-form-item label="微信(模板)下载账单上传">
        <el-upload
          ref="upload1"
          :auto-upload="false"
          :on-exceed="fileUploadExceed1"
          :on-success="fileUploadSuccess1"
          :on-error="fileUploadError1"
          :limit="1"
          :headers="myHeaders"
          action="http://139.196.107.185:8888/gfs/weChatImport"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button
            slot="trigger"
            size="small"
            type="primary">选取文件</el-button>
          <el-button
            :disabled="importBtnDisabled1"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload1()">导入</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="text" @click="open2">支付宝账单下载步骤</el-button>
      </el-form-item>
      <el-form-item label="支付宝下载账单上传">
        <el-upload
          ref="upload2"
          :auto-upload="false"
          :on-exceed="fileUploadExceed2"
          :on-success="fileUploadSuccess2"
          :on-error="fileUploadError2"
          :limit="1"
          :headers="myHeaders"
          action="http://139.196.107.185:8888/gfs/alipayImport"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button
            slot="trigger"
            size="small"
            type="primary">选取文件</el-button>
          <el-button
            :disabled="importBtnDisabled2"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload2()">导入</el-button>
        </el-upload>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth' // 验
export default {
  data() {
    return {
      defaultExcelTemplate: process.env.BASE_API + '/gfs/billTemplate/download', // 默认Excel模板
      importBtnDisabled1: false, // 导入按钮是否禁用
      importBtnDisabled2: false, // 导入按钮是否禁用,
      myHeaders: { token: getToken() }
    }
  },

  methods: {

    // 执行上传
    submitUpload1() {
      this.importBtnDisabled1 = true // 禁用按钮
      this.$refs.upload1.submit() // 手动表单提交
    },

    // 执行上传
    submitUpload2() {
      this.importBtnDisabled2 = true // 禁用按钮
      this.$refs.upload2.submit() // 手动表单提交
    },

    // 当选择文件超出约定数量时触发
    fileUploadExceed1() {
      this.$message.warning('只能选取一个文件')
    },

    // 当选择文件超出约定数量时触发
    fileUploadExceed2() {
      this.$message.warning('只能选取一个文件')
    },

    // 上传成功的回调
    fileUploadSuccess1(response) {
      if (response.success) {
        this.importBtnDisabled1 = false // 启用按钮
        this.$message.success(response.message)
        this.$refs.upload1.clearFiles() // 清空文件列表
      } else {
        this.$message.error('上传失败! （非200）')
      }
    },

    // 上传成功的回调
    fileUploadSuccess2(response) {
      if (response.success) {
        this.importBtnDisabled2 = false // 启用按钮
        this.$message.success(response.message)
        this.$refs.upload2.clearFiles() // 清空文件列表
      } else {
        this.$message.error('上传失败! （非200）')
      }
    },

    // 上传失败的回调
    fileUploadError1() {
      this.importBtnDisabled1 = false // 启用按钮
      this.$message.error('上传失败! （http失败）')
      this.$refs.upload1.clearFiles() // 清空文件列表
    },

    // 上传失败的回调
    fileUploadError2() {
      this.importBtnDisabled2 = false // 启用按钮
      this.$message.error('上传失败! （http失败）')
      this.$refs.upload2.clearFiles() // 清空文件列表
    },

    open1() {
      this.$alert('----------------------------------1:打开微信----------------------------------' +
                  '----------------------------------2:我 -> 支付---------------------------------' +
                  '----------------------------------3:钱包----------------------------------------' +
                  '----------------------------------4:账单(右上角)-----------------------------' +
                  '----------------------------------5:常见问题(右上角)-----------------------' +
                  '----------------------------------6:下载账单----------------------------------' +
                  '----------------------------------7:用于个人对账 -> 选择账单时间------' +
                  '----------------------------------8:填写邮箱->进入邮箱->下载压缩包' +
                  '---------------9:解压(微信公众号接受密码 使用密码解压)-------------', '微信账单下载步骤', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'success',
            message: `阅读完成`
          })
        }
      })
    },
    open2() {
      this.$alert('----------------------------------1:打开支付宝-------------------------------' +
                  '----------------------------------2:我的 -> 账单------------------------------' +
                  '----------------------------------3:钱包----------------------------------------' +
                  '----------------------------------4:点击右上角...-----------------------------' +
                  '----------------------------------5:开具交易流水证明----------------------' +
                  '----------------------------------6:选择用于个人对账 选择账单时间---' +
                  '----------------------------------7:用于个人对账 -> 选择账单时间' +
                  '-----------------------8:填写邮箱->进入邮箱->附件下载压缩包-------' +
                  '-----------------------9:解压(使用密码解压 密码身份证后6位)--------------', '微信账单下载步骤', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'success',
            message: `阅读完成`
          })
        }
      })
    }
  }
}
</script>
