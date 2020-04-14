<template>
	<section class="engLearn">
		<el-row>
		  <el-col :span="8">
			<el-card shadow="always">
				<el-card :body-style="{ padding: '0px' }">
				  <img :src="picSrc" class="image">
				  <div style="padding: 14px;">
					<span class="word-style">{{chName}}</span>
					<div class="bottom clearfix">
					  <!-- <time class="time">{{ currentDate }}</time> -->
					  <span class="word-style">{{enName}}</span>
					  <i class="el-icon-phone-outline playSound" title="播放"></i>
					  <el-button type="text" class="button">下一条</el-button>
					</div>
				  </div>
				</el-card>
			</el-card>
		</el-col>
		</el-row>
	</section>
</template>

<script>
	import http from '../../commons/http.js'
	export default {
		components:{
			
		},
		data() {
			return {
				picUrl:'http://zhouyunxu.f3322.net:17017/engLearn/media/',
				picSrc:'',
				chName:'',
				enName:'',
			}
		},
		mounted() {
			this._initEnglishData();
		},
		methods:{
			_initEnglishData (){
				console.log('_initEnglishData');
				http.post('http://zhouyunxu.f3322.net:17017/api/getenglish' ,{"form":{"danci":"zyx"}}).then((res)=>{
					console.log(res);
					//http://zhouyunxu.f3322.net:17017/engLearn/media/img/eng/3.banana.png
					if(res.state == 'success'){
						let content = JSON.parse(res.content)[0];//将json字符串转换成json对象
						this.picSrc = this.picUrl+content.fields.picpath;
						this.chName = content.fields.chi;
						this.enName = content.fields.danci;
					}
				})
			}
		}
	}
</script>

<style>
	.playSound{
		font-size: 30px;
		margin-left: 10px;
		cursor: pointer;
	}
	  .word-style {
	    font-size: 23px;
	    /* color: #999; */
	  }
	  
	  .bottom {
	    margin-top: 13px;
	    line-height: 12px;
	  }
	
	  .button {
	    padding: 0;
	    float: right;
	  }
	
	  .image {
	    width: 100%; 
	    display: block;
	  }
	
	  .clearfix:before,
	  .clearfix:after {
	      display: table;
	      content: "";
	  }
	  
	  .clearfix:after {
	      clear: both
	  }
</style>
