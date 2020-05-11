<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/user' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-button type="primary">添加角色</el-button>
			<el-table :data="roleData" style="width: 100%">
				<el-table-column type="index" width="180">
				</el-table-column>
				<el-table-column prop="roleName" label="角色名称">
				</el-table-column>
				<el-table-column prop="roleDescibe" label="角色描述">
				</el-table-column>
				<el-table-column prop="address" label="操作">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
						<el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				roleData: [{
					roleName:'管理员',
					roleDescibe:'项目总管理员',
				},{
					roleName:'商家',
					roleDescibe:'店铺商家',
				},{
					roleName:'用户',
					roleDescibe:'查看购买商品的用户',
				}
				]
			};
		}
	}
</script>

<style>
</style>
