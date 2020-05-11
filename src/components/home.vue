<template>
	<el-container class="home-container">
		<el-header>
			<div>
				<img src="../assets/heima.png" />
				<span>图书销售管理系统</span>
			</div>
			<el-button type="info" @click="exit">退出</el-button>
		</el-header>
		<el-container>
			<el-aside :width="isCollapse?'64px':'200px'">
				<div class="toggle-button" @click="toggleButton">|||</div>
				<el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse"
				 :collapse-transition="false" router :default-active="activePath" style="border-right:none;">
					<!-- 一级菜单 -->
					<el-submenu :index="items.id+''" v-for="items in menuList" :key="items.id">
						<!-- 一级菜单的模板区域 -->
						<template slot="title">
							<!-- 图标 -->
							<i :class="iconList[items.id]"></i>
							<!-- 文本 -->
							<span>{{items.name}}</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item :index="'/'+subItem.path" v-for="subItem in items.children" :key=" subItem.id" @click="saveIndex('/'+subItem.path)">
							<template slot="title">
								<!-- 图标 -->
								<i class="el-icon-menu"></i>
								<!-- 文本 -->
								<span>{{subItem.name}}</span>
							</template>
							</el-menu-item>
					</el-submenu>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	name: 'home'
	export default {
		data() {
			return {
				menuList: [{
						id: 1,
						name: "用户管理",
						children: [{
							id: '1.1',
							name: '用户列表',
							path: 'home/user',
						}]
					},
					{
						id: 2,
						name: "权限管理",
						children: [{
								id: 2.1,
								name: '角色列表',
								path: 'home/role',
							},
							{
								id: 2.2,
								name: '权限列表',
								path: 'home/quanxian',
							}
						]
					},
					{
						id: 3,
						name: "商品管理",
						children: [{
								id: 3.1,
								name: '商品列表',
								path: 'home/goods',
							},
							{
								id: 3.2,
								name: "商品信息管理",
								path: 'home/goodsInfo',
							}
						]
					},
					{
						id: 4,
						name: "订单管理",
						children: [{
								id: 4.1,
								name: "查看订单",
								path: 'home/orders',
							},
							{
								id: 4.2,
								name: "订单修改",
								path: 'home/updateOrders',
							}
						]
					},
					{
						id: 5,
						name: "数量统计",
						children: [
							{
								id: 5.1,
								name: "销售数量",
								path: 'home/saleCount',
							}
						]
					}
				],
				iconList: {
					'1': 'el-icon-user-solid',
					'2': 'el-icon-star-on',
					'3': 'el-icon-s-goods',
					'4': 'el-icon-s-shop',
					'5': 'el-icon-share'
				},
				// 是否折叠
				isCollapse: false,
				// 被激活的链接地址
				activePath:''
			};
		},
		created() {
			this.activePath = window.sessionStorage.getItem('activePath');
		},
		methods: {
			exit() {
				this.$router.push('/Login');
			},
			toggleButton() {
				this.isCollapse = !this.isCollapse;
			},
			// 保存链接的激活状态
			saveIndex(activePath){
				window.sessionStorage.setItem('activePath',activePath);
				this.activePath =activePath;
			}

		}
	};
</script>

<style scoped>
	.home-container {
		height: 100%;
	}

	.el-header {
		background-color: #373d41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;
	}

	.el-header>div {
		display: flex;
		align-items: center;
	}

	.el-header>div>span {
		margin-left: 15px;
	}

	.el-aside {
		background-color: #333744;
	}

	.el-main {
		background-color: #eaedf1;
	}

	.toggle-button {
		background-color: #4A5064;
		font-size: 10px;
		line-height: 24px;
		color: #fff;
		text-align: center;
		letter-spacing: 0.2em;
		cursor: pointer;
	}
</style>
