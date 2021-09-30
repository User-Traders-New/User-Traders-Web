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
	postUserLogin({ dispatch, commit }, loginObj) {
		return http
			.process('user', 'login', loginObj)
			.then((res) => {
				if (res.payload.message == '로그인에 성공하였습니다.') {
					let token = res.token;

					if (!token) {
						alert('로그인에 실패하였습니다.');
						dispatch('getUserLogout');
					}
					// let profileImg = res.user.imagePath;
					// commit('setLoginToken', token);
					// commit('setLoginImg', profileImg);
					localStorage.setItem('jwt', token);

					commit('isLoginedSuccess2', token);
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
				}
			});
	},

	// 토큰값 가져와서 로그인 상태 확인 , 새로고침시 로그인 안빠지도록
	getUserInfo({ commit }) {
		// 로컬 스토리지에 저장 되어 있는 토큰 가져오기
		let token = localStorage.getItem('jwt');
		http
			.process('user', 'userInfo', null, { token: token })
			.then((res) => {
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
				localStorage.setItem('user', user);
				commit('isLoginedSuccess', user);
				commit('isLoginedSuccess2', token);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	//로그아웃
	getUserLogout({ commit }, jwt) {
		return http
			.process('user', 'logout', null, { token: jwt })
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
		localStorage.removeItem('token');
		commit('logoutState');
		this.$router.push({ name: 'UserLogin' });
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
	isLoginedSuccess2(state, data) {
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
		localStorage.removeItem('jwt');
		localStorage.removeItem('user');
		state.isLogin = false;
		state.isLoginError = false;
		state.jwt = '';
		state.profileImg = '';
		state.userInfo = null;
	},
};

export default {
	namespaced: true,
	getters,
	state,
	actions,
	mutations,
};
