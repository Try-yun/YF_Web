<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="用户昵称">
        <el-input v-model="user.nickname" style="width: 200px" />
      </el-form-item>
      <!-- 头像 -->
      <el-form-item label="用户头像">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :headers="myHeaders"
          action="http://139.196.107.185:8888/gfs/user/avatarImport"
          class="avatar-uploader">
          <img v-if="user.avatar" :src="user.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">修改密码</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogFormVisible" title="用户修改密码">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="新密码">
          <el-input v-model="form.password" placeholder="请输入密码" style="width: 200px"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="验证码">
          <el-input v-model="form.code" placeholder="请输入验证码" style="width: 200px"/>
          <el-button type="primary" @click="getCode">获取验证码</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpdatePass()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth' // 验
import { getInfo } from '@/api/login'
import { updateUserInfo, updateUserPass } from '@/api/login'
import { getAuthCode } from '@/api/register'

export default {

  data() {
    return {
      // 用户对象
      user: {
        avatar: '',
        nickname: ''
      },
      saveBtnDisabled: false, // 默认按钮可用
      myHeaders: { token: getToken() },
      dialogFormVisible: false,
      form: {
        password: '',
        code: ''
      },
      formLabelWidth: '120px'
    }
  },

  created() {
    this.getUserInfo()
  },

  methods: {

    getUserInfo() {
      getInfo().then(response => {
        this.user = response.data.userInfo
      })
    },

    saveOrUpdate() {
      updateUserInfo(this.user).then(response => {
        // 弹出成功提示
        this.$message({
          type: 'success',
          message: '修改成功!重新登录后更新用户信息。'
        })
        this.saveBtnDisabled = true
      })
    },

    // 文件上传成功
    handleAvatarSuccess(response) {
      console.log(response.data.url)
      if (response.success) {
        this.user.avatar = response.data.url
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败! （非200）')
      }
    },

    // 文件上传失败（http）
    handleAvatarError() {
      this.$message.error('上传失败! （http失败）')
    },

    // 文件上传前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' // MIME
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async getCode() {
      const res = await getAuthCode()
      if (res.code === 200) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
    },
    // 修改密码
    UpdatePass() {
      this.dialogFormVisible = false
      updateUserPass(this.form).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.form = {}
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
