<template>
	<section class="main-container">
		<el-row :gutter="20">
		  <el-col :span="8">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>快捷方式</span>
			      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			    </div>
			    <el-col :span="6" v-for="data in quickWay" :key="data.name" class="text item" style="text-align: center;padding: 10px;">
					<div class="iconDiv"> 
						<i :class="data.icon"></i>
					</div>
					<span class="textDiv">{{ data.name }} </span>				
			    </el-col>
			  </el-card>
		  </el-col>
		  <el-col :span="8">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>待办事项</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<el-col :span="12" v-for="data in undoThing" :key="data.title" class="text item" style="padding: 0 10px;">
						<div class="secondDiv">
							<p>{{data.title}}</p>
							<p style="font-size: 20px;color: green;font-weight: bold;margin: 0px;">{{data.count}}</p>
						</div>
					</el-col>
				</el-card>
		  </el-col>
		  <el-col :span="8">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>版本信息</span>
			    </div>
			    <!-- 表格 -->
			    <dl-table
			      :dataSource="tableList" 
			      :columns="listColumns"
				  :height='138'
				  :selectionShow="false"
				  :selectColumns="false"
				  :hasMutiSelect="false"
			      :hasIndex="false"
				  :hasPage="false"
				  :showHeader="true"
			    ></dl-table>
			  </el-card>
		  </el-col>
		</el-row>
		<el-row :gutter="20">
		  <el-col :span="12">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>数据概览</span>
				  </div>
				  <div id="chartLine" style="width:100%; height:400px;"></div>
				</el-card>
		  </el-col>
		  <el-col :span="12">
			<el-row :gutter="20">
			  <el-col :span="24">
					<el-card class="box-card">
					  <div slot="header" class="clearfix">
					    <span>效果报告</span>
					  </div>
					  <div id="chartBar" style="width:100%; height:140px;"></div>
					</el-card>
			  </el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="24">
				  <el-card class="box-card">
				    <div slot="header" class="clearfix">
				      <span>饼图报告</span>
				    </div>
				    <div id="chartPie" style="width:100%; height:140px;"></div>
				  </el-card>
			  </el-col>
			</el-row>
		  </div></el-col>
		</el-row>
		<el-row :gutter="20">
		  <el-col :span="12">
				<el-card class="box-card">
					<el-tabs v-model="activeName" @tab-click="handleClick" style="height: 400px;">
						<el-tab-pane label="用户管理" name="first">
							<el-upload
							  action="https://jsonplaceholder.typicode.com/posts/"
							  list-type="picture-card"
							  multiple
							  :on-preview="handlePictureCardPreview"
							  :on-remove="handleRemove">
							  <i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</el-tab-pane>
						<el-tab-pane label="角色管理" name="second">
							<el-carousel >
							  <el-carousel-item v-for="item in imageUrl" :key="item.index">
								<el-image style="width: 100%; height: 100%" :src="item.src" fit="fill"></el-image>
							  </el-carousel-item>
							</el-carousel>
						</el-tab-pane>
						<el-tab-pane label="配置管理" name="third">角色管理</el-tab-pane>
						<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
					</el-tabs>
				</el-card>
		  </el-col>
		  <el-col :span="12">
			  <el-col :span="24">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
					  <span>作者心语</span>
					</div>
					<span style="text-indent: 12px;">
					安装步骤：<br>
					1、HBuilder创建vue项目 可以选择element-ui开发 资源自动下载完成<br>
					2、src目录--开发目录<br>
					目录结构自定义<br>
					index.html--主html文件<br>
					main.js--主js文件<br>
					App.vue--主vue文件<br>
					routes.js--菜单路由文件 安装路由npm install router <br>
					<!-- 路由匹配到的组件将渲染到App.vue里 --><br>
					Home.vue是菜单文件，用到routes.js里的数据<br>
					view--目录存放开发模块<br>
					components--存放组件<br>
					commons--放公共文件 http.js是axios封装文件<br>
					mock--目录放mock相关 ，mockjs生成随机数据，拦截ajx请求，可以使前端独立于后端开发 npm install mockjs<br>
					axios-mock-adapter axios的模拟调试器<br>
					</span>
				</el-card>
			  </el-col>
		  </el-col>
		</el-row>
	</section>
</template>

<script>
	import DLTable from "../components/baseComponents/DLTable"
	import echarts from 'echarts'
	export default {
		components: {
		    'dl-table':DLTable
		},
		data() {
			return {
				quickWay:[{
						icon:'el-icon-coin',
						name:'按钮',
						'href':''				
					},{
						icon:'el-icon-film',
						name:'表格',
						'href':''				
					},{
						icon:'el-icon-document',
						name:'表单',
						'href':''				
					},{
						icon:'el-icon-headset',
						name:'英语',
						'href':''				
					},{
						icon:'el-icon-coordinate',
						name:'用户',
						'href':''				
					},{
						icon:'el-icon-grape',
						name:'工单',
						'href':''				
					},{
						icon:'el-icon-time',
						name:'进度条',
						'href':''				
					},{
					icon:'el-icon-magic-stick',
					name:'设置',
					'href':''				
				}],
				undoThing:[{
						title:'待审事项',
						count:20
					},{
						title:'待审平台',
						count:20
					},{
						title:'完成平台',
						count:210
					},{
						title:'完成事项',
						count:30
					}
				],
				tableHeight:'',
				tableList:[{
						key:'版本',
						value:'1.1.01'
					},{
						key:'基于框架',
						value:'vue element-ui'
					},{
						key:'主要特色',
						value:'体积小 运行效率高 双向数据绑定 生态丰富,学习成本低'
					},{
						key:'获取渠道',
						value:'',
						index:'herf'
					},				
					
				],
				listColumns:[{
					  prop: "key",
					  label: "属性",
					  tableWidth: "",
					  align: "left",
					},{
					  prop: "value",
					  label: "值",
					  tableWidth: "",
					  align: "left",
					  render: (createElement, params) => {
						//console.log(params);
						if(params.row.index != undefined){
							return createElement('div', [
									createElement('el-button', {
										props: {type: 'primary', size: 'small'},
										on: {
											click: () => {
												console.log(111);
											}
										}
									}, '获取授权'),
									createElement('el-button', {
										props: {type: 'danger', size: 'small'},
										on: {
											click: () => {
												console.log(222);
											}
										}
									}, '立即下载')
							])
						}else{
							return createElement("div", {
										 class: "box"
									}, [
									   createElement("span", {
										 domProps: {
											   innerHTML: params.row.value
										 }
									   })
									 ])
							}
						}				  	
					}
				],
				chartLine:null,
				chartBar:null,
				chartPie:null,
				activeName: 'first',
				imageUrl:[{
					index:0,
					src:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
				},{
					index:1,
					src:'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
				},{
					index:2,
					src:'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
				},{
					index:3,
					src:'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
				},{
					index:4,
					src:'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
				},],
				dialogImageUrl: '',
				dialogVisible: false
			};
		},
		mounted: function () {
		    this.drawCharts()
		},
		updated: function () {
		    this.drawCharts()
		},
		methods:{
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			drawCharts() {
			    this.drawColumnChart()
			    //this.drawBarChart()
			    this.drawLineChart()
			    this.drawPieChart()
			},
			drawColumnChart(){
				this.chartBar = echarts.init(document.getElementById('chartBar'));
				this.chartBar.setOption({
				    title: {
				        text: 'Bar Chart',
				        subtext: '数据来自网络'
				    },
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    legend: {
				        data: ['2011年', '2012年']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    yAxis: {
				        type: 'category',
				        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
				    },
				    series: [
				        {
				            name: '2011年',
				            type: 'bar',
				            data: [18203, 23489, 29034, 104970, 131744, 630230]
				        },
				        {
				            name: '2012年',
				            type: 'bar',
				            data: [19325, 23438, 31000, 121594, 134141, 681807]
				        }
				    ]
				});
			},
			drawLineChart(){
				this.chartLine = echarts.init(document.getElementById('chartLine'));
				this.chartLine.setOption({
				    title: {
				        text: 'Line Chart'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data: ['邮件营销', '联盟广告', '搜索引擎']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
				        {
				            name: '邮件营销',
				            type: 'line',
				            stack: '总量',
				            data: [120, 132, 101, 134, 90, 230, 210]
				        },
				        {
				            name: '联盟广告',
				            type: 'line',
				            stack: '总量',
				            data: [220, 182, 191, 234, 290, 330, 310]
				        },
				        {
				            name: '搜索引擎',
				            type: 'line',
				            stack: '总量',
				            data: [820, 932, 901, 934, 1290, 1330, 1320]
				        }
				    ]
				});
			},
			drawPieChart() {
			    this.chartPie = echarts.init(document.getElementById('chartPie'));
			    this.chartPie.setOption({
			        title: {
			            text: 'Pie Chart',
			            subtext: '纯属虚构',
			            x: 'center'
			        },
			        tooltip: {
			            trigger: 'item',
			            formatter: "{a} <br/>{b} : {c} ({d}%)"
			        },
			        legend: {
			            orient: 'vertical',
			            left: 'left',
			            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
			        },
			        series: [
			            {
			                name: '访问来源',
			                type: 'pie',
			                radius: '55%',
			                center: ['50%', '60%'],
			                data: [
			                    { value: 335, name: '直接访问' },
			                    { value: 310, name: '邮件营销' },
			                    { value: 234, name: '联盟广告' },
			                    { value: 135, name: '视频广告' },
			                    { value: 1548, name: '搜索引擎' }
			                ],
			                itemStyle: {
			                    emphasis: {
			                        shadowBlur: 10,
			                        shadowOffsetX: 0,
			                        shadowColor: 'rgba(0, 0, 0, 0.5)'
			                    }
			                }
			            }
			        ]
			    });
			},
		}
		
	}
</script>

<style>
	.secondDiv{
		width: 100%;
		background-color: #F8F8F8;
		font-size: 14px;
		cursor: pointer;
		text-align: left;
		text-indent: 12px;
		padding: 3px;
		margin-bottom: 10px;
	}
	.textDiv{
		position: relative;
		top: 2px;
		display: block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 14px;
	}
	.iconDiv{
		width: 100%;
		height: 50px;
		background-color: #F8F8F8;
		line-height: 50px;
		font-size: 30px;
		cursor: pointer;
	}
	.iconDiv:hover{
		background-color: #f2f2f2;
	}
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	.grid-content-main {
	    border-radius: 4px;
	    min-height: 106px;
	  }
	.bg-purple-main {
	    background: #d3dce6;
	}
</style>
