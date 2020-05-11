<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/user' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图区 -->
		<el-card shadow="always">
			<el-row :gutter="20">
				<el-col :span="7">
					<el-input placeholder="请输入内容" v-model="searchText">
						<el-button slot="append" icon="el-icon-search" @click="searchTextButton"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="addUsers=true">添加用户</el-button>
				</el-col>
			</el-row>
			<!-- 用户列表区 -->
			<el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" :cell-style="cellStyle" max-height="500">
				<el-table-column type="index" fixed style="width: 10%;"></el-table-column>
				<el-table-column label="姓名" prop="name" style="width: 10%;"></el-table-column>
				<el-table-column label="邮箱" prop="email" style="width: 15%;"></el-table-column>
				<el-table-column label="电话" prop="phone" style="width: 15%;"></el-table-column>
				<el-table-column label="角色" prop="role" style="width: 10%;"></el-table-column>
				<el-table-column label="状态" prop="status" style="width: 15%;">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.status" @change="changeUserStatus(scope.row)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
						<el-tooltip effect="dark" content="分配角色" placement="top">
							<el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<div class="fenye">
				<el-pagination background layout="prev, pager, next" :total="userList.length" :page-size="8" :current-page="currentPage"
				 @size-change="handleSizeChange" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</el-card>
		<el-dialog title="添加用户" :visible.sync="addUsers" width="30%" @close="closeAddUserDialog">
			<el-form :model="addUser" :rules="addUserRule" ref="addUserRuleRef" label-width="100px">
				<el-form-item label="姓名:" prop="name">
					<el-input type="text" v-model="addUser.name"></el-input>
				</el-form-item>
				<el-form-item label="邮箱:" prop="email">
					<el-input v-model="addUser.email"></el-input>
				</el-form-item>
				<el-form-item label="电话:" prop="phone">
					<el-input v-model="addUser.phone"></el-input>
				</el-form-item>
				<div class="alertButton">
					<el-button @click="addUsers=false">取 消</el-button>
					<el-button type="primary" @click="addUserInfo">确 定</el-button>
				</div>
			</el-form>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'user',
		data() {
			var checkPhone = (rule, value, callback) => {
				const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
				if (!value) {
					return callback(new Error('电话号码不能为空'))
				}
				setTimeout(() => {
					// Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
					// 所以我就在前面加了一个+实现隐式转换

					if (!Number.isInteger(+value)) {
						callback(new Error('请输入数字值'))
					} else {
						if (phoneReg.test(value)) {
							callback()
						} else {
							callback(new Error('电话号码格式不正确'))
						}
					}
				}, 100)
			}
			var checkEmail = (rule, value, callback) => {
				const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
				if (!value) {
					return callback(new Error('邮箱不能为空'))
				}
				setTimeout(() => {
					if (mailReg.test(value)) {
						callback()
					} else {
						callback(new Error('请输入正确的邮箱格式'))
					}
				}, 100)
			}
			return {
				total: 0,
				pagesize: 7,
				currentPage: 1,
				searchText: '',
				// 控制添加对话框显示或隐藏
				addUsers: false,
				addUser: {
					name: '',
					email: '',
					phone: '',
				},
				// 添加表单的验证
				addUserRule: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 4,
							message: '名字长度在 2 到 4 个字符',
							trigger: 'blur'
						}
					],
					email: [{
						required: true,
						validator: checkEmail,
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: checkPhone,
						trigger: 'blur'
					}]
				},
				userList: [{
						id: 1,
						name: '小王',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: true,
					},
					{
						id: 2,
						name: '小红',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: true,
					},
					{
						id: 3,
						name: '小陈',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '商家',
						status: false,
					},
					{
						id: 4,
						name: '小肖',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: true,
					},
					{
						id: 5,
						name: '小黄',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: true,
					},
					{
						id: 6,
						name: '小绿',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: true,
					},
					{
						id: 7,
						name: '小张',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: true,
					},
					{
						id: 8,
						name: '小赵',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: false,
					}, {
						id: 9,
						name: '小赵',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: false,
					}, {
						id: 10,
						name: '小赵',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: false,
					}, {
						id: 11,
						name: '小赵',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: false,
					}, {
						id: 12,
						name: '小赵',
						email: '4399@qq.com',
						phone: '13023991379',
						role: '用户',
						status: false,
					}

				]
			};
		},
		methods: {
			handleSizeChange: function() {

			},

			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				console.log(this.currentPage) //点击第几页
			},
			cellStyle({
				row,
				rowIndex
			}) {
				return 'border-bottom: aliceblue 8px solid;height: 61px;font-size: 15px;'
			},
			// 监听switch状态开关的改变
			changeUserStatus(userinfo) {
				console.log(userinfo);
			},
			searchTextButton() {},
			closeAddUserDialog(){
				this.$refs.addUserRuleRef.resetFields();
			},
			addUserInfo(){
				this.$refs.addUserRuleRef.validate(valid =>{
					if(!valid){
						return
					}else{
						
					}
				});
			}
		},
	}
</script>

<style scoped="scoped">
	.fenye {
		margin-top: 50px;
		text-align: center;
	}

	.alertButton {
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
	}
</style>
