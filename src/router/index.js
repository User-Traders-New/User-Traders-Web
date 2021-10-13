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
const routes = [
	// 홈
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { isAuth: true },
	},
	//게시물 저장
	{
		path: '/create',
		name: 'Create',
		component: Create,
	},
	//게시물 상세정보
	{
		path: '/detail/:id',
		name: 'BoardDetail',
		component: BoardDetail,
		props: true,
	},
	//게시물 검색
	{
		path: '/search',
		name: 'Search',
		component: Search,
	},
	//회원
	{
		path: '/user',
		component: Empty,
		children: [
			//로그인
			{
				path: 'login',
				name: 'UserLogin',
				component: UserLogin,
			},
			//회원가입
			{
				path: 'signup',
				name: 'SignUp',
				component: SignUp,
			},
			//프로필
			{
				path: 'profile',
				name: 'Profile',
				component: Profile,
			},
			//내가 좋아한 게시물
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

export default router;
