<template>
	<section class="base-container">
		<!-- <el-card> -->
			<el-tabs type="border-card" v-model="activeName">
			  <!-- <el-tab-pane label="表格/按钮/输入框">表格/按钮/输入框</el-tab-pane> -->
			  <el-tab-pane label="选择器/复选框/计数器/switch/穿梭框/上传" name="first">								  
				  <el-col>
					<el-col>
					  单选可清空可查询
					</el-col>
					<el-select 
						v-model="value" clearable filterable placeholder="请选择">
					  <el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
						:disabled="item.disabled">
					  </el-option>
					</el-select>
				  </el-col>
				  
				  <el-col>
					  <el-col>
					  多选可查询
					  </el-col>
					   <el-select v-model="value1" multiple filterable placeholder="请选择">
					     <el-option
					       v-for="item in options"
					       :key="item.value"
					       :label="item.label"
					       :value="item.value">
					     </el-option>
					   </el-select> 
				  </el-col>
				  
				  <el-col>
					  <el-col>多选框</el-col>
					  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
					    <div style="margin: 15px 0;"></div>
					    <el-checkbox-group v-model="checkedCities" :min="1" :max="2" @change="handleCheckedCitiesChange">
					      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
					    </el-checkbox-group>
				  </el-col>
				  
				  <el-col>
					  <el-col>计数器</el-col>
					  <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
						<el-input-number v-model="num1" :precision="2" :step="0.1" :max="10"></el-input-number>
						<el-input-number v-model="num2" :step="2" step-strictly></el-input-number>
						<el-input-number v-model="num3" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
					<el-button @click="getAllValue">获取所有值</el-button>
				  </el-col>
				  
				  <el-col>
				  		<el-col>开关</el-col>
						<el-switch
						  v-model="switchValue1"
						  active-color="#13ce66"
						  inactive-color="#ff4949"
						  @change='changeSwitch'>
						</el-switch>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<el-switch
						  v-model="switchValue2"
						  active-text="按月付费"
						  inactive-text="按年付费">
						</el-switch>
				  </el-col>
				  
				  <el-col>
				  		<el-col>穿梭框</el-col>
						<el-transfer
						    filterable
						    :filter-method="filterMethod"
						    filter-placeholder="请输入城市拼音"
						    v-model="transferValue"
						    :data="data">
						  </el-transfer>
				  </el-col>
				  
			  </el-tab-pane>
			  <el-tab-pane label="文字提示/对话框" name="second">
				  <el-col>
					  <el-col>tooltip</el-col>
					   <div class="box">
					     <div class="top">
					       <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
					         <el-button>上左</el-button>
					       </el-tooltip>
					       <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
					         <el-button>上边</el-button>
					       </el-tooltip>
					       <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
					         <el-button>上右</el-button>
					       </el-tooltip>
					     </div>
					     <div class="left">
					       <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
					         <el-button>左上</el-button>
					       </el-tooltip>
					       <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
					         <el-button>左边</el-button>
					       </el-tooltip>
					       <el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
					         <el-button>左下</el-button>
					       </el-tooltip>
					     </div>
					   
					     <div class="right">
					       <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
					         <el-button>右上</el-button>
					       </el-tooltip>
					       <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
					         <el-button>右边</el-button>
					       </el-tooltip>
					       <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
					         <el-button>右下</el-button>
					       </el-tooltip>
					     </div>
					     <div class="bottom">
					       <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
					         <el-button>下左</el-button>
					       </el-tooltip>
					       <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
					         <el-button>下边</el-button>
					       </el-tooltip>
					       <el-tooltip class="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
					         <el-button>下右</el-button>
					       </el-tooltip>
					     </div>
					   </div>
				  </el-col>
				  <el-col>
				  	  <el-col>对话框</el-col>
					   <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>
					    
					    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
					      <el-dialog
					        width="30%"
					        title="内层 Dialog"
					        :visible.sync="innerVisible"
					        append-to-body>
							<el-dialog
							  width="30%"
							  title="内层吧吧吧吧吧v Dialog"
							  :visible.sync="innerInnerVisible"
							  append-to-body>
							</el-dialog>
							<div slot="footer" class="dialog-footer">
							  <el-button @click="innerVisible = false">取 消</el-button>
							  <el-button type="primary" @click="innerInnerVisible = true">打开内层 Dialog</el-button>
							</div>
					      </el-dialog>
					      <div slot="footer" class="dialog-footer">
					        <el-button @click="outerVisible = false">取 消</el-button>
					        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
					      </div>
					    </el-dialog>
				  </el-col>
			  </el-tab-pane>
			  <el-tab-pane label="树形表格" name="third">
				  <!-- 树形表格 -->
				  <!--
				      childrenName:数据源子数组名称
				      hasTreeTable：是否为树形组件
				      expandAll:是否全部展开
				   -->
				   <dl-table :dataSource="tableData"  childrenName="children" :columns="columns" :hasTreeTable="hasTreeTable"
				              :hasIndex="hasIndex" :hasMutiSelect="hasMutiSelect" :hasPage="hasPage"></dl-table>
			  </el-tab-pane>
			  <el-tab-pane label="级联选择器/时间选择器" name="fourth">
				  <el-col>级联选择器</el-col>
				  <el-col>
					<!-- <span class="demonstration">默认 click 触发子菜单</span>
					<el-cascader
					  v-model="value"
					  :options="options"
					  @change="handleChangeCascader">
					</el-cascader> -->
				  </el-col>
				  <el-col>时间选择器</el-col>
				  <el-col>
					  <el-time-select
					    v-model="timeValue"
					    :picker-options="{
					      start: '08:30',
					      step: '00:15',
					      end: '18:30'
					    }"
					    placeholder="选择时间">
					  </el-time-select>
					  <el-time-picker
					      v-model="timeValue1"
					      :picker-options="{
					        selectableRange: '18:30:00 - 20:30:00'
					      }"
					      placeholder="任意时间点">
					    </el-time-picker>
						<el-time-picker
						    is-range
						    v-model="timeValue2"
						    range-separator="至"
						    start-placeholder="开始时间"
						    end-placeholder="结束时间"
						    placeholder="选择时间范围">
						</el-time-picker>
						  <el-col>
						    <span class="demonstration">默认</span>
						    <el-date-picker
						      v-model="timeValue3"
						      type="datetime"
						      placeholder="选择日期时间">
						    </el-date-picker>
						  </el-col>
						  <el-col>
						    <span class="demonstration">带快捷选项</span>
						    <el-date-picker
						      v-model="timeValue4"
						      type="datetime"
						      placeholder="选择日期时间"
						      align="right"
						      :picker-options="pickerOptions">
						    </el-date-picker>
						  </el-col>
						  <el-col>
						    <span class="demonstration">设置默认时间</span>
						    <el-date-picker
						      v-model="timeValue5"
						      type="datetime"
						      placeholder="选择日期时间"
						      default-time="12:00:00">
						    </el-date-picker>
						  </el-col>
						  <el-col>
							  <span class="demonstration">带快捷选项</span>
							  <el-date-picker
								v-model="timeValue6"
								type="datetimerange"
								:picker-options="pickerOptionsRange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								align="right">
							  </el-date-picker>
						  </el-col>
				  </el-col>
			  </el-tab-pane>
			  <el-tab-pane label="区域树展示" name="fifth">
				<el-row :gutter="20">
					<el-col :span="4" >
						<el-card shadow="always" body-style="height: 500px;">
							<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
						</el-card>
					</el-col>
					<el-col :span="20" >
						<el-card shadow="always" body-style="height: 500px;">
							<dl-table :dataSource="tableData"  childrenName="children" :columns="columns" :hasTreeTable="hasTreeTable"
							           :hasIndex="hasIndex" :hasMutiSelect="hasMutiSelect" :hasPage="hasPage"></dl-table>
						</el-card>
					</el-col>
				</el-row>
			  </el-tab-pane>
			  <el-tab-pane label="插槽" name="sixth">
				  <el-col>自定义组件中使用插槽</el-col>
				  <el-col style="border: 1px solid #000000;padding: 10px;">
					  <span style="color: red;">1、插槽没有name属性，因此叫【匿名插槽】</span>
					  <br><span style="color: red;">2、具名插槽 有name属性</span>
					  <br><span style="color: red;">3、作用域插槽:说白了就是我在组件上的属性，可以在组件元素内使用</span>
					  <el-col>
						  <slot-test>
							  <template slot="title">新的标题</template>
							  <!-- 作用域插槽:说白了就是我在组件上的属性，可以在组件元素内使用-->
							  <template slot="txt" slot-scope="scope">{{scope.say}}</template>
							  <template slot="content">老虎</template>
						  </slot-test>
						  <slot-test></slot-test>
					  </el-col>
				  </el-col>
				  <el-col>
					  Vue的版本官方一直在更新变化，其中上面使用的 slot="xx" 以及后面会提及的 scope-slot="xx" 在2.6.0+ 中已弃用
					  所以我们要使用新的v-slot
				  </el-col>
			  </el-tab-pane>
			  <el-tab-pane label="var let const区别" name="seventh">
				  <el-col>
					  <el-col style="color: red;position: absolute;left: 500px;top: 200px;">
					  1、var定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。<br>
					  2、let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。<br>
					  3、const用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。<br>
					  </el-col>

					  var let const区别验证
					  <el-button type="primary" @click="printInfo">点击打印</el-button>
					  <pre>
						  <code>
				  // 块作用域
				  {
				  	 var a = 1;
				  	 let b = 2;
				  	 const c = 3;
				  	 // c = 4; // 报错
				  	 var aa;
				  	 let bb;
				  	 // const cc; // 报错
				  	 console.log(a); // 1
				  	 console.log(b); // 2
				  	 console.log(c); // 3
				  	 console.log(aa); // undefined
				  	 console.log(bb); // undefined
				  }
				  	console.log(a); // 1
				  	// console.log(b); // 报错
				  	// console.log(c); // 报错
				  			
				  // 函数作用域
				  (function A() {
				  	var d = 5;
				  	let e = 6;
				  	const f = 7;
				  	console.log(d); // 5
				  	console.log(e); // 6  
				  	console.log(f); // 7 
				  
				  })();
				  	// console.log(d); // 报错
				  	// console.log(e); // 报错
				  	// console.log(f); // 报错
						  </code>
					  </pre>
				  </el-col>
			  </el-tab-pane>
			</el-tabs>
		<!-- </el-card>	 -->	  
	</section>
</template>

<script>	
    import DLTable from "../../components/baseComponents/DLTable"
	import SlotTest from "./slotTest"
	export default{
		components:{
			'dl-table':DLTable,
			'slot-test':SlotTest
		},
		data(){
			const cityOptions = ['上海', '北京', '广州', '深圳'];
			const generateData = _ => {
			        const data = [];
			        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
			        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
			        cities.forEach((city, index) => {
			          data.push({
			            label: city,
			            key: index,
			            pinyin: pinyin[index]
			          });
			        });
			        return data;
			      };
			return {
					activeName:'fifth',
					options: [{
				          value: '选项1',
				          label: '黄金糕'
				        }, {
				          value: '选项2',
				          label: '双皮奶'
				        }, {
				          value: '选项3',
				          label: '蚵仔煎'
				        }, {
				          value: '选项4',
				          label: '龙须面',
						  disabled:true
				        }, {
				          value: '选项5',
				          label: '北京烤鸭'
				        }],
				    value: '',
					value1:[],
					//多选框
					checkAll: false,
					checkedCities: ['上海', '北京'],
					cities: cityOptions,
					isIndeterminate: true,
					//计数器
					num:1,
					num1:1,
					num2:2,
					num3:1,
					//开关
					switchValue1:true,
					switchValue2:true,
					//穿梭框
					data: generateData(),
					transferValue: [],
					filterMethod(query, item) {
						//console.log(query);
						//console.log(item.pinyin);
					  return item.pinyin.indexOf(query) > -1;
					},
					//对话框
					outerVisible: false,
					innerVisible: false,
					innerInnerVisible:false,
					//树形表格
					hasTreeTable: true,
					hasIndex: true,
					hasMutiSelect: false,
					hasPage: false,
					columns: [
					    {
					        text: '菜单名称',
					        prop: 'event',
					        width: 200
					    },
					    {
					        text: '路径',
					        prop: 'id'
					    },
					    {
					        text: '排序',
					        prop: 'timeLine'
					    },
					    {
					        text: '描述',
					        prop: 'comment'
					    },
					    {
					        text: '操作',
					        value: '',
					        render: (createElement, params) => {
					            return createElement('div', [
					                createElement('el-button', {
					                    props: {type: 'text', size: 'small'},
					                    on: {
					                        click: () => {
					                            this.btnExit(params.row)
					                        }
					                    }
					                }, '编辑'),
					                createElement('el-button', {
					                    props: {type: 'text', size: 'small'},
					                    on: {
					                        click: () => {
					                            this.delete(params.row.sId)
					                        }
					                    }
					                }, '删除')
					            ])
					        }
					    }
					],
					tableData: [
					    {
					        id: '1',
					        event: '系统管理',
					        timeLine: 1,
					        comment: '系统管理',
					        children: [
					            {
					                id: '1-1',
					                event: '组织管理',
					                timeLine: 1,
					                comment: '组织管理',
									children: [
									    {
									        id: '1-1-1',
									        event: '组织管理1-1-1',
									        timeLine: 1,
									        comment: '组织管理'
									    },
									    {
									        id: '1-1-2',
									        event: '权限管理1-1-2',
									        timeLine: 2,
									        comment: '权限管理'
									    }
									]
					            },
					            {
					                id: '1-2',
					                event: '权限管理',
					                timeLine: 2,
					                comment: '权限管理'
					            }
					        ]
					    },
					    {
					        id: '2',
					        event: '设备管理',
					        timeLine: 2,
					        comment: '无',
					        children: [
					            {
					                id: '2-1',
					                event: '编码设备',
					                timeLine: 1,
					                comment: '编码设备'
					            },
					            {
					                id: '2-2',
					                event: '服务器设备',
					                timeLine: 2,
					                comment: '服务器设备'
					            }
					        ]
					    }
					],
					//时间选择器
					timeValue:'',
					timeValue1:'',
					timeValue2:'',
					timeValue3:'',
					timeValue4:'',
					timeValue5:'',
					timeValue6:'',
					pickerOptions: {
					  shortcuts: [{
						text: '今天',
						onClick(picker) {
						  picker.$emit('pick', new Date());
						}
					  }, {
						text: '昨天',
						onClick(picker) {
						  const date = new Date();
						  date.setTime(date.getTime() - 3600 * 1000 * 24);
						  picker.$emit('pick', date);
						}
					  }, {
						text: '一周前',
						onClick(picker) {
						  const date = new Date();
						  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
						  picker.$emit('pick', date);
						}
					  }]
					},
					pickerOptionsRange: {
					  shortcuts: [{
						text: '最近一周',
						onClick(picker) {
						  const end = new Date();
						  const start = new Date();
						  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						  picker.$emit('pick', [start, end]);
						}
					  }, {
						text: '最近一个月',
						onClick(picker) {
						  const end = new Date();
						  const start = new Date();
						  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						  picker.$emit('pick', [start, end]);
						}
					  }, {
						text: '最近三个月',
						onClick(picker) {
						  const end = new Date();
						  const start = new Date();
						  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						  picker.$emit('pick', [start, end]);
						}
					  }, {
						text: '最近一年',
						onClick(picker) {
						  const end = new Date();
						  const start = new Date();
						  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
						  picker.$emit('pick', [start, end]);
						}
					  }]
					},
					//树形数据
					treeData: [{
					  label: '一级 1',
					  children: [{
						label: '二级 1-1',
						children: [{
						  label: '三级 1-1-1'
						}]
					  }]
					}, {
					  label: '一级 2',
					  children: [{
						label: '二级 2-1',
						children: [{
						  label: '三级 2-1-1'
						}]
					  }, {
						label: '二级 2-2',
						children: [{
						  label: '三级 2-2-1'
						}]
					  }]
					}, {
					  label: '一级 3',
					  children: [{
						label: '二级 3-1',
						children: [{
						  label: '三级 3-1-1'
						}]
					  }, {
						label: '二级 3-2',
						children: [{
						  label: '三级 3-2-1'
						}]
					  }]
					}],
					defaultProps: {
					  children: 'children',
					  label: 'label'
					}
			}
		},
		methods:{
			handleNodeClick(data) {
				console.log(data);
			},
			printInfo(){
				 // 块作用域
				    {
				        var a = 1;
				        let b = 2;
				        const c = 3;
				        // c = 4; // 报错
				        var aa;
				        let bb;
				        // const cc; // 报错
				        console.log(a); // 1
				        console.log(b); // 2
				        console.log(c); // 3
				        console.log(aa); // undefined
				        console.log(bb); // undefined
				    }
				    console.log(a); // 1
				    // console.log(b); // 报错
				    // console.log(c); // 报错
					
					 // 函数作用域
					    (function A() {
					        var d = 5;
					        let e = 6;
					        const f = 7;
					        console.log(d); // 5
					        console.log(e); // 6  
					        console.log(f); // 7 
					 
					    })();
					    // console.log(d); // 报错
					    // console.log(e); // 报错
					    // console.log(f); // 报错
			},
			handleCheckAllChange(val) {
				this.checkedCities = val ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			handleChange(value) {
			    console.log(value);
			},
			getAllValue(){
				this.$message({
				  showClose: true,
				  message: this.num+' '+this.num1+' '+this.num2+' '+this.num3,
				  type: 'success'
				});
			},
			changeSwitch(value){
				console.log(this.switchValue1);
			},
		}
	}
</script>

<style scoped="">
	.demonstration{
		width: 110px;
		display: inline-block;
		margin-top: 16px;
	}
	.el-col {
	    margin-bottom: 10px;
	     &:last-child {
	      margin-bottom: 0;
	    } 
	  }
	.box {
	    width: 400px;
	
	    .top {
	      text-align: center;
	    }
	
	    .left {
	      float: left;
	      width: 60px;
	    }
	
	    .right {
	      float: right;
	      width: 60px;
	    }
	
	    .bottom {
	      clear: both;
	      text-align: center;
	    }
	
	    .item {
	      margin: 4px;
	    }
	
	    .left .el-tooltip__popper,
	    .right .el-tooltip__popper {
	      padding: 8px 10px;
	    }
	  }
</style>
