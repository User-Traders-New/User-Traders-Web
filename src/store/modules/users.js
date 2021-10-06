import http from '@/utils/http';
const state = {
	listData: null,
	listDataDeatail: {
		categoryId: {
			subCategoryId: {},
		},
	},
	listDataDeatailUserId: {},
	listUsersBoardsData: [],

	boardParentComment: [],
	board_cur_two: [],
	detailImageurl: [],
	totalPage: null,
	page: 1,
	newlistData: null,
	categories: [],
	subcategories: [],
};

const getters = {};
const actions = {
	getList({ commit }) {
		return http
			.process('boards', 'list/all')
			.then((data) => {
				commit('setListData', data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	getListDetail({ commit }, payload) {
		return http
			.process(
				'boards',
				'listdetail',
				{ id: payload.id },
				{ token: payload.jwt }
			)
			.then((data) => {
				commit('setListDataDetail', data);
			});
	},
	getCategories({ commit }) {
		return http
			.process('boards', 'categoryAll')
			.then((data) => {
				commit('setCategories', data.boardSubCategoryDtoList);
			})
			.catch((err) => {
				console.log(err);
			});
	},

	getSubCategories({ commit }, payload) {
		return http
			.process('boards', 'categorySub', { subCategoryId: payload })
			.then((data) => {
				commit('setSubCategories', data.boardCategoryDtoList);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	getlistUsersBoardsData({ commit }, payload) {
		return http
			.process(
				'boards',
				'userBoard',
				{ userId: payload.userId },
				{ token: payload.token }
			)
			.then((res) => {
				console.log(res);
				commit('setlistUsersBoardsData', res.boardResponseDtoList);
				console.log(state.listDataDeatailUserId);
			})
			.catch((err) => {
				console.log(err);
				alert('로그인 후 이용해 주세요');
				this.$router.push({ name: 'UserLogin' });
			});
	},
};

const mutations = {
	setListData(state, data) {
		state.listData = data;
	},
	setListDataDetail(state, data) {
		const arr = [];

		for (var i = 0; i < data.boardImageDto.length; i++) {
			arr.push(data.boardImageDto[i].path);
		}
		state.detailImageurl = arr;
		state.listDataDeatail = data.boardResponseLoginDto;
		state.boardParentComment = data.boardResponseLoginDto.boardParentComment;
		state.listDataDeatailUserId = data.boardResponseLoginDto.userId;
		console.log('@@@@@@@@@@@@@유저아이디');
		console.log(state.listDataDeatailUserId);
		for (var i = 0; i < 2; i++) {
			if (data.boardResponseLoginDto.boardParentComment[i]) {
				state.board_cur_two = state.board_cur_two.concat(
					data.boardResponseLoginDto.boardParentComment[i].userId
				);
			} else {
				state.board_cur_two = null;
			}
		}
	},
	setlistUsersBoardsData(state, data) {
		console.log('@@@@@@@@@@@@@@@data');
		console.log(data);
		console.log('@@@@@@@@@@@@@@');
		state.listUsersBoardsData = data;
	},
	setCategories(state, data) {
		state.categories = data;
	},
	setSubCategories(state, data) {
		state.subcategories = data;
	},
};

export default {
	namespaced: true,
	getters,
	state,
	actions,
	mutations,
};
