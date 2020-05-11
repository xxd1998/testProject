import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import user from '../components/user.vue'
import quanxian from '../components/quanxian.vue'
import role from '../components/role.vue'
import goods from '../components/goods.vue'
import goodsInfo from '../components/goodsInfo.vue'
import orders from '../components/orders.vue'
import updateOrders from '../components/updateOrders.vue'
import saleCount from '../components/saleCount.vue'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/Login',
			name: 'Login',
			component: Login
		},
		{
			path: '/home',
			name: 'home',
			component: home,
			// redirect:'/welcome',
			children: [{
					path: '/welcome',
					name: 'welcome',
					props: true,
					component: welcome
				}, {
					path: '/home/user',
					name: 'user',
					component: user
				}, {
					path: '/home/quanxian',
					name: 'quanxian',
					component: quanxian
				}, {
					path: '/home/role',
					name: 'role',
					component: role
				},
				{
					path: '/home/goods',
					name: 'goods',
					component: goods
				},
				{
					path: '/home/goodsInfo',
					name: 'goodsInfo',
					component: goodsInfo
				},
				{
					path: '/home/orders',
					name: 'orders',
					component: orders
				},
				{
					path: '/home/updateOrders',
					name: 'updateOrders',
					component: updateOrders
				},
				{
					path: '/home/saleCount',
					name: 'saleCount',
					component: saleCount
				}
			]
		}
	]
})
