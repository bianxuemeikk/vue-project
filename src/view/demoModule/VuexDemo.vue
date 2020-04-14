<template>
	<section>
		<el-row>
			<el-col>
				在VueX对象中，其实不止有state,还有用来操作state中数据的方法集，以及当我们需要对state中的数据需要加工的方法集等等成员。<br>			
				成员列表：<br>			
				1、state 存放状态<br>
				2、mutations state成员操作<br>
				<span style="color: red;">mutations是操作state数据的方法的集合，比如对该数据的修改、增加、删除等等。</span><br>
				3、getters 加工state成员给外界<br>
				4、actions 异步操作<br>
				5、modules 模块化状态管理<br>
				
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin-top:20px;">
			<el-col :span="2">{{$store.state.name}}</el-col>
			<el-col :span="10">
								{{fullInfo}}
				<el-button type="primary" @click="changeData">改变vuex数据</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin-top:20px;">
			<el-col :span="2">{{$store.state.count}}</el-col>
			<el-col :span="10">
				<el-button type="primary" @click="changeData1">+</el-button>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	//import {mapGetters,mapActions} from "vuex"
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'
	export default{
		data(){
			return{
				fullInfo:''
			}
		},
		computed: {
			// … 三个点，在框架语言里，就是传对象
			// 使用对象展开运算符将 getters 混入 computed 对象中
		 /* ...mapGetters([
		  'fullInfo'
		  // ...
		]) */
		},
		methods:{
			/* ...mapActions([
			  'add', // 映射 this.add() 为 this.$store.dispatch('add')
			  'edit'
			]), */
			changeData(){
				this.$store.commit('edit',{age:15,sex:'男'});
				//this.edit();
			    this.fullInfo = /* fullInfo// */this.$store.getters.fullInfo
			},
			changeData1(){
				this.$store.commit('add');
				//this.add();
			}
		}
	}
</script>

<style>
</style>
