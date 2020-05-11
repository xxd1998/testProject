<template>
	<div class="login_container">
		<div class="login_box">
			<div class="avator_box">
				<img src="../assets/logo.png" />
			</div>
			<el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0px" class="login_form">
				<el-form-item prop="userName">
					<el-input v-model="loginForm.userName" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-s-goods" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item class="btn">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info"  @click="resert">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	name: 'Login'
	export default {
		data() {
			return {
				loginForm: {
					userName: '',
					password: ''
				},
				rules: {
					userName: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur'
						}
					]
				}
			};

		},
		methods: {
			login() {
				this.$refs.loginFormRef.validate((valid) => {
					if (valid) {
						this.$message.success('登录成功');
						this.$router.push('/home/user');
					} else {
						this.$message.error('登录失败');
						return false;
					}
				});
			},
			resert() {
				// console.log(this)
				this.$refs.loginFormRef.resetFields();
			}
		}
	}
</script>

<style scoped>
	.login_container {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login_box {
		width: 450px;
		height: 300px;
		background-color: white;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.avator_box {
		height: 130px;
		height: 130px;
		border: 1px solid #eee;
		border-radius: 50%;
		padding: 10px;
		box-shadow: 0 0 10px #ddd;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
	}

	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #eee;
	}

	.btn {
		display: flex;
		justify-content: flex-end;
	}

	.login_form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}
</style>
