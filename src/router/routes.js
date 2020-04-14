import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/Login.vue'
import Home from '../view/Home.vue'
import Main from '../view/Main.vue'
import Table from '../view/demoModule/Table.vue'
import Form from '../view/demoModule/Form.vue'
import Button from '../view/demoModule/Button.vue'
import Tree from '../view/demoModule/Tree.vue'
import VuexDemo from '../view/demoModule/VuexDemo.vue'
import EngLearn from '../view/learnModule/EngLearn.vue'
import PhotoManagement from '../view/photoModule/photoManagement'
import PhotoMain from '../view/photoModule/PhotoMain'

console.log('router.js')
let routes= [
  {
	path: '/',
	component: Login,
	name: '登录',
	hidden: true
  },
  {
    path: '/home',
    name: '主页',
    component: Home,
    iconCls: 'el-icon-house',//图标样式class
    leaf: true,//只有一个节点
    children: [
          { path: '/home', component: Main, name: 'menu.homePage'
          , meta:{
              isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
            },//路由元
          },
    ],
    hidden: false
  },
  {
    path: '/components',
    name: 'menu.component',
    component: Home,
    iconCls: 'el-icon-files',//图标样式class
    children: [
          { path: '/button', component: Button, name: 'Demo' },
          { path: '/table', component: Table, name: 'Table' },
          { path: '/form', component: Form, name: '表单' },
          { path: '/tree', component: Tree, name: '树形结构' },
		  { path: '/vuex', component: VuexDemo, name: 'Vuex' },
    ]
  } ,
  {
    path: '/englearn',
    name: 'menu.english',
    iconCls: 'el-icon-notebook-2',
    component: Home,
    children: [
          { path: '/englearn', component: EngLearn, name: '英语'},
    ]
  },
  {
    path: '/components',
    name: 'menu.photo',
    component: Home,
    iconCls: 'el-icon-picture-outline',//图标样式class
    children: [
		{ path: '/photomain', component: PhotoMain, name: '照片首页' },
        { path: '/photo', component: PhotoManagement, name: '照片管理' },
    ]
  }
];

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',//去掉地址栏#符号
  routes
})
// 路由守卫:全局守卫
/* ***
to 表示将要跳转到的组件 (目标组件)
console.log(from); //(源组件)
next();
next 是一个函数
next() 进入下一个组件的钩子函数
next(false) 阻止跳转 中断导航
next("/login") 进入指定的组件的钩子函数
*** */

router.beforeEach((to,from,next)=>{
  if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
      if (sessionStorage['user']) {
          next();
      }else{
          next({
              path:"/",
              query:{
                  redirect:to.fullPath
              }
          });
      }

  }else{
      next()
  }
});
router.afterEach((to,from)=>{
  console.log(to.path);
})
/**
 * 重写路由的push方法，防止重复点击菜单报错
 */
/* const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
} */
export default router;
