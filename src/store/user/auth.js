import http from '@/utils/http';
import router from '@/router/index.js';

const state = {
	jwt: null,
	profileImg: '',
	isLogin: false,
	isLoginError: false,
	// isLogined: false,
};

const getters = {};
const actions = {
	//로그인
	postUserLogin({ commit }, loginObj) {
		return http
			.process('user', 'login', loginObj)
			.then((res) => {
				console.log(res.user);
				console.log(res.payload.message);
				if (res.payload.message == '로그인에 성공하였습니다.') {
					commit('setLoginToken', res.token);
					commit('setLoginImg', res.user.imagePath);
					localStorage.setItem('user', res.user);

					console.log(localStorage.getItem('user'));

					http
						.process('user', 'userinfo', null, { token: res.token })
						.then((res) => {
							console.log(res);

							commit('setUserInfo', res);
							// console.log('@@@@@@@@@@@');
							// console.log('로그인 되었습니다.');
							// alert('로그인 되었습니다.');
							// router.push({ name: 'Home' }).catch(() => {});
						})
						.catch((err) => {
							console.log(err);
						});
				} else if (res.payload.message == '가입 되지 않은 email 입니다.') {
					console.log('가입 되지 않은 email 입니다.');
					alert('가입 되지 않은 email 입니다.');
					commit('logoutState');
					// return router.push({ name: 'UserLogin' }).catch(() => {});
					// return this.$router.push(this.$route.query.redirect || '/user/login');
				} else if (res.payload.message == '비밀번호를 잘못 입력 하셨습니다.') {
					console.log('비밀번호를 잘못 입력 하셨습니다.');
					alert('비밀번호를 잘못 입력 하셨습니다.');
					commit('logoutState');
					// return router.push({ name: 'UserLogin' }).catch(() => {});
					// return this.$router.push(this.$route.query.redirect || '/user/login');
				}
				return res;
			})
			.catch((err) => {
				console.log(err);
				console.log(err.message);
				if (
					err.message === '가입 되지 않은 email 입니다.' ||
					err.message === '비밀번호를 잘못 입력 하셨습니다.' ||
					err.message === '로그인에 실패하였습니다.'
				) {
					alert(err.message);
					commit('logoutState');
					// return router.push({ name: 'UserLogin' }).catch(() => {});
					// return this.$router.push(this.$route.query.redirect || '/user/login');
				}
				commit('logoutState');
				// return router.push({ name: 'UserLogin' }).catch(() => {});
				// return this.$router.push(this.$route.query.redirect || '/user/login');
			});
	},
	//로그아웃
	getUserLogout({ commit }) {
		return http
			.process('user', 'logout')
			.then((res) => {
				console.log(res);
				commit('logoutState');
			})
			.catch((err) => {
				console.log(err);
			});
	},

	validTokenError({ commit }) {
		localStorage.removeItem('user');
		commit('logoutState');
		this.$router.push({ name: 'UserLogin' });
	},

	// isLogined({ commit }, isLogined) {
	// 	commit('isLogined', isLogined);
	// 	this.$router.push({ name: 'Home' });
	// },
	login({ state, commit }, loginObj) {
		let selectUser = null;
		state.memberUser.forEach((user) => {
			if (user.email === loginObj.email) {
				selectUser = user;
			}
		});
		if (selectUser === null || selectUser.password !== loginObj.password)
			commit('loginError');
		else {
			commit('loginSuccess', selectUser);
		}
	},
};

const mutations = {
	//로그인 성공
	setLoginToken(state, data) {
		state.isLogin = true;
		state.isLoginError = false;
		state.jwt = data;
	},
	setLoginImg(state, data) {
		state.profileImg = data;
	},
	setUserInfo(state, data) {
		state.userInfo = data;
	},

	//로그인 실패
	loginError(state) {
		state.isLogin = false;
		state.isLoginError = true;
	},
	//로그아웃 처리 상태값 변환
	logoutState(state) {
		state.isLogin = false;
		state.isLoginError = false;
		state.userInfo = null;
		localStorage.removeItem('user');
	},
	// 현재 사용자의 로그인상태(로그인인지 아닌지)
	isLogined(state, data) {
		state.isLogined = data;
	},
};

export default {
	namespaced: true,
	getters,
	state,
	actions,
	mutations,
};
