<template>
  <div class="leftmenu">
    <el-container>
      <el-aside :width="isCollapse?'88px':'200px'" class="menu-side">
        <div
          style="font-size: 36px;
          font-weight: bold;
          color: #1ddc71;
          height:60px;">
          {{!isCollapse?'Awesome':"A"}}
        </div>
        <!--导航菜单-->
        <el-menu
          default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color=""
          text-color=""
          active-text-color=""
          :collapse="isCollapse"
          unique-opened
          router
          @open="handleOpen"
          @close="handleClose">
            <template v-for="(item,index) in activeMenu">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCls"></i>{{$t(item.name)}}</template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{$t(item.children[0].name)}}</el-menu-item>
            </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo isCollapse" v-show="isCollapse" ref="menuCollapsed">
          <li v-for="(item,index) in activeMenu" class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
              </li>
            </template>
          </li>
        </ul>
      </el-aside>
      <el-container>
        <el-header style='line-height:60px;'>
          <el-col :span="1">
            <div class="tools" @click.prevent="collapse">
            <i v-if='!isCollapse' class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
            </div>
          </el-col>
          <el-col :span="23" class="userinfo">
            <el-row type="flex" class="row-bg" justify="end">
            <el-col :span="2"><div class="grid-content bg-purple-light">
              <el-dropdown  @command="changeLangEvent">
              <span class="el-dropdown-link">
                {{$t('m.language')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='zh-CN'>中文</el-dropdown-item>
                <el-dropdown-item command='en-US'>英文</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple">
              <el-dropdown>
              <span class="el-dropdown-link">
                周恺恺
                <div class="" style="width: 40px; height: 40px; display: inline-block;">
                  <img src="/static/images/kaikai.jpg" class="el-image__inner" style="object-fit: fill;border-radius: 20px;margin-top: 4px; ">
                </div>
                <!-- <el-image
                      style="width: 40px;height: 40px;border-radius: 20px;margin-top: 4px;display: inline-block;"
                      src="/src/static/images/kaikai.jpg"
                      fit="fill"></el-image> -->
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>周恺恺</el-dropdown-item>
                <el-dropdown-item divided>{{$t('m.music')}}</el-dropdown-item>
                <el-dropdown-item @click.native='logout'>退出</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </div></el-col>
            <el-col :span="1">
              <div class="grid-content bg-purple">
                <!-- <el-color-picker v-model="color" size="mini"></el-color-picker> -->
                <h-colorchange></h-colorchange>
              </div>
            </el-col>
            </el-row>
          </el-col>
        </el-header>
        <el-main>
          <el-card shadow="always">
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import colorchange from '../components/baseComponents/colorchange.vue'
  export default {
  	components: {
        'h-colorchange': colorchange,
    },
    data() {
      return {
        color: '#409EFF',
        isCollapse: false,
        collapsed:false,
        lang:'zh-CN'
      };
    },
    //组件内路由守卫
    beforeRouteEnter:(to,from,next)=>{
       /* 此时this.color还没有渲染完成，所以next()给出对应的回调函数获得数据*/
      next(vm=>{
        //alert("hello" + vm.color);
      })
    },
    /* beforeRouteLeave:(to,from,next)=>{
        if(confirm("确定离开此页面吗？") == true){
            next();
        }else{
            next(false);
        }
    }, */
    computed: {
      // 计算属性，过滤掉不显示的菜单
      activeMenu: function () {
        var activeMenu = [];
        var routerMenu = this.$router.options.routes;
        for(var i=0;i<routerMenu.length;i++){
          if(!routerMenu[i]['hidden']){
            activeMenu.push(routerMenu[i]);
          }
        }
        console.log(activeMenu);
        return activeMenu;
      }
    },
	//几个生命周期钩子函数
	/* beforeCreate() {
		console.group('beforeCreate');
		console.log('el: ', this.$el);
		console.log('router: ', this.$router);
	},
	created() {
		console.group('created');
		console.log('el: ', this.$el);
		console.log('router: ', this.$router);
	},
	beforeMount() {
		console.group('beforeMount');
		console.log('el: ', this.$el);
		console.log('router: ', this.$router);
	},
	mounted() {
		console.group('mounted');
		console.log('router: ', this.$router);
	}, */
    methods: {
      handleClick(tab, event) {
      console.log(tab, event);
      },
      handleOpen(key, keyPath) {
      console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
      console.log(key, keyPath);
      },
      //折叠导航栏
      collapse:function(){
        this.isCollapse=!this.isCollapse;
      },
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/');
        }).catch(() => {

        });


      },
      //切换语言
      changeLangEvent:function(lang){
        this.lang = lang;
        this.$i18n.locale = this.lang;//关键语句
        this.$cookies.set('dl_language', this.lang);
      }
    }
  };
</script>
<style type="text/css">
  .tools{
    font-size: 22px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
  }
  .el-menu--collapse {
    width: 88px;
    height: 100%;
  }
  /* .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-aside {
    background-color: #20222A;
    color: #333;
    text-align: center;
    overflow: hidden;
    height: auto;
    min-height: 750px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  } */

  body > .el-container {
    margin-bottom: 40px;
  }
  .leftmenu,.el-container{
    height: 100%;
  }
</style>
