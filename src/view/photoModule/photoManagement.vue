<template>
	<section class="photoTable">
		<el-card shadow="always">
			<!--工具条-->
			<div class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true">
					<el-form-item>
						<el-button type="primary" @click="addNew">新增</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" :disabled="this.sels.length===0">批量删除</el-button>
					</el-form-item>
					<div style="float: right;">
						<el-form-item>
							<el-input v-model="searchContent" placeholder='请输入内容' clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary">查询</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
			<!-- 表格 -->
			<dl-table
			  :dataSource="tableList" 
			  :hasLoading="listLoading"
			  :columns="listColumns" 
			  :hasIndex="false"
			  :total="total"
			  :pageSize='10'
			  @selection-change="selsChange"
			  @currentChange="handleCurrentChange"
			  @handleSizeChange="handleSizeChange"
			></dl-table>
		</el-card>
		<dialog-add-photo title='新增' 
			:addFormVisible='addFormVisible' 
			@addDialogClose="addDialogClose" 
			@getPhotoData="getPhotoData">
		</dialog-add-photo>
		<!-- 打开相册 -->
		<dialog-open-photo :title=photoTitle 
			:openPhotoVisible='openPhotoVisible' 
			@openPhotoDialogClose="openPhotoDialogClose" >
		</dialog-open-photo>		
	</section>
</template>

<script>
	import DLTable from "../../components/baseComponents/DLTable"
	import dialogAddPhoto from "./components/dialogAddPhoto"
	import dialogOpenPhoto from "./components/dialogOpenPhoto"
	import { getPhotoData,addPhotos } from '../../api/api';
	
	export default {
		components:{
			'dl-table':DLTable,
			'dialog-add-photo':dialogAddPhoto,
			'dialog-open-photo':dialogOpenPhoto
		},
		data() {
			return {
				searchContent:'',
				tableList:[],
				listColumns:[
					{
						prop:'photoName',
						label:'相册名称',
						tableWidth: "",
						align: "center",
					},
					{
						prop:'discribe',
						label:'描述',
						tableWidth: "",
						align: "center",
					},
					{
						prop:'prhotoNum',
						label:'照片数量',
						tableWidth: "",
						align: "center",
					},
					{
						prop:'music',
						label:'音乐',
						tableWidth: "",
						align: "center",
					},
					{
						prop: '',
						label: '操作',
						tableWidth: '',
						align: 'center',
						render: (createElement, params) => {
							return createElement('div', [
								createElement('el-button', {
									props: {type: 'primary', size: 'small', plain:true},
									on: {
										click: () => {
											this.btnExit(params.row)
										}
									}
								}, '下载'),
								createElement('el-button', {
									props: {type: 'success', size: 'small', plain:true},
									on: {
										click: () => {
											this.openPhotos(params.row)
										}
									}
								}, '打开'),
								createElement('el-button', {
									props: {type: 'danger', size: 'small', plain:true},
									on: {
										click: () => {
											console.log(params);
											this.btnDelete(params.row.id)
										}
									}
								}, '删除')
							])
						}
					}
				],
				listLoading:true,
				sels:[],
				total:0,
				page:1,
				perPage:10,
				addFormVisible:false,
				//打开相册
				photoTitle:'',
				openPhotoVisible:false,
			}
		},
		mounted() {
			this.getPhotoData();
		},
		methods:{
			addNew(){
				this.addFormVisible = true;
			},
			// 关闭页面
			addDialogClose () {
			    this.addFormVisible = false;
			},
			openPhotoDialogClose(){
				this.openPhotoVisible = false;
			},
			btnDelete(sID){
				console.log(sID);
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: sID };
					console.log(para);
					//removeUser(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getPhotoData();
					//});
				}).catch(() => {
				
				});
			},
			openPhotos(row){
				this.photoTitle = row.photoName;
				this.openPhotoVisible = true;
			},
			getPhotoData(){
				let para = {
					page: this.page,
					perPage:this.perPage,
					name: this.searchContent
				};
				this.listLoading = true;
				getPhotoData(para).then((res)=>{
					console.log(res);
					this.total = res.data.total;
					this.tableList = res.data.photos;
					this.listLoading = false;
				})
			},
			//翻页
			handleCurrentChange(val) {
				console.log('handleCurrentChange:'+val);
				this.page = val;
				this.getPhotoData();
			},
			//每页条数改变
			handleSizeChange(val){
				this.perPage = val;
				this.getPhotoData();
			},
			//选中数量改变
			selsChange: function (sels) {
				this.sels = sels;
			},
		}
	}
</script>

<style>
	
</style>
