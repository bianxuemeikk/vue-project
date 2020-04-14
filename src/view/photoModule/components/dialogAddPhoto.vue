<template>
	<!-- 新增表单 -->
	<el-dialog :title="title" :visible.sync="addFormVisible" :close-on-click-modal="false" :before-close="dialogClose">
		<el-form :model="addForm" ref="addForm" label-width="80px" :rules="addFormRules">
			<el-form-item label="名称" prop="name" class="input-width">
				<el-input v-model="addForm.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="desc" class="input-width">
				<el-input type="textarea" v-model="addForm.desc" ></el-input>				
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="cancelAdd">取消</el-button>
			<el-button type="primary" @click.native="sureAdd" :loading="addLoading">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import { getPhotoData,addPhotos } from '../../../api/api';
	export default {
		props: ['title', 'addFormVisible'],
		data(){
			return{
				//增加
				addForm:{
					name:'',
					desc:'',
					cc:''
				},
				addLoading:false,
				addFormRules: {
				  name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				  ],
				  region: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				  ],
				  date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				  ],
				  date2: [
					{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				  ],
				  type: [
					{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				  ],
				  resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				  ],
				  desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				  ]
				},
			}
		},
		methods:{
			dialogClose(){
				this.$emit('addDialogClose');
			},
			cancelAdd(){
				this.$emit('addDialogClose');
			},
			sureAdd(){
				this.$refs.addForm.validate((valid)=>{
					if(valid){
						this.addLoading = true;
						let para = Object.assign({},this.addForm);
						console.log(para);
						addPhotos(para).then((res)=>{
							this.addLoading = false;
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$emit('addDialogClose');
							/* 添加完成需调用获取接口 */
							this.$emit('getPhotoData');
							this.$refs['addForm'].resetFields();//重置表单
						})
					}
				})
			},
		}
	}
	
</script>

<style >
.input-width{
	width: 50%;
}
</style>
