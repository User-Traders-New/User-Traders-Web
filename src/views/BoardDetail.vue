<template>
	<div class="mt-16">
		<loding v-if="isLoading" />
		<div v-if="listDataDeatail">
			<v-row class="fill-height mt-5 mb-16" align="center" justify="center">
				<v-card class="pa-2" tile flat>
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
					<div
						style="border-bottom:solid; border-width:0.5px; border-color: #cccccc;"
					>
						<v-card-text>
							<div style="height: 56px; width: 100% ">
								<div style="width: 50%; float: left; ">
									<div>
										<v-list-item-avatar>
											<v-img
												v-if="listDataDeatail.userId.imagePath"
												v-bind:src="listDataDeatail.userId.imagePath"
											></v-img>
										</v-list-item-avatar>

										{{ listDataDeatail.userId.nickName }}
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
								<div class="font-weight-medium" style="font-size:large;">
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
					<div
						style="border-bottom:solid; border-width:0.5px; border-color: #cccccc;"
					>
						<v-card-text class="mt-2 pa-3">
							<div style="width: 100%;">
								<div style="width: 20%; float: left">
									댓글 더보기
								</div>
								<div style="margin-left: 20%; text-align: right">
									<v-icon color="green">
										mdi-comment-text-multiple
									</v-icon>
									{{ listDataDeatail.commentCount }}
									<v-icon color="red">
										mdi-heart
									</v-icon>
									{{ listDataDeatail.likeCount }}
									<v-icon color="blue">
										mdi-eye-outline
									</v-icon>
									{{ listDataDeatail.views }}
									<v-icon color="yellow">
										mdi-chat-processing
									</v-icon>
									{{ listDataDeatail.chatCount }}
								</div>
							</div>
						</v-card-text>
						<v-card-text class="mt-2 pa-3">
							<div style="display:flex ;  flex-direction:column">
								<div style="display:flex ;  flex-direction:row;">
									<div class="mr-2">
										{{ listDataDeatail.boardParentComment[0].userId.nickName }}
									</div>
									<div>{{ listDataDeatail.boardParentComment[0].comment }}</div>
								</div>

								<div style="display:flex ;  flex-direction:row;">
									<div class="mr-2">
										{{ listDataDeatail.boardParentComment[1].userId.nickName }}
									</div>
									<div>{{ listDataDeatail.boardParentComment[1].comment }}</div>
								</div>
							</div>
						</v-card-text>
					</div>
					<div class="ml-8">
						<div style="display:flex;flex-direction:row">
							<v-form>
								<v-text-field
									autocomplete="off"
									label="댓글"
									prepend-icon="mdi-comment-text-multiple"
									required
								></v-text-field>
							</v-form>
							<v-card-actions>
								<v-btn small style="" class="rounded-pill">보내기</v-btn>
							</v-card-actions>
						</div>
					</div>
					<div>
						<div class="ml-10">
							<v-btn
								color="#F0F0E6"
								class="ma-2 orange--text pa-5"
								@click="cartAdd(listDataDeatail.id)"
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
							<v-btn
								color="orange"
								class="ma-2 white--text pa-5"
								@click="messageSend"
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
				</v-card>
			</v-row>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Loading from './loding.vue';
import Formatter from '@/mixin/Formatter';

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
			boardParentComment: [],
		};
	},

	computed: {
		...mapState({
			listDataDeatail: (state) => state.users.listDataDeatail,
			detailImageurl: (state) => state.users.detailImageurl,
		}),
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			console.log('detail init...');
			this.getListDetail(this.id);
			this.token = localStorage.getItem('user');
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
		messageSend() {
			this.$router.push({
				name: 'MailWrite',
				params: {
					id: this.listDataDeatail.user.id,
					email: this.listDataDeatail.user.username,
				},
			});
		},
		// cartAdd(id) {
		// 	return http
		// 		.process('cart', 'register', { boardId: id }, { token: this.token })
		// 		.then((res) => {
		// 			console.log(res);
		// 			this.$router.push({ name: 'Cart' });
		// 		})
		// 		.catch((err) => {
		// 			if (err.message === '로그인 되지 않았습니다. 로그인 해주세요.') {
		// 				alert(err.message);
		// 				this.$router.push(this.$route.query.redirect || '/user/login');
		// 			}
		// 			if (
		// 				err.message === '나의 게시물은 장바구니에 담을 수 없습니다.' ||
		// 				err.message === '중복된 게시물은 장바구니에 담을 수 없습니다.'
		// 			) {
		// 				alert(err.message);
		// 				this.$router.push(this.$route.query.redirect || '/detail/' + id);
		// 			}
		// 		});
		// },
		// likeAdd(id) {
		// 	return http
		// 		.process('like', 'register', { boardId: id }, { token: this.token })
		// 		.then((res) => {
		// 			console.log(res);
		// 			this.init();
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 			alert('로그인 후 이용해 주세요');
		// 			this.$router.push({ name: 'UserLogin' });
		// 		});
		// },
		...mapActions({
			_getListDetail: 'users/getListDetail',
		}),
	},
};
</script>
