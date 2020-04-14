<template>
	<el-dialog :title="photoTitle" :visible.sync="openPhotoVisible" :before-close="dialogClose" :close-on-click-modal="false">
		<el-row style="margin-bottom: 20px;">
			<el-upload
			  class="upload-music"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :on-preview="handlePreview1"
			  :on-remove="handleRemove1"
			  :before-remove="beforeRemove1"
			  :limit="1"
			  :on-exceed="handleExceed1"
			  :file-list="fileList1"				  
	          :before-upload="beforeUpload"
			  accept=".mp3">
			  <el-button size="small" type="primary">上传音乐</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传mp3文件，且不超过500kb</div>
			</el-upload>
		</el-row>
		<el-row>
			<el-upload
			  class="upload-pic"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  list-type="picture-card"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :before-remove="beforeRemove"
			  multiple
			  :limit="800"
			  :on-exceed="handleExceed"
			  :file-list="fileList">
			  <el-button size="small" type="primary">上传照片</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</el-row>
	</el-dialog>
</template>

<script>
	export default {
		props:['photoTitle','openPhotoVisible'],
		data(){
			return{
				fileList:[],
				dialogImageUrl: '',
				dialogVisible: false,
				//上传相册
				fileList1:[],
			}
		},
		methods:{
			dialogClose(){
				this.$emit('openPhotoDialogClose');
			},
			//上传照片
			handlePreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			beforeRemove(file, fileList) {
			    return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handleExceed(files, fileList) {
			  this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			//上传相册
			beforeUpload(file) {
				console.log(file)
				var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
				const extension = testmsg === 'mp3'
				const extension2 = testmsg === 'xlsx'
				// const isLt2M = file.size / 1024 / 1024 < 10
				if(!extension && !extension2) {
					this.$message({
						message: '上传文件只能是 xls、xlsx格式!',
						type: 'warning'
					});
				}
				// if(!isLt2M) {
				//     this.$message({
				//         message: '上传文件大小不能超过 10MB!',
				//         type: 'warning'
				//     });
				// }
				// return (extension || extension2) && isLt2M
				return extension || extension2
			},
			handleRemove1(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview1(file) {
				console.log(file);
			},
			handleExceed1(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove1(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
		}
	}
</script>

<style>
</style>
