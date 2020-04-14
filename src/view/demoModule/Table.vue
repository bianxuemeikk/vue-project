<template>
	<section>
		<!-- <el-card shadow="always"> -->
			<!--工具条-->
			<div class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true">
					<el-form-item>
						<el-button type="primary" @click='openNew'>新增</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" :disabled="this.sels.length===0">批量删除</el-button>
					</el-form-item>
					<div style="float: right;">
						<el-form-item>
							<el-input v-model="input" placeholder='请输入内容' clearable></el-input>
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
			  :height="tableHeight"
			  :selectionShow="false"
			  :selectColumns="false"
			  :total="total"
			  :pageSize='10'
			  @selection-change="selsChange"
			  @currentChange="handleCurrentChange"
			  @handleSizeChange="handleSizeChange"
			>
			</dl-table>
		<!-- </el-card> -->
		
		<!-- 新增表单 -->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth" value-format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cancelAdd">取消</el-button>
				<el-button type="primary" @click.native="sureAdd" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import DLTable from "../../components/baseComponents/DLTable"
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	
	export default {
		components:{
			'dl-table':DLTable //html标签名称：组件名称
		},
		data() {
			return {
				input: '',//搜索输入框
				listLoading: false,//表格动态加载
				total: 0,//表格数据总数
				page: 1,//当前页码
				perPage:10,//每页显示条数				
				sels:[],//选中数据
				tableList:[],//表格数据
				tableHeight:'',//表格高度
				listColumns: [
				        {
				          prop: "name",
				          label: "姓名",
				          tableWidth: "",
						  align: "center",
				        },
						{
							prop: "sex",
							label: "性别",
							tableWidth: "",
							align: "center",
							render: (createElement, params) => {
								//console.log(params);
								return createElement("div", {
										 class: "box"
									}, [
									   createElement("span", {
										 domProps: {
											   innerHTML: params.row.sex == 0 ? '男' : '女' 
										 }
									   })
									 ])
							}
						},
						{
							prop: "age",
							label: "年龄",
							tableWidth: "",
							align: "center",
						},
						{
							prop: "birth",
							label: "生日",
							tableWidth: "",
							align: "center",
						},
						{
							prop: "addr",
							label: "地址",
							tableWidth: "",
							align: "center",
						},
						{
							prop: '',
							label: '操作',
							tableWidth: '150',
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
									}, '编辑'),
									createElement('el-button', {
										props: {type: 'danger', size: 'small', plain:true},
										on: {
											click: () => {
												this.btnDelete([params.row.sId])
											}
										}
									}, '删除')
								])
							}
						}
				],
				//新增界面数据
				addFormVisible:false,//增加diago是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
			};
		},
		mounted() {
			this.getUsers();
		},
		methods:{
			//获得表格数据
			getUsers(){
				let para = {
					page: this.page,
					perPage:this.perPage,
					name: this.put
				};
				this.listLoading = true;
				getUserListPage(para).then((res)=>{
					console.log(res);
					this.total = res.data.total;
					this.tableList = res.data.users;
					this.listLoading = false;
				})
			},
			//新增
			openNew() {
				this.addFormVisible = true;
			},
			//确定
			sureAdd() {
				//this.addFormVisible = false;
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							console.log(para);
							//addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();//重置表单
								this.addFormVisible = false;
								//this.getUsers();
							//});
						});
					}
				});
			},
			//取消
			cancelAdd() {
				this.addFormVisible = false;
			},
			// 编辑
			btnExit (row) {
			    /* this.editItem = row
			    this.title = '编辑'
			    this.isAddData = false
			    this.dialogEventVisible = true
			    this.sIdDisabled = true */
			},
			// 删除接口
			btnDelete (sId) {
			    this.$confirm('确认删除该记录吗?', '提示', {
			    	type: 'warning'
			    }).then(() => {
			    	this.listLoading = true;
			    	//NProgress.start();
			    	let para = { id: row.id };
			    	removeUser(para).then((res) => {
			    		this.listLoading = false;
			    		//NProgress.done();
			    		this.$message({
			    			message: '删除成功',
			    			type: 'success'
			    		});
			    		this.getUsers();
			    	});
			    }).catch(() => {
			    
			    });
			},
			//翻页
			handleCurrentChange(val) {
				console.log('handleCurrentChange:'+val);
				this.page = val;
				this.getUsers();
			},
			//每页条数改变
			handleSizeChange(val){
				this.perPage = val;
				this.getUsers();
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
