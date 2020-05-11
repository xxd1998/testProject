<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/user' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>权限列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-table :data="quanDate.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" :cell-style="cellStyle">
				<el-table-column type="index" width="180">
				</el-table-column>
				<el-table-column prop="quanxianName" label="权限名称">
				</el-table-column>
				<el-table-column prop="path" label="路径">
				</el-table-column>
				<el-table-column label="等级">
					<template slot-scope="scope">
						<el-tag type="success" v-if="scope.row.level===1">一级</el-tag>
						<el-tag type="warning" v-else-if="scope.row.level===2">二级</el-tag>
						<el-tag type="info" v-else-if="scope.row.level==3">三级</el-tag>
					</template>
				</el-table-column>
			</el-table>
			<div class="fenye">
				<el-pagination background layout="prev, pager, next" :total="quanDate.length" :page-size="8" :current-page="currentPage"
				 @size-change="handleSizeChange" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</el-card>

	</div>
</template>

<script>
	name:'quxian'
	export default {
		data() {
			return {
				total: 0,
				pagesize: 7,
				currentPage: 1,
				quanDate: [{
						quanxianName: '商品管理',
						path: 'goods',
						level: 1
					},
					{
						quanxianName: '商品管理',
						path: 'goods',
						level: 1
					},
					{
						quanxianName: '订单管理',
						path: 'order',
						level: 3
					},
					{
						quanxianName: '订单管理',
						path: 'order',
						level: 2
					},
					{
						quanxianName: '订单管理',
						path: 'order',
						level: 3
					},
					{
						quanxianName: '订单管理',
						path: 'order',
						level: 2
					}, {
						quanxianName: '订单管理',
						path: 'order',
						level: 2
					},
					{
						quanxianName: '订单管理',
						path: 'order',
						level: 1
					},
					{
						quanxianName: '订单管理',
						path: 'order',
						level: 3
					}
				]

			};
		},
		methods: {
			cellStyle({
				row,
				rowIndex
			}) {
				return 'border-bottom: aliceblue 8px solid;height: 61px;font-size: 15px;'
			},
			handleSizeChange: function() {
			
			},
			
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				console.log(this.currentPage) //点击第几页
			}
		}
	}
</script>

<style scoped="scoped">
	.fenye {
		margin: 40px auto;
		text-align: center;
	}
</style>
