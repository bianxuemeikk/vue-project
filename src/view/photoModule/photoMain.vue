<template>
	<section class="photoMain main">
		<el-card shadow="always">
			<el-tabs type="border-card">
			  <el-tab-pane label="相册">
				<div id="app-2">
				  <span v-bind:title="message">
				    鼠标悬停几秒钟查看此处动态绑定的提示信息！
				  </span>
				</div>
			  </el-tab-pane>
			  <el-tab-pane label="日志">日志</el-tab-pane>
			  <el-tab-pane label="角色管理">个人信息</el-tab-pane>
			</el-tabs>
		</el-card>
	</section>
</template>

<script>
	//import Swiper from 'swiper';
	//import 'swiper/css/swiper.min.css';

	export default{
		components:{
			//'swiper':Swiper
		},
		data(){
			return {
				message:'页面加载于 ' + new Date().toLocaleString()
			}
		},
		mounted(){

		},
		methods:{

		}
	}
</script>

<style>

</style>
