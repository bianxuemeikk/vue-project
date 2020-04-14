import http from './commons/http.js'
import Vue from 'vue'
/* import VueRouter from 'vue-router' */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/routes.js'//引入路由js文件
import App from './App.vue'
import Mock from './mock/mock'
import VueI18n from 'vue-i18n' //多语言
import store from './store/store'//vuex
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import '../static/css/skinOne/css/skinOne.css'
import '../static/css/skinTwo/css/skinTwo.css'

Vue.use(VueI18n) // 通过插件的形式挂载

Vue.config.productionTip = false//阻止启动生产消息

const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('./commons/language/zh'),   // 中文语言包
      'en-US': require('./commons/language/en')    // 英文语言包
    }
})

Mock.bootstrap();

//Vue.use(VueRouter)
Vue.use(ElementUI)
/* const router = new VueRouter({
  routes
}) */
/**
 * 重写路由的push方法，防止重复点击菜单报错
 */
/* const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
} */

console.log('main.js')
console.log(http);

new Vue({
  el: '#app',
  i18n,  // 多语言
  router,
  store,  //store:store 和router一样，将我们创建的Vuex实例挂载到这个vue实例中
  //components: { App }  vue1.0的写法
  render: h => h(App)    //vue2.0的写法
})
