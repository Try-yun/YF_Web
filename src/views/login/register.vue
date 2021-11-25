<template>
  <div class="login-container">
    <el-form ref="RegisterForm" :model="RegisterForm" :rules="RegisterRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">注册</h3>
      <el-form-item prop="nickname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="RegisterForm.nickname" name="nickname" type="text" auto-complete="on" placeholder="用户昵称" />
      </el-form-item>
      <el-form-item prop="mail">
        <span class="svg-container">
          <svg-icon icon-class="youxiang" />
        </span>
        <el-input v-model="RegisterForm.mail" name="mail" type="text" auto-complete="on" placeholder="邮箱(用户名 不修改)" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="RegisterForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item class="code" prop="code" >
        <span class="svg-container">
          <svg-icon icon-class="yanzhengma" />
        </span>
        <el-input
          :type="pwdType"
          v-model="RegisterForm.code"
          name="code"
          auto-complete="on"
          placeholder="请输入验证码" />
        <span><el-button type="primary" @click="getCode">获取验证码</el-button></span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
          注 册
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { getCode, register } from '@/api/register'

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      RegisterForm: {
        nickname: '',
        password: '',
        code: '',
        mail: ''
      },
      RegisterRules: {
        nicknmae: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        code: [{ required: true, trigger: 'blur' }],
        mail: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      // console.log(this.RegisterForm)
      this.$refs.RegisterForm.validate(valid => {
        if (valid) {
          console.log(this.RegisterForm)
          this.loading = true
          register(this.RegisterForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/login' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    async getCode() {
      console.log(this.RegisterForm.mail)
      const res = await getCode(this.RegisterForm.mail)
      if (res.code === 200) {
        this.$message.success(res.message)
      } else {
        this.$message.error(res.message)
      }
    },
    handleLogin() {
      window.location.href = 'http://139.196.107.185:8088/#/login'
      // this.$router.push('http://localhost:8000/#/register')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;

    .code{
      .el-input{
        width: 66%;
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

</style>
