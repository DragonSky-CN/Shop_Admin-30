// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 导入 element-ui
import ElementUI from 'element-ui'
// 导入 element-ui 的样式文件
import 'element-ui/lib/theme-chalk/index.css'

// 导入通用样式文件
import '@/assets/base.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false

// 使用 element-ui
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
