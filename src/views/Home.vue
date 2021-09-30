<template>
	<div>
		<v-container v-if="listData" three-line>
			<v-row class="mt-16">
				<v-col
					v-for="(item, i) in listData"
					:key="`item-${i}`"
					cols="12"
					sm="4"
				>
					<div>
						<v-hover v-slot="{ hover }">
							<v-card class="ma-2" max-width="344">
								<div @click="detailPush(item.id)">
									<div style="text-align : left; color : #fc9942">
										<v-icon class="pr-2 pl-2" title="카테고리" color="#fc9942">
											mdi-tag
										</v-icon>
										{{ item.categoryId.subCategoryId.name }} >
										{{ item.categoryId.name }}
									</div>
									<v-img
										v-bind:src="item.thumbnail"
										:aspect-ratio="11 / 8"
										height="mx-auto"
									>
										<v-expand-transition>
											<div
												v-if="hover"
												class="d-flex transition-fast-in-fast-out orange 
												lighten-2 darken-2 v-card--reveal display-3 white--text"
												style="height: 100%;"
											></div>
										</v-expand-transition>
									</v-img>

									<v-card-text class="pa-1" style="position: relative;">
										<v-card-text
											style="border-bottom:solid; border-width:0.5px; border-color: #cccccc;"
											><div style="height: 56px; width: 100% ">
												<div style="width: 50%; float: left; ">
													<div>
														<v-list-item-avatar>
															<v-img v-bind:src="item.userId.imagePath"></v-img>
														</v-list-item-avatar>

														{{ item.userId.nickName }}
													</div>
												</div>
												<div
													v-if="item.status == 0"
													class="light-blue--text"
													style="margin-left: 50%; text-align: right;"
													title="판매중"
												>
													{{ item.status | tradeStatus }}
													<v-icon
														v-if="item.grade == 0"
														color="#ff0008"
														title="새상품"
													>
														mdi-new-box
													</v-icon>
													<v-icon
														v-if="item.grade == 1"
														color="#fc0558"
														title="S급"
													>
														mdi-alpha-s-box
													</v-icon>
													<v-icon
														v-else-if="item.grade == 2"
														color="#e39a07"
														title="A급"
													>
														mdi-alpha-a-box
													</v-icon>
													<v-icon
														v-else-if="item.grade == 3"
														color="#a6a5a2"
														title="B급"
													>
														mdi-alpha-b-box
													</v-icon>
												</div>
												<div
													v-else-if="item.status == 1"
													class="orange--text"
													style="margin-left: 50%; text-align: right;"
													title=""
												>
													{{ item.status | tradeStatus }}
													<v-icon
														v-if="item.grade == 0"
														color="#ff0008"
														title="새상품"
													>
														mdi-new-box
													</v-icon>
													<v-icon
														v-if="item.grade == 1"
														color="#fc0558"
														title="S급"
													>
														mdi-alpha-s-box
													</v-icon>
													<v-icon
														v-else-if="item.grade == 2"
														color="#e39a07"
														title="A급"
													>
														mdi-alpha-a-box
													</v-icon>
													<v-icon
														v-else-if="item.grade == 3"
														color="#a6a5a2"
														title="B급"
													>
														mdi-alpha-b-box
													</v-icon>
												</div>
												<div
													v-else-if="item.status == 2"
													class="gray--text"
													style="margin-left: 50%; text-align: right;"
													title=""
												>
													{{ item.status | tradeStatus }}
													<v-icon
														v-if="item.grade == 0"
														color="#ff0008"
														title="새상품"
													>
														mdi-new-box
													</v-icon>
													<v-icon
														v-if="item.grade == 1"
														color="#fc0558"
														title="S급"
													>
														mdi-alpha-s-box
													</v-icon>
													<v-icon
														v-else-if="item.grade == 2"
														color="#e39a07"
														title="A급"
													>
														mdi-alpha-a-box
													</v-icon>
													<v-icon
														v-else-if="item.grade == 3"
														color="#a6a5a2"
														title="B급"
													>
														mdi-alpha-b-box
													</v-icon>
												</div>
											</div>
										</v-card-text>
										<v-card-text class="mt-2 pa-3">
											<div
												class="font-weight-medium"
												style="font-size:x-large; font-weight:bold"
											>
												{{ item.title }}
											</div>
										</v-card-text>
										<v-card-text class="pa-3">
											<div
												class="font-weight-medium float-right "
												style="font-size:large;"
											>
												{{ item.price | moneyFilter }} 원
											</div>
										</v-card-text>

										<v-card-text class="mt-2 pa-3">
											<div style="width: 100%;">
												<div style="width: 20%; float: left">
													{{ item.createAt | timeForToday }}
												</div>
												<div style="margin-left: 20%; text-align: right">
													<v-icon color="green">
														mdi-comment-text-multiple
													</v-icon>
													{{ item.commentCount }}
													<v-icon color="red">
														mdi-heart
													</v-icon>
													{{ item.likeCount }}
													<v-icon color="blue">
														mdi-eye-outline
													</v-icon>
													{{ item.views }}
													<v-icon color="yellow">
														mdi-chat-processing
													</v-icon>
													{{ item.chatCount }}
												</div>
											</div>
										</v-card-text>
									</v-card-text>
								</div>
							</v-card>
						</v-hover>
					</div>
				</v-col>
			</v-row>
		</v-container>
		<infinite-loading
			@infinite="infiniteHandler"
			spinner="waveDots"
			forceUseInfiniteWrapper
			><div slot="no-more" class="ma-10">
				더이상 게시물이 존재하지 않습니다.
			</div>
			<div slot="no-results" class="ma-10">
				존재 하지 않습니다.
			</div></infinite-loading
		>
		<br />
		<br />
		<br />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import http from '@/utils/http';
import Formatter from '@/mixin/Formatter';

export default {
	created() {
		console.log('게시물 불러오기 시작!');
	},
	mixins: [Formatter],
	data() {
		return {
			limit: 1,
			listData: [],
		};
	},
	components: {
		InfiniteLoading,
	},
	computed: {
		...mapState({
			isLogin: (state) => state.auth.isLogin,
			isLoginError: (state) => state.auth.isLoginError,
			userInfo: (state) => state.auth.userInfo,
			profileImg: (state) => state.auth.profileImg,
			jwt: (state) => state.auth.jwt,
		}),
	},

	mounted() {
		this.init();
	},
	methods: {
		infiniteHandler($state) {
			http
				.process('boards', 'listPagenation', {
					limit: this.limit,
				})
				.then((res) => {
					setTimeout(() => {
						if (res.boardResponseDtoList.length) {
							this.listData = this.listData.concat(res.boardResponseDtoList);
							$state.loaded();
							this.limit += 1;
						} else {
							$state.complete();
							/*alert("더 이상 목록이 존재하지 않습니다.")*/
						}
					}, 500);
				})
				.catch((err) => {
					console.log(err);
				});
		},

		init() {
			console.log('home init...');
		},

		detailPush(id) {
			this.$router.push({ name: 'BoardDetail', params: { id: id } });
		},
		...mapActions({
			_getList: 'users/getList',
		}),
	},
};
</script>
<style>
.v-card--reveal {
	align-items: center;
	bottom: 0;
	justify-content: center;
	opacity: 0.5;
	position: absolute;
	width: 100%;
}
</style>
