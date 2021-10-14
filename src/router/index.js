import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('../views/Home.vue');
const Create = () => import('../views/BoardCreate.vue');
const BoardDetail = () => import('../views/BoardDetail.vue');
const UserLogin = () => import('../views/UserLogin.vue');
const SignUp = () => import('../views/SignUp.vue');
const Profile = () => import('../views/Profile.vue');
const UserLike = () => import('../views/UserLike.vue');
const Search = () => import('../views/Search.vue');
const Empty = () => import('../components/empty/empty.vue');
const Chat = () => import('../views/Chat.vue');
const ChatList = () => import('../views/ChatList.vue');
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { isAuth: true },
		/*     beforeEnter: requireAuth() */
	},
	{
		path: '/create',
		name: 'Create',
		component: Create,
	},
	{
		path: '/detail/:id',
		name: 'BoardDetail',
		component: BoardDetail,
		props: true,
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
		// props: true
	},
	//*****************채팅 */
	{
		path: '/chat',
		name: 'Chat',
		component: Chat,
	},
	{
		path: '/chat/list',
		name: 'ChatList',
		component: ChatList,
	},
	{
		path: '/user',
		component: Empty,
		children: [
			{
				path: 'login',
				name: 'UserLogin',
				component: UserLogin,
			},
			{
				path: 'signup',
				name: 'SignUp',
				component: SignUp,
			},
			{
				path: 'profile',
				name: 'Profile',
				component: Profile,
			},
			{
				path: 'userLike',
				name: 'UserLike',
				component: UserLike,
			},
		],
	},
	{
		path: '/*',
		redirect: { name: 'Home' },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes,
});
// //형준
// router.beforeEach((to, from, next) => {
// 	//login page 처리
// 	if (to.matched.some((record) => record.meta.loginAuth)) {
// 		if (store.state.isLogin == false) {
// 			next();
// 		} else {
// 			alert('Login complete');
// 			next('/jun/home');
// 		}
// 	} else {
// 		next(); // 반드시 next()를 호출하십시오!
// 	}
// });
// router.beforeEach((to, from, next) => {
// 	// pageAuth
// 	if (to.matched.some((record) => record.meta.pageAuth)) {
// 		if (store.state.isLogin == true) {
// 			next();
// 		} else {
// 			alert('Login please');
// 			next('/jun/login');
// 		}
// 	} else {
// 		next(); // 반드시 next()를 호출하십시오!
// 	}
// });

export default router;
