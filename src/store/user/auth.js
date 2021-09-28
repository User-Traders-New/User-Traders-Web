import http from '@/utils/http';
import router from '@/router/index.js';

const state = {
	userInfo: {},
	jwt: null,
	profileImg: '',
	isLogin: false,
	isLoginError: false,
};

const getters = {};
const actions = {
	//로그인
	postUserLogin({ dispatch }, loginObj) {
		return http
			.process('user', 'login', loginObj)
			.then((res) => {
				if (res.payload.message == '로그인에 성공하였습니다.') {
					let token = res.token;
					let user = res.user;
					// let profileImg = res.user.imagePath;
					// commit('setLoginToken', token);
					// commit('setLoginImg', profileImg);
					localStorage.setItem('token', token);

					dispatch('getUserInfo');
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
				} else {
					alert(
						'알수없는 이유로 로그인 되지 않습니다.다시 시도해주시기 바랍니다.'
					);
					commit('logoutState');
				}
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
	// 토큰 에러시 로그아웃
	validTokenError({ commit }) {
		localStorage.removeItem('user');
		commit('logoutState');
		this.$router.push({ name: 'UserLogin' });
	},
	// 토큰값 가져와서 로그인 상태 확인 , 새로고침시 로그인 안빠지도록
	getUserInfo({ commit }) {
		// 로컬 스토리지에 저장 되어 있는 토큰 가져오기
		let token = localStorage.getItem('token');

		http
			.process('user', 'userInfo', null, { token: token })
			.then((res) => {
				console.log(res);
				console.log(res.id);
				let user = {
					id: res.id,
					email: res.email,
					userName: res.userName,
					tel: res.tel,
					departmentId: res.departmentId,
					studentId: res.studentId,
					gender: res.gender,
					imagePath: res.imagePath,
				};
				commit('isLoginedSuccess', user);
				commit('setLoginToken', token);
			})
			.catch((err) => {
				console.log(err);
			});
	},

	// 초기 로그인 test 및 연습
	// login({ state, commit }, loginObj) {
	// 	let selectUser = null;
	// 	state.memberUser.forEach((user) => {
	// 		if (user.email === loginObj.email) {
	// 			selectUser = user;
	// 		}
	// 	});
	// 	if (selectUser === null || selectUser.password !== loginObj.password)
	// 		commit('loginError');
	// 	else {
	// 		commit('loginSuccess', selectUser);
	// 	}
	// },
};

const mutations = {
	// //로그인 성공후 프로필 이미지
	// setLoginImg(state, data) {
	// 	state.profileImg = data;
	// },

	setUserInfo(state, data) {
		state.userInfo = data;
	},
	//로그인 성공 1
	isLoginedSuccess(state, data) {
		state.userInfo = data;
		state.profileImg = data.imagePath;
	}, //로그인 성공 2
	setLoginToken(state, data) {
		state.isLogin = true;
		state.isLoginError = false;
		state.jwt = data;
	},

	//로그인 실패
	isLoginedError(state) {
		state.isLogin = false;
		state.isLoginError = true;
		state.jwt = '';
	},
	//로그아웃 처리 상태값 변환
	logoutState(state) {
		state.isLogin = false;
		state.isLoginError = false;
		state.jwt = '';
		state.profileImg = '';
		state.userInfo = null;
		localStorage.removeItem('toekn');
		localStorage.removeItem('user');
	},
};

export default {
	namespaced: true,
	getters,
	state,
	actions,
	mutations,
};
