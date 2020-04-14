<template>
	<section>
		<el-col>
			<h3>
				<slot name="title">我在学习VUE</slot>
			</h3>
			<p :class="{active:isActive}" :title="txt1">
				<slot name="txt" say="你好">{{txt1}}</slot>
			</p>
			<p>这个地方用的插槽 <slot name="content">默认显示小猫咪</slot></p>
		</el-col>
	</section>
</template>

<script>
	export default{
		data(){
			return {
				txt1:"我爱VUE 啦啦啦",
				disabled:'eeef',
				isActive:true
			}
		}
	}
</script>

<style>
	.active{
		color: green;
	}
</style>
