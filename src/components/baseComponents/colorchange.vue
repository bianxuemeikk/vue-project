<template>
    <div>
        <el-dropdown class="international" @command="handleSetColor">
            <span class="el-dropdown-link">
              主题<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  :command='skinInfo.name' :key="skinInfo.name" v-for="skinInfo in listSkin">
                    <div class="color-el-item-two">
                        <img :src="skinInfo.url">
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
export default {
    computed: {
        skin () {
            return this.$store.state.skin
        }
    },
    methods: {
        handleSetColor (color) {
            document.getElementsByTagName('body')[0].className = color
            //this.$store.dispatch('setSkin', color)
            /* 同步修改iframe里面的主题颜色 */
            //document.getElementById('external-frame').contentWindow.setSkin(color)
        }
    },
    data () {
        return {
            listSkin: []
        }
    },
    created () {
        const skinStyle = [
          {url: "../static/css/skinOne/img/skinOne.png", name: "skinOne"},
          {url: "../static/css/skinTwo/img/skinTwo.png", name: "skinTwo"}
        ];
        /* 初始化主题信息 */
        this.listSkin = skinStyle
        document.getElementsByTagName('body')[0].className = this.$store.state.skin
    }
}
</script>
<style scoped>
.el-dropdown-menu__item{
    padding:10px
}
.el-dropdown-menu{
    padding:0px
}
.color-el-item{
    border: 1px solid #e6e6e6;
    width:25px;
    height:25px;
}

</style>
