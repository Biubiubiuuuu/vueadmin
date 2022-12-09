import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang'
import Clipboard from 'clipboard'
import VueDND from 'awe-dnd'

import '@/styles/index.scss' // global css
import './assets/icon/iconfont.css' // 引入阿里巴巴图标库
import './assets/icon/iconfont.js' // 引入阿里巴巴图标库

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
Vue.use(VueDND)

Vue.config.productionTip = false
Vue.prototype.Clipboard = Clipboard

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
