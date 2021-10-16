<template>
	<div>
		<!-- 제목검색 -->
		<div class="pt-16">
			<v-toolbar class=" pb-16  " color="white">
				<v-text-field
					label="search"
					hide-details
					single-line
					v-model="keyword"
					@keyup.enter="titleSearch"
					color="orange"
					text
				></v-text-field>
				<div style="display:flex; flex-direction:column">
					<v-btn icon @click="titleSearch">
						<v-icon color>mdi-magnify</v-icon>
					</v-btn>
					<span style="font-size:10px; text-align : center">검색</span>
				</div>
				<div style="display:flex; flex-direction:column">
					<v-btn icon @click="categorySearch">
						<v-icon v-if="iswhat == 1" color="green">mdi-shopping</v-icon>
						<v-icon v-if="iswhat == 0" color="">mdi-shopping</v-icon>
					</v-btn>
					<span style="font-size:10px; text-align : center">카테고리</span>
				</div>
			</v-toolbar>
		</div>
		<!-- 서브 카테고리 오버레이 -->
		<v-overlay class="mt-16 mb-16" :absolute="absolute" :value="overlay">
			<v-btn
				class="ml-3 mb-2"
				color="blue"
				@click="
					() => {
						overlay = !overlay;
					}
				"
				>나가기</v-btn
			>
			<v-col v-for="(item, i) in listCategory" :key="`item-${i}`" cols="auto">
				<v-btn color="orange" @click="searchCategory2(item.id)"
					>{{ item.name }}
				</v-btn>
			</v-col>
		</v-overlay>
		<!-- 카테고리 -->
		<div v-if="iswhat == 1" class="" style="text-align:center;">
			<v-card class="d-flex justify-space-around mb-6" flat>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(1)">
						<v-icon color="green"> mdi-book-open-page-variant-outline</v-icon>
					</v-btn>
					<v-card-text>도서</v-card-text>
				</v-card>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(2)">
						<v-icon color="#FDD835">mdi-hanger</v-icon>
					</v-btn>
					<v-card-text>의류</v-card-text>
				</v-card>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(3)">
						<v-icon color="#F48FB1">mdi-paw</v-icon>
					</v-btn>
					<v-card-text>반려동물</v-card-text>
				</v-card>
			</v-card>
			<v-card class="d-flex justify-space-around mb-6" flat>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(4)">
						<v-icon color="#D500F9">mdi-television-classic</v-icon>
					</v-btn>
					<v-card-text>가전제품</v-card-text>
				</v-card>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(5)">
						<v-icon color="#6D4C41">mdi-sofa-single</v-icon>
					</v-btn>
					<v-card-text>가구</v-card-text>
				</v-card>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(6)">
						<v-icon color="#78909C">mdi-storefront-outline</v-icon>
					</v-btn>
					<v-card-text>주방</v-card-text>
				</v-card>
			</v-card>
			<v-card class="d-flex justify-space-around mb-6" flat>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(7)">
						<v-icon color="#1E88E5">mdi-gamepad-variant</v-icon>
					</v-btn>
					<v-card-text>취미/티켓</v-card-text>
				</v-card>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(8)">
						<v-icon color="black">mdi-dumbbell</v-icon>
					</v-btn>
					<v-card-text>스포츠</v-card-text>
				</v-card>
				<v-card class="pa-2" tile flat>
					<v-btn color="white" fab x-large dark @click="searchCategory(9)">
						<v-icon color="#D32F2F">mdi-lipstick</v-icon>
					</v-btn>
					<v-card-text>뷰티/미용</v-card-text>
				</v-card>
			</v-card>
		</div>
		<!-- 검색결과 -->
		<div>
			<div v-if="listData">
				<h2 v-if="isSearch" style="text-align: center">
					<span style="color: cornflowerblue ;font-weight: bold">{{
						searchKeyword
					}}</span>
					에 대한 검색 결과
					<span style="color: cornflowerblue ;font-weight: bold"
						>{{ listData.length }}
					</span>
					건
				</h2>
			</div>
			<h2 v-if="listData == null">
				<h2 style="text-align: center">
					<span style="color: cornflowerblue ;font-weight: bold"
						>해당 카테고리</span
					>
					에 대한 검색 결과
					<span style="color: cornflowerblue ;font-weight: bold">0</span>
					건
				</h2>
			</h2>
			<v-container v-if="listData" three-line>
				<v-row class="">
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
										<div>
											<v-card-text
												style="border-bottom:solid; border-width:0.5px; border-color: #cccccc;"
												><div style="height: 56px; width: 100% ">
													<div style="width: 50%; float: left; ">
														<div>
															<v-list-item-avatar>
																<v-img
																	v-bind:src="item.userId.imagePath"
																></v-img>
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
										</div>
										<v-card-text class="pa-1" style="position: relative;">
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
													{{ item.price || moneyFilter }} 원
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
		</div>

		<br />
		<br />
		<br />
	</div>
</template>

<script>
import Formatter from '@/mixin/Formatter';
import http from '@/utils/http';
export default {
	mixins: [Formatter],
	data() {
		return {
			isLoading: false,
			listData: [],
			listCategory: [],
			searchKeyword: '',
			keyword: '',
			iswhat: 0,
			isSearch: false,
			subCategoryId: 0,
			catagoryId: 0,
			absolute: true,
			overlay: false,
		};
	},
	computed: {},
	methods: {
		detailPush(id) {
			this.$router.push({ name: 'BoardDetail', params: { id: id } });
		},
		searchCategory(id) {
			this.subCategoryId = id;
			this.overlay = true;
			return http
				.process('boards', 'categorySub', {
					subCategoryId: this.subCategoryId,
				})
				.then((res) => {
					this.listCategory = res.boardCategoryDtoList;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		searchCategory2(id) {
			this.overlay = false;
			this.iswhat = 0;
			return http
				.process('boards', 'categorySearch', {
					categoryId: id,
					subCategoryId: this.subCategoryId,
				})
				.then((res) => {
					console.log(res);
					if (res.boardResponseDtoList.length == 0) {
						this.listData = null;
					} else {
						this.listData = res.boardResponseDtoList;

						this.searchKeyword = '해당 카테고리';

						this.isSearch = true;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		titleSearch() {
			return http
				.process('boards', 'keywordSearch', { keyword: this.keyword })
				.then((res) => {
					this.listData = res.boardResponseDtoList;
					this.searchKeyword = this.keyword;
					this.isSearch = true;
					this.iswhat = 0;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		categorySearch() {
			if (this.iswhat == 0) {
				this.iswhat = 1;
			} else {
				this.iswhat = 0;
			}
		},
	},
};
</script>
