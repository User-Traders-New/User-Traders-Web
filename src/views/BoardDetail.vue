<template>
	<div class="mt-16">
		<div v-if="listDataDeatail">
			<v-row class="fill-height mt-5 mb-16" align="center" justify="center">
				<v-card width="360px" class="pa-2" tile flat>
					<!-- 이미지 -->
					<div>
						<v-carousel progress-color="orange">
							<v-carousel-item
								v-for="(item, i) in detailImageurl"
								:key="i"
								v-bind:src="item"
								width="344"
								height="auto"
								reverse-transition="fade-transition"
								transition="fade-transition"
							></v-carousel-item>
						</v-carousel>
					</div>
					<!-- 유저프로필,닉네임,판매중,물건상태 -->
					<div
						style="border-bottom:solid; border-width:0.5px; border-color: #cccccc;"
					>
						<v-card-text>
							<div style="height: 56px; width: 100% ">
								<div style="width: 50%; float: left; ">
									<div style="display:flex; flex-direction:row">
										<v-list-item-avatar>
											<v-img
												v-if="listDataDeatailUserId"
												v-bind:src="listDataDeatailUserId.imagePath"
											></v-img>
										</v-list-item-avatar>
										<div
											style="display: flex; justify-content: center; align-items: center;"
											v-if="listDataDeatailUserId.nickName"
										>
											{{ listDataDeatailUserId.nickName }}
										</div>
									</div>
								</div>
								<div
									v-if="listDataDeatail.status == 0"
									class="light-blue--text"
									style="margin-left: 50%; text-align: right;"
									title="판매중"
								>
									{{ listDataDeatail.status | tradeStatus }}
									<v-icon
										v-if="listDataDeatail.grade == 0"
										color="#ff0008"
										title="새상품"
									>
										mdi-new-box
									</v-icon>
									<v-icon
										v-if="listDataDeatail.grade == 1"
										color="#fc0558"
										title="S급"
									>
										mdi-alpha-s-box
									</v-icon>
									<v-icon
										v-else-if="listDataDeatail.grade == 2"
										color="#e39a07"
										title="A급"
									>
										mdi-alpha-a-box
									</v-icon>
									<v-icon
										v-else-if="listDataDeatail.grade == 3"
										color="#a6a5a2"
										title="B급"
									>
										mdi-alpha-b-box
									</v-icon>
								</div>
								<div
									v-else-if="listDataDeatail.status == 1"
									class="orange--text"
									style="margin-left: 50%; text-align: right;"
									title=""
								>
									{{ listDataDeatail.status | tradeStatus }}
									<v-icon
										v-if="listDataDeatail.grade == 0"
										color="#ff0008"
										title="새상품"
									>
										mdi-new-box
									</v-icon>
									<v-icon
										v-if="listDataDeatail.grade == 1"
										color="#fc0558"
										title="S급"
									>
										mdi-alpha-s-box
									</v-icon>
									<v-icon
										v-else-if="listDataDeatail.grade == 2"
										color="#e39a07"
										title="A급"
									>
										mdi-alpha-a-box
									</v-icon>
									<v-icon
										v-else-if="listDataDeatail.grade == 3"
										color="#a6a5a2"
										title="B급"
									>
										mdi-alpha-b-box
									</v-icon>
								</div>
								<div
									v-else-if="listDataDeatail.status == 2"
									class="gray--text"
									style="margin-left: 50%; text-align: right;"
									title=""
								>
									{{ listDataDeatail.status | tradeStatus }}
									<v-icon
										v-if="listDataDeatail.grade == 0"
										color="#ff0008"
										title="새상품"
									>
										mdi-new-box
									</v-icon>
									<v-icon
										v-if="listDataDeatail.grade == 1"
										color="#fc0558"
										title="S급"
									>
										mdi-alpha-s-box
									</v-icon>
									<v-icon
										v-else-if="listDataDeatail.grade == 2"
										color="#e39a07"
										title="A급"
									>
										mdi-alpha-a-box
									</v-icon>
									<v-icon
										v-else-if="listDataDeatail.grade == 3"
										color="#a6a5a2"
										title="B급"
									>
										mdi-alpha-b-box
									</v-icon>
								</div>
							</div>
						</v-card-text>
					</div>
					<!-- 제목,시간,카테고리,내용,가격 -->
					<div
						class="pb-5"
						style="border-bottom:solid; border-width:0.5px; border-color: #cccccc;"
					>
						<v-card-text class="pa-1" style="position: relative;">
							<v-card-text class="mt-2 pa-3">
								<div
									class="font-weight-medium"
									style="font-size:xx-large; font-weight:bold"
								>
									{{ listDataDeatail.title }}
								</div>
							</v-card-text>
							<v-card-text>
								<div>
									{{ listDataDeatail.createAt | timeForToday }}
									·
									{{ listDataDeatail.categoryId.subCategoryId.name }}
									·
									{{ listDataDeatail.categoryId.name }}
								</div>
							</v-card-text>
							<v-card-text class="mt-2 pa-3">
								<div
									class="font-weight-medium"
									style="display: block;font-size:large;"
								>
									{{ listDataDeatail.content }}
								</div>
							</v-card-text>

							<v-card-text class="pa-3">
								<div
									class="font-weight-medium float-right "
									style="font-size:large;"
								>
									{{ listDataDeatail.price | moneyFilter }} 원
								</div>
							</v-card-text>
						</v-card-text>
					</div>
					<!-- 댓글수,찜수,조회수,채팅수 -->
					<div
						style="border-bottom:solid; border-width:0.5px; border-color: #cccccc;"
					>
						<v-card-text class="mt-2 pa-3">
							<div style="width: 100%;">
								<div style="width: 20%; float: left"></div>
								<div style="margin-left: 20%; text-align: right">
									<v-icon color="green">
										mdi-comment-text-multiple
									</v-icon>
									{{ listDataDeatail.commentCount }}
									<v-icon color="red">
										mdi-heart
									</v-icon>
									{{ listDataDeatail.likeCount }}
									<!-- <v-icon color="yellow">
										mdi-chat-processing
									</v-icon>
									{{ listDataDeatail.chatCount }} -->
									<v-icon color="blue">
										mdi-eye-outline
									</v-icon>
									{{ listDataDeatail.views }}
								</div>
								<div>
									<div class="ml-10">
										<v-btn
											@click="likeAddDelete(listDataDeatail.id)"
											color="#F0F0E6"
											class="ma-2 orange--text pa-5"
										>
											찜하기
											<v-icon
												v-if="listDataDeatail.likeWhether == 0"
												color="white"
												class="ml-2"
											>
												mdi-heart
											</v-icon>
											<v-icon
												v-if="listDataDeatail.likeWhether == 1"
												color="red"
												class="ml-2"
											>
												mdi-heart
											</v-icon>
										</v-btn>

										<!-- <input
													type="text"
													class="form-control"
													v-model="room_name"
													v-on:keyup.enter="createRoom"
												/> -->
										<v-btn
											color="orange"
											class="ma-2 white--text pa-5"
											@click="
												createRoom(
													listDataDeatail.title,
													listDataDeatailUserId.id,
													listDataDeatail.id
												)
											"
										>
											채팅하기
											<v-icon color="yellow" class="ml-2">
												mdi-chat-processing
											</v-icon>
											<!-- <v-icon right dark>
								mdi-arrow-right-bold
							</v-icon> -->
										</v-btn>
									</div>
								</div>
								<div fixed class="ml-7" style="display:flex;flex-direction:row">
									<v-form>
										<v-text-field
											v-model="commented"
											counter="15"
											autocomplete="off"
											label="댓글"
											prepend-icon="mdi-comment-text-multiple"
										></v-text-field>
									</v-form>
									<v-card-actions
										@click="Sendcommented(commented, listDataDeatail.id)"
									>
										<v-btn small style="" class="rounded-pill">보내기</v-btn>
									</v-card-actions>
								</div>
							</div>
						</v-card-text>
					</div>
					<!-- 댓글 -->
					<div
						class="mb-2"
						style="border-bottom:solid; border-width:0.5px; border-color: #cccccc;"
					>
						<div
							style="border-bottom:solid; display: flex; justify-content: center; align-items: center;border-width:0.5px; border-color: #cccccc;"
							v-if="boardParentComment.length >= 3 && isCommentAdd == false"
							@click="commnetAddList"
						>
							댓글 더보기
						</div>
						<div
							style="border-bottom:solid; display: flex; justify-content: center; align-items: center;border-width:0.5px; border-color: #cccccc;"
							v-if="boardParentComment.length >= 3 && isCommentAdd == true"
							@click="commnetAddList"
						>
							댓글 접기
						</div>

						<div v-if="boardParentComment.length >= 3 && isCommentAdd == false">
							<v-card-text class="mt-2 pa-3">
								<div
									v-for="(CC_Item, i) in boardParentComment.slice(0, 2)"
									:key="`CC_Item-${i}`"
								>
									<div style="display:flex ;  flex-direction:column">
										<div style="display:flex ;  flex-direction:row;">
											<div
												class="pr-3 mr-3 mb-3"
												style="font-size : 17px;
                      border-right:solid; border-width:0.1px; border-color: #cccccc;
                      "
											>
												{{ CC_Item.userId.nickName }}
											</div>
											<div class="mr-2" style="font-size : 14px">
												{{ CC_Item.comment }}
											</div>
											<div style="font-size : 10px; float: right;">
												{{ CC_Item.createAt | timeForToday }}
											</div>
										</div>
									</div>
								</div>
								<div
									style=" display: flex; justify-content: center; align-items: center;"
								>
									...
								</div>
							</v-card-text>
						</div>

						<div v-if="isCommentAdd || boardParentComment.length < 3">
							<v-card-text class="mt-2 pa-3">
								<div
									v-for="(C_Item, i) in boardParentComment"
									:key="`C_Item-${i}`"
								>
									<div style="display:flex ;  flex-direction:column">
										<div style="display:flex ;  flex-direction:row;">
											<div class="mr-3 mb-3" style="font-size : 17px">
												{{ C_Item.userId.nickName }}
											</div>
											<div class="mr-2" style="font-size : 14px">
												{{ C_Item.comment }}
											</div>
											<div style="font-size : 10px; float: right;">
												{{ C_Item.createAt | timeForToday }}
											</div>
										</div>
									</div>
								</div>
							</v-card-text>
						</div>
					</div>
					<!-- 다른 회원 거래 물품 -->
					<div>
						<div
							@click="nextProduct(listDataDeatailUserId.id)"
							style="display: flex; justify-content: center; align-items: center; color:red;"
						>
							해당 회원의 다른 거래 물품 보기 click!!
						</div>
						<!-- 해당 회원 다른 거래 물품 -->
						<div v-if="isnextProd">
							<div>
								<v-container v-if="listUsersBoardsData">
									<v-row>
										<v-col
											v-for="(item, i) in listUsersBoardsData"
											:key="`item-${i}`"
										>
											<div @click="detailPush(item.id)">
												<v-card max-width="344">
													<div style="text-align : left; color : #fc9942">
														<v-icon
															class="pr-2 pl-2"
															title="카테고리"
															color="#fc9942"
														>
															mdi-tag
														</v-icon>
														{{ item.categoryId.subCategoryId.name }} >
														{{ item.categoryId.name }}
													</div>
													<div style="display:flex; flex-direction:row">
														<div>
															<v-list-item-avatar tile size="100" color="grey">
																<v-img v-bind:src="item.thumbnail"> </v-img>
															</v-list-item-avatar>
														</div>
														<div
															class="font-weight-medium"
															style="font-size:x-large; font-weight:bold"
														>
															{{ item.title }}
														</div>
													</div>
													<div
														class="font-weight-medium float-right "
														style="font-size:large;"
													>
														{{ item.price | moneyFilter }} 원
													</div>
												</v-card>
											</div>
										</v-col>
									</v-row>
								</v-container>
							</div>
						</div>
					</div>
				</v-card>
			</v-row>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import http from '@/utils/http';
import Loading from './loding.vue';
import Formatter from '@/mixin/Formatter';
import axios from 'axios';
import router from '@/router/index.js';

const WAS_URL = process.env.VUE_APP_WAS;

export default {
	mixins: [Formatter],
	props: ['id'],

	components: {
		Loading,
	},
	data() {
		return {
			isLoading: true,
			token: '',
			iscommented: false,
			isnextProd: false,
			commented: '',
			commentRules: [
				(v) => (v && v.length <= 15) || '댓글은 15자 이하 까지 가능합니다.',
			],
			isCommentAdd: false,
			room_name: '',
		};
	},

	computed: {
		...mapState({
			listDataDeatail: (state) => state.users.listDataDeatail,
			detailImageurl: (state) => state.users.detailImageurl,
			boardParentComment: (state) => state.users.boardParentComment,
			listDataDeatailUserId: (state) => state.users.listDataDeatailUserId,
			board_cur_two: (state) => state.users.board_cur_two,
			listUsersBoardsData: (state) => state.users.listUsersBoardsData,
			likeCount: (state) => state.auth.likeCount,
		}),
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			console.log('detail init...');

			let jwt = localStorage.getItem('jwt');
			if (!localStorage.getItem('jwt')) {
				jwt = '';
			}
			this.$store.dispatch('auth/userTokenValid2', jwt);
			if (localStorage.getItem('jwt')) {
				this.getListDetail(this.id);
				this.token = localStorage.getItem('jwt');
			}
		},
		getListDetail(id) {
			let jwt = localStorage.getItem('jwt');
			let payload = {
				id: id,
				jwt: jwt,
			};
			this._getListDetail(payload).then(() => {
				this.isLoading = false;
			});
		},
		detailPush(id) {
			if (this.$store.state.users.listDataDeatail.id == id) {
				return;
			}
			this.$router
				.push({ name: 'BoardDetail', params: { id: id } })
				.then(() => {
					this.init();
				});
		},

		commnetAddList() {
			this.isCommentAdd = !this.isCommentAdd;
		},
		Sendcommented(message, boardId) {
			if (message.length >= 15) {
				alert('15자이상 댓글을 입력 할 수 없습니다.');
				return;
			}

			let obj = {
				boardId: {
					id: boardId,
				},
				comment: message,
			};
			let token = this.token;
			return http
				.process('boards', 'commentSend', obj, { token })
				.then((res) => {
					console.log(res);
					this.init();
					this.commented = '';
				})
				.catch((err) => {
					console.log(err);
				});
		},
		clickedComment() {
			this.iscommented = true;
		},
		likeAddDelete(id) {
			let payload = {
				id: id,
				token: this.token,
			};

			this.likeAddDelete2(payload)
				.then((res) => {
					console.log(res);

					if (
						res.message !=
						id + '번 게시물을 장바구니에 담기 취소에 성공하였습니다.'
					) {
						if (
							confirm(
								'해당 게시물을 찜 하였습니다. 장바구니로 이동하시겠습니까?'
							)
						) {
							this.$router.push({ name: 'UserLike' });
						}
					}
					this.init();
				})
				.catch((err) => {
					console.log(err);
					this.$router.push({ name: 'UserLogin' });
				});
		},

		async nextProduct(user_Id) {
			this.isnextProd = !this.isnextProd;
			if (this.isnextProd == true) {
				let payload = {
					userId: user_Id,
					token: this.token,
				};
				await this.getlistUsersBoardsData(payload);
			}
		},
		createRoom: function(title, sellUserId, boardId) {
			this.room_name = '게시물 제목: ' + title + ' 채팅';

			console.log(this.room_name);
			if ('' === this.room_name) {
				alert('방 제목을 입력해 주십시요.');
				return;
			} else {
				// var params = new URLSearchParams();
				// params.append('name', this.room_name);
				// params.append('sellUserId', { id: sellUserId });
				const obj = {
					name: this.room_name,
					sellUserId: {
						id: sellUserId,
					},
					boardId: {
						id: boardId,
					},
				};

				axios
					.post(WAS_URL + '/chat/room', obj, {
						headers: {
							token: localStorage.getItem('jwt'),
						},
					})
					.then((response) => {
						if (confirm('해당 게시물의 회원과 채팅하시겠습니까?')) {
							alert(response.data.name + '방 개설에 성공하였습니다.');
							this.room_name = '';
							this.$router.push({ name: 'ChatRoom' });
						}
					})
					.catch((response) => {
						alert('채팅방 개설에 실패하였습니다.');
					});
			}
		},
		...mapActions({
			_getListDetail: 'users/getListDetail',
			userTokenValid2: 'auth/userTokenValid2',
			getlistUsersBoardsData: 'users/getlistUsersBoardsData',
			likeAddDelete2: 'auth/likeAddDelete2',
		}),
	},
};
</script>
