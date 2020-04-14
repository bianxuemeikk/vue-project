<template>
	<div :id="tableId">
		<!-- <el-card shadow="always"> -->
		<template><!-- ref除了可以获取本页面的dom元素，还可以拿到子组件中的data和去调用子组件中的方法 -->
			<el-row>
				<el-table
					:ref="tablesRef"
					v-loading="hasLoading"
					border
					:data="formatData"
					:header-cell-style="_headerStyle"
					:height="tableHeight"
					:row-style="_showRow"
					:render-header="renderHeader"
					:show-header="showHeader"
					:highlight-current-row="highlightCurrentRow"
					:row-key="rowKey"
					:max-height="maxHeight"
					:empty-text="emptyText"
					:default-expand-all="defaultExpandAll"
					:expand-row-keys="expandRowKeys"
					:show-summary="showSummary"
					:sum-text="sumText"
					:summary-method="summaryMethod"
					:span-method="spanMethod"
					:select-on-indeterminate="selectOnIndeterminate"
					@row-click="_handRowClick"
					@row-dblclick="_handRowDblclick"
					@select="_handleSelect"
					@select-all="_handleSelectAll"
					@selection-change="_handSelectionChange"
					@cell-mouse-enter="_handCellMouseEnter"
					@cell-mouse-leave="_handCellMouseLeave"

					class="tree-table"
					><!-- @cell-click="_handCellClick"
					@cell-dblclick="_handCellDblclick"
					@row-contextmenu="_handRowContextmenu"
					@header-click="_handHeaderClick"
					@header-contextmenu="_handHeaderContextmenu"
					@header-dragend="_handHeaderDragend"
					@expand-change="_handExpandChange"
					@current-change="_handCurrentChange" -->
					<slot></slot>
					<!--region 选择框-->
					<el-table-column v-if="hasMutiSelect" type="selection" width="40"></el-table-column>
					<!-- region 序号 -->
					<!--序号 <strong>:label="$t('common.SERIAL_NUMBER')"</strong>-->
					<el-table-column v-if="hasIndex && !hasTreeTable" align="center" type="index" width="55" label="1"></el-table-column>
					<!--主体部分-->
					<!-- 对于width属性不设置默认均分各列，可对某些进行宽度设置，其余各列均分，支持number $t代表多语言 vue-i18n -->
					<el-table-column
						v-for="(column, index) in columns"
						:prop="column.prop"
						:key="index"
						:label="column.label"
						:align="column.align"
						:width="column.tableWidth">
						<!-- 操作栏相关按钮处理 -->
							<template slot-scope="scope">
								<my-render v-if="column.render" :row="scope.row" :render="column.render"></my-render>
								<span v-else >
									<!-- <span v-for="space in scope.row._level"  v-if="index === 0" :key="space" class="ms-tree-space"/>
									<span v-if="_iconShow(index,scope.row)" class="tree-ctrl" @click="_toggleExpanded(scope.$index)">
									<i v-if="!scope.row._expanded" class="el-icon-plus"/>
									<i v-else class="el-icon-minus"/>
									</span> -->
									{{ scope.row[column.prop] }}
								</span>
							</template>
					</el-table-column>
					<slot name="behind"></slot>
				</el-table>
			</el-row>
			<el-row v-if="hasPage">
				<!--  小型分页 只包含包括翻页功能 适用于空间较小的情况-->
				<el-col align="center" v-if="simplePage">
				    <el-pagination
				    :small="smallPage"
				    layout="prev, pager, next"
				    @current-change="_currentChange"
				    :total="total">
				    </el-pagination>
				</el-col>
				<!-- 正常分页 包括背景 总页数 分页跳转功能 -->
				<el-col align="center" v-else>
				    <el-pagination
				        background
				        :small="smallPage"
				        :current-page="currentPage"
				        @size-change="_handleSizeChange"
				        :page-size="pageSize"
				        @current-change="_currentChange"
				        :page-sizes="pageSizes"
				        layout="total, sizes, prev, pager, next, jumper"
				        :total="total">
				    </el-pagination>
				</el-col>
			</el-row>
		</template>
		<!-- </el-card> -->
	</div>
</template>

<script>
	import MyRender from './MyRender'
	export default {
		/* 引用渲染函数 */
		components: {
			MyRender
		},
		props :{
			/* 是否加载动画 */
			hasLoading: {
			    type: Boolean,
			    default: function () {
			        return false
			    }
			}, 
			/* 是否加载多选框 */
			hasMutiSelect: {
			    type: Boolean,
			    default: function () {
			        return true
			    }
			},
			/* 是否加载序号列 */
			hasIndex: {
			    type: Boolean,
			    default: function () {
			        return true
			    }
			},
			/*  表格高度 */
			height: {
			    type: [Number, String]
			},
			/* 是否加载分页 */
			hasPage: {
			    type: Boolean,
			    default: function () {
			        return true
			    }
			},
			/* 是否使用简单分页（侧重功能） */
			simplePage: {
			    type: Boolean,
			    default: function () {
			        return false
			    }
			},
			/* 是否使用mini分页 （侧重尺寸） */
			smallPage: {
			    type: Boolean,
			    default: function () {
			        return false
			    }
			},
			/* 分页情况 */
			pageSizes: {
			    type: Array,
			    default: function () {
			        return [10, 30, 50, 100, 300, 500]
			    }
			},
			/* 接收列数据信息 包括prop/label/width  */
			/* 对应操作栏信息 采用render渲染函数接受数据，由于版本要求只接收vNode数据 */
			/* render渲染函数使用示例
			        render: (createElement, params) => {
			                return createElement('div', [createElement('el-button', {
			                    props: { type: 'text',size: 'small'},
			                    on: {click: () => {this.exit(params.row);}}
			                    }, '编辑')
			                ])
			            }
			    */
			columns: {
			    type: Array,
			    default: () => []
			},
			/* 表格数据源 表格主题数据 */
			dataSource: {
			    type: [Array, Object],
			    default: function () {
			        return []
			    }
			},
			/*  每页条数 */
			pageSize: {
			    type: Number,
			    default: function () {
			        return 10
			    }
			},
			/* 当前页 */
			currentPage: {
			    type: Number,
			    default: function () {
			        return 1
			    }
			},
			/* 总条数 */
			total: {
			    type: Number,
			    default: function () {
			        return 0
			    }
			},
			/* 是否为树形表格 */
			hasTreeTable: {
			    type: Boolean,
			    default: function () {
			        return false
			    }
			},
			renderHeader:Function,
			/* 数据源子数组名称 */
			childrenName: {
			    type: String,
			    default: function () {
			        return 'children'
			    }
			},
			evalFunc: Function,
			evalArgs: Array,
			expandAll: {
			    type: Boolean,
			    default: false
			},
			/* 是否显示表头 */
			showHeader: {
			    type: Boolean,
			    default: function () {
			        return true
			    }
			},
			/* 是否要高亮当前行 */
			highlightCurrentRow: {
			    type: Boolean,
			    default: function () {
			        return false
			    }
			},
			/* 是否支持行拖拽 */
			hasDraggable: {
			    type: Boolean,
			    default: function () {
			        return false
			    }
			},
			/* 唯一行标示，在进行表格拖拽时必填属性 */
			rowKey: {
			    type: String,
			    default: function () {
			        return 'id'
			    }
			},
			/* 是否开启翻页记忆 */
			hasPageMemory: {
			    type: Boolean,
			    default: function () {
			        return false
			    }
			},
			/* Table 的最大高度 */
			maxHeight: [String, Number],
			/* 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行 默认true */
			selectOnIndeterminate: {
			    type: Boolean,
			    default: true
			},
			/* 合并行或列的计算方法,Function({ row, column, rowIndex, columnIndex })  */
			spanMethod: Function,
			/* 自定义的合计计算方法 Function({ columns, data }) */
			summaryMethod: Function,
			/* 合计行第一列的文本 默认合计 */
			sumText: String,
			/* 是否在表尾显示合计行 false */
			showSummary: Boolean,
			/* 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。 */
			expandRowKeys: Array,
			/* 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效 */
			defaultExpandAll: Boolean,
			/* 空数据时显示的文本内容，也可以通过 slot="empty" 设置 */
			emptyText: String,
			/* 所有权限信息 */
			permissions: {
			    type: Array,
			    default: function () {
			        return []
			    }
			},
			/* 角色信息 */
			roles: {
			    type: Array,
			    default: function () {
			        return []
			    }
			},
			/* 权限之一 */
			oneOfPermissions: {
			    type: Array,
			    default: function () {
			        return []
			    }
			},
			/* 是否满足显示权限 */
			permissionsShow: {
			    type: Boolean,
			    default: function () {
			        return true
			    }
			}
		},
		data () {
			return {
			    tableHeight: 0, // 表格高度
			    tableId: 'tableId',
			    tablesRef: 'tables',
			    expands: [],
			    multipleSelection: [], // 当前页选中的数据
			    multipleSelectionAll: [] // 所有选中的数据包含跨页数据
			}
		},
		mounted () {
			//debugger
			/* 生成表格id随机数 */
			for (var i = 0; i < 5; i++) { this.tableId += Math.floor(Math.random() * 10); this.tablesRef += Math.floor(Math.random() * 10) }
			//this._rowDrop()
			/* 初始化表格高度 */
			/* 初始化表格高度 */
			window.onresize = () => {
			    this._initTableHeight()
			}
			this._initTableHeight()
		},
		computed : {
			formatData: function () {
			    if (this.hasTreeTable) {
					//debugger
			        /* let tmp
			        if (!Array.isArray(this.dataSource)) {
			            tmp = [this.dataSource]
			        } else {
			            tmp = this.dataSource
			        }
			        const func = this.evalFunc || this._treeToArray
			        const args = this.evalArgs
			            ? Array.concat([tmp, this.expandAll], this.evalArgs)
			            : [tmp, this.expandAll]
			        return func.apply(null, args) */
			    }
			    return this.dataSource
			}
		},
		/* 基础方法实现 */
		methods:{
			_initTableHeight () {
			    this.$nextTick(function () {
			        if (this.height === '' || this.height === 0 || this.height === undefined) {
						//debugger
			            var domNode = document.getElementById(this.tableId).parentNode.children
			            var startCalculation = false
			            var bottom = 0
			            for (var i = 0; i < domNode.length; i++) {
			                if (startCalculation) {
			                    bottom += domNode[i].clientHeight + parseInt(window.getComputedStyle(domNode[i], null)['marginTop'].split('px')[0]) + parseInt(window.getComputedStyle(domNode[i], null)['paddingTop'].split('px')[0])
			                }
			                if (domNode[i].id.indexOf('tableId') >= 0) {
			                    startCalculation = true
			                }
			            }
			            /* 默认为页面高度减去表格上方元素的高度和下方元素高度  */
			            this.tableHeight = (window.innerHeight) - (document.getElementById(this.tableId).getBoundingClientRect().top) - bottom - 75
			        } else {
			            this.tableHeight = this.height
			        }
			    })
			},
			_treeToArray (data, expandAll, parent = null, level = null) {
			    var _this = this
			    let tmp = []
			    Array.from(data).forEach(function (record) {
			        if (record._expanded === undefined) {
			            _this.$set(record, '_expanded', expandAll)
			        }
			        let _level = 1
			        if (level !== undefined && level !== null) {
			            _level = level + 1
			        }
			        _this.$set(record, '_level', _level)
			        // 如果有父元素
			        if (parent) {
			            _this.$set(record, 'parent', parent)
			        }
			        tmp.push(record)
			        if (record[_this.childrenName] && record[_this.childrenName].length > 0) {
			            const children = _this._treeToArray(record[_this.childrenName], expandAll, record, _level)
			            tmp = tmp.concat(children)
			        }
			    })
			    return tmp
			},
			/* 行样式 */
			_showRow: function (row) {
			    if (this.hasTreeTable) {
			        const show = row.row.parent
			            ? row.row.parent._expanded && row.row.parent._show
			            : true
			        row.row._show = show
			        return show
			            ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;'
			            : 'display:none;'
			    }
			    return null
			},
			// 切换下级是否展开
			_toggleExpanded: function (trIndex) {
				//debugger
			    const record = this.formatData[trIndex]
			    record._expanded = !record._expanded
			},
			// 图标显示
			_iconShow (index, record) {
				//debugger
			    return index === 0 && record[this.childrenName] && record[this.childrenName].length > 0
			},
			/* 表头样式设置 */
			_headerStyle ({ row, column, rowIndex, columnIndex }) {
			    // 设置表格第一行的格式
			    if (rowIndex === 0) {
			        return 'font-weight:normal;text-align:center;background-color:#f5f7fa;'
			    }
			    return ''
			},
			/* 当前页改变时触发的事件 */
			/* 父组件通过绑定该事件进行参数传递
			如：v-on:currentChange="currentChange1" currentChange对应部件方法部件方法名，currentChange1为父组件对应方法名 */
			_currentChange (val) {
			    this._setSelectRow()
			    this.$emit('currentChange', val)
			},
			/* 每页条数改变时时触发的事件 */
			_handleSizeChange (val) {
			    this._setSelectRow()
			    this.$emit('handleSizeChange', val)
			},
			/* 选择后实时回调父组件，selection所有选择行信息，row最新选中行信息 */
			_handleSelect (selection, row) {
			    this.multipleSelection = selection
			    this._changePageCoreRecordData()
			    this.$emit('handleSelect', selection, row)
			},
			/* 选择后实时回调父组件，selection所有选择行信息 */
			_handleSelectAll (selection) {
			    this.multipleSelection = selection
			    this._changePageCoreRecordData()
			    this.$emit('handleSelectAll', selection)
			},
			/* 当选择项发生变化时会触发该事件 */
			_handSelectionChange (selection) {
			    this.$emit('selection-change', selection)
			},
			/* 当单元格 hover 进入时会触发该事件 */
			_handCellMouseEnter (row, column, cell, event) {
			    this.$emit('cell-mouse-enter', row, column, cell, event)
			},
			/* 当单元格 hover 退出时会触发该事件 */
			_handCellMouseLeave (row, column, cell, event) {
			    this.$emit('cell-mouse-leave', row, column, cell, event)
			},
			/* 当某一行被点击时会触发该事件 */
			_handRowClick (row, event, column) {
			    this.$emit('row-click', row, event, column)
			},
			/* 当某一行被双击时会触发该事件 */
			_handRowDblclick (row, even) {
			    this.$emit('row-dblclick', row, event)
			},
			/* 当某一列的表头被点击时会触发该事件 */
			_handHeaderClick (column, event) {
			    this.$emit('header-click', column, event)
			},
			/* 当某一列的表头被鼠标右键点击时触发该事件 */
			_handHeaderContextmenu (column, event) {
			    this.$emit('header-contextmenu', column, event)
			},
			/* 当表格的当前行发生变化的时候会触发该事件 */
			_handCurrentChange (currentRow, oldCurrentRow) {
			    this.$emit('current-change', currentRow, oldCurrentRow)
			},
			/* 当拖动表头改变了列的宽度的时候会触发该事件 */
			_handHeaderDragend (newWidth, oldWidth, column, event) {
			    this.$emit('header-dragend', newWidth, oldWidth, column, event)
			},
			/* 当用户对某一行展开或者关闭的时候会触发该事件 */
			_handExpandChange (row, expandedRows) {
			    this.$emit('expand-change', row, expandedRows)
			},
			// 行拖拽
			_rowDrop () {
			    if (!this.hasDraggable) {
			        return
			    }
			    const tbody = document.querySelector('.el-table__body-wrapper tbody')
			    const _this = this
			    Sortable.create(tbody, {
			        onEnd ({ newIndex, oldIndex }) {
			            const currRow = _this.dataSource.splice(oldIndex, 1)[0]
			            _this.dataSource.splice(newIndex, 0, currRow)
			        }
			    })
			},
			// 设置选中的方法
			_setSelectRow () {
			    if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0 || !this.hasPageMemory) {
			        return
			    }
			    this.backSelectionList = this.multipleSelectionAll
			    // 标识当前行的唯一键的名称
			    let rowKey = this.rowKey
			    let selectAllIds = []
			    this.multipleSelectionAll.forEach(row => {
			        selectAllIds.push(row[rowKey])
			    })
			    this.$refs[this.tablesRef].clearSelection()
			    for (var i = 0; i < this.formatData.length; i++) {
			        if (selectAllIds.indexOf(this.formatData[i][rowKey]) >= 0) {
			            this.$refs[this.tablesRef].toggleRowSelection(this.formatData[i], true)
			        }
			    }
			},
			// 记忆选择核心方法
			_changePageCoreRecordData () {
				console.log('_changePageCoreRecordData');
			    // 标识当前行的唯一键的名称
			    let rowKey = this.rowKey
			    let that = this
			    // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
			    if (this.multipleSelectionAll.length <= 0) {
			        this.multipleSelectionAll = this.multipleSelection
			        return
			    }
			    // 总选择里面的key集合
			    let selectAllIds = []
			    this.multipleSelectionAll.forEach(row => {
			        if (row[rowKey]) {
			            selectAllIds.push(row[rowKey])
			        }
			    })
			    let selectIds = []
			    // 获取当前页选中的id
			    that.multipleSelection.forEach(row => {
			        selectIds.push(row[rowKey])
			        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
			        if (selectAllIds.indexOf(row[rowKey]) < 0 && row[rowKey]) {
			            that.multipleSelectionAll.push(row)
			        }
			    })
			    let noSelectIds = []
			    // 得到当前页没有选中的id
			    /* that.formatData.forEach(row => {
			        if (selectIds.indexOf(row[rowKey]) < 0) {
			            noSelectIds.push(row[rowKey])
			        }
			    })
			    noSelectIds.forEach(id => {
			        if (selectAllIds.indexOf(id) >= 0) {
			            for (let i = 0; i < that.multipleSelectionAll.length; i++) {
			                if (that.multipleSelectionAll[i][rowKey] === id) {
			                    // 如果总选择中有未被选中的，那么就删除这条
			                    that.multipleSelectionAll.splice(i, 1)
			                    break
			                }
			            }
			        }
			    }) */
			},
			/* 为父组件提供所有选择的行信息 */
			getSelectAllRows () {
			    if (this.hasPageMemory) {
			        return this.multipleSelectionAll
			    }
			    return this.multipleSelection
			},
			/* 清空翻页记忆的数组 */
			clearSelectAllRows () {
			    this.multipleSelectionAll = []
			}
		}
	}
</script>

<style>
</style>
