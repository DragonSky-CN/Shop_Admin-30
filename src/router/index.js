import Vue from 'vue'
import Router from 'vue-router'
// @表示 src 目录的绝对路径
import Home from '@/components/Home'
import Login from '@/components/Login'

// import axios from 'axios'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

// 给 router 对象注册导航守卫
// to：跳转到哪个组件
// from：从哪个组件跳转
// next：是否放行
router.beforeEach((to, from, next) => {
  // console.log('导航守卫拦截！')
  // 前往登陆页，直接放行
  if (to.path === '/login' || to.path === '/') {
    next()
    return
  }
  // 前往非登录页，检查 localStorage 是否有 token
  let token = localStorage.getItem('token')
  if (token) {
    next()
    // 【思考】：可能会有人去伪造 token ，虽然下面接口所有操作都需要验证 token ，但是也不想返回一个页面。
    // 可以发送 ajax 请求验证 token 的合法性，如果合法，正常跳转，反之，跳转到错误页面。
    /* axios({
      method: 'post',
      url: 'http://localhost:8888/api/xxx',
      data: token
    }).then(res => {
      console.log(token)
      if (res.data.token.status === true) {
        next()
      } else {
        next('/login404')
      }
    }) */
  } else {
    next('/login')
  }
})

export default router
