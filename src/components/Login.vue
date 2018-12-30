<template>
  <!-- Vue 模板中最外层只能拥有一个父元素，向 <template> 中插入第二个同级元素就会报错 -->
  <div class="login">
    <!-- el-form：表单组件 -->
    <!-- model：用来收集表单数据，做数据双向绑定的 -->
    <!-- ref 给 el-form 组件（或 DOM 对象）添加一个引用 -->
    <!-- 可以通过实例的 $refs.xxx 获取到这个 DOM 对象或者组件（可以调用组件内部的方法） -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
      <img src="@/assets/Admin.jpeg" alt="HT">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名~"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- 增加回车登录功能 -->
        <el-input v-model="form.password" placeholder="请输入密码~" type="password" @keyup.enter.native="loginFn"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginFn">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'change' },
          { min: 3, max: 10, message: '用户名长度在 3 ~ 10 个字符！', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'change' },
          { min: 6, max: 25, message: '密码长度在 6 ~ 25 个字符！', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      // 重置表单
      this.$refs.form.resetFields()
    },
    loginFn() {
      // 对整个表单进行校验
      this.$refs.form.validate((valid, obj) => {
        // console.log(valid, obj)
        // if (valid) {
        //   alert('表单校验通过!')
        // } else {
        //   alert('表单校验失败!')
        //   // 阻止默认行为，不会提交
        //   return false
        // }
        if (!valid) return false
        // alert('表单校验通过!')
        // 发送 ajax 请求
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            // 登录成功
            this.$message({
              message: res.data.meta.msg,
              type: 'success',
              duration: 1500
            })

            // 把 token 存储到 localStorage
            localStorage.setItem('token', res.data.data.token)

            // 跳转到首页组件（单页应用程序）
            // 类似于 location.href ，但是不会发生页面跳转
            this.$router.push('/home')
          } else {
            // 登录失败
            this.$message.error(res.data.meta.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
// lang="less"：表示使用 lass 写 css【还支持 sass、stylus】
// VUE 脚手架已经配置过 less、sass、stylus ，只是没有安装依赖包而已，所以需要自行根据需求安装依赖包
.login {
  width: 100%;
  height: 100%;
  background-color: #2D434C;
  /* 触发 BFC ，解决 margin 塌陷问题 */
  overflow: hidden;
  .el-form {
    width: 430px;
    margin: 200px auto;
    padding: 75px 30px 15px;
    background-color: #fff;
    border-radius: 15px;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      top: -70px;
      transform: translateX(-50%);
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 10px solid #fff;
    }
    .el-button:nth-child(2) {
      margin-left: 100px;
    }
    // + 或者 ~ 都可以使用
    // .el-button + .el-button {
    //   margin-left: 80px;
    // }
  }
}
</style>
