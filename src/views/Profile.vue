<template>
	<div>
		<v-container>
			<v-row justify="center" class="mt-16">
				<v-expansion-panels popout>
					<v-expansion-panel
						v-for="(message, i) in messages"
						:key="i"
						hide-actions
					>
						<div v-if="i == 0">
							<v-expansion-panel-header>
								<v-row align="center" class="spacer" no-gutters>
									<v-col cols="4" sm="2" md="1">
										<v-avatar size="36px">
											<img
												v-if="message.avatar"
												alt="Avatar"
												v-bind:src="userInfo.imagePath"
											/>
											<!-- <v-icon
												v-else
												:color="message.color"
												v-text="message.icon"
											></v-icon> -->
										</v-avatar>
									</v-col>
									<v-col class="text-no-wrap" cols="5" sm="3">
										<!-- <v-chip
											v-if="message.new"
											:color="`${message.color} lighten-4`"
											class="ml-0 mr-2 black--text"
											label
											small
										>
											{{ message.new }} new
										</v-chip> -->
										<strong>내 정보</strong>
									</v-col>
								</v-row>
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<v-divider></v-divider>
								<v-row>
									<v-list-item three-line>
										<v-list-item-content>
											<div class="overline mb-4">
												email : {{ userInfo.email | stringLowerFormate }}
											</div>
											<div class="overline mb-4">
												닉네임 : {{ userInfo.nickname }}
											</div>
											<div class="overline mb-4">
												이름 : {{ userInfo.userNamed }}
											</div>
											<div class="overline mb-4">
												가입일 : {{ userInfo.createAt | timeFormate }}
											</div>
											<div class="overline mb-4">TEL : {{ userInfo.tel }}</div>
											<div class="overline mb-4">학과 : {{ department }}</div>
											<div class="overline mb-4">성별 : {{ gender }}</div>
										</v-list-item-content>
									</v-list-item>

									<v-card-actions>
										<v-btn outlined rounded text>
											회원정보 수정
										</v-btn>
										<v-btn outlined rounded text>
											회원 탈퇴
										</v-btn>
									</v-card-actions>
								</v-row>
							</v-expansion-panel-content>
						</div>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-row>

			<v-row justify="center" class="mb-13">
				<v-expansion-panels popout>
					<v-expansion-panel
						v-for="(message, i) in messages"
						:key="i"
						hide-actions
					>
						<div v-if="i == 0">
							<v-expansion-panel-header>
								<v-row align="center" class="spacer" no-gutters>
									<v-col cols="4" sm="2" md="1">
										<v-avatar size="36px">
											<img
												v-if="message.avatar"
												alt="Avatar"
												v-bind:src="userInfo.imagePath"
											/>
											<!-- <v-icon
												v-else
												:color="message.color"
												v-text="message.icon"
											></v-icon> -->
										</v-avatar>
									</v-col>
									<v-col class="text-no-wrap" cols="5" sm="3">
										<!-- <v-chip
											v-if="message.new"
											:color="`${message.color} lighten-4`"
											class="ml-0 mr-2 black--text"
											label
											small
										>
											{{ message.new }} new
										</v-chip> -->
										<strong>내 거래 목록</strong>
									</v-col>
									<v-col class="grey--text text-truncate hidden-sm-and-down">
										총 {{ userBList.length }} 개의 게시물
									</v-col>
								</v-row>
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<v-divider></v-divider>
								<v-row>
									<v-col
										v-for="(item, i) in userBList"
										:key="`item-${i}`"
										cols="12"
										sm="4"
									>
										<v-card class="mx-auto" max-width="344" outlined>
											<v-list-item three-line>
												<div style="display:flex; flex-direction:row">
													<div>
														<v-list-item-avatar tile size="120" color="grey">
															<v-img v-bind:src="item.thumbnail"> </v-img>
														</v-list-item-avatar>
													</div>
													<div>
														<v-list-item-content>
															<div class="overline mb-4">
																{{ item.modifiedAt | timeForToday }}
															</div>
															<div class="overline mb-4">
																거래 상태 : {{ item.status | tradeStatus }}
															</div>
															<div class="overline mb-4">
																{{ item.categoryId.subCategoryId.name }} >
																{{ item.categoryId.name }}
															</div>
														</v-list-item-content>
													</div>
												</div>
											</v-list-item>
											<v-list-item
												><div>
													<v-list-item-title class="headline mb-1">
														{{ item.title }}
													</v-list-item-title>
												</div></v-list-item
											>
											<v-list-item
												><div style="display:flex;flex-direction:row">
													<v-list-item-subtitle class="mr-10"
														>{{ item.price | moneyFilter }} 원
													</v-list-item-subtitle>
													<v-card-actions class="ml-16">
														<v-btn outlined rounded text color="orange">
															상세보기
														</v-btn>
														<v-btn outlined rounded text color="orange">
															수정하기
														</v-btn>
													</v-card-actions>
												</div></v-list-item
											>
										</v-card>
									</v-col>
								</v-row>
							</v-expansion-panel-content>
						</div>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-row>
		</v-container>
	</div>
</template>
<script>
import http from '@/utils/http';
import Formatter from '@/mixin/Formatter';
import { mapActions } from 'vuex';
export default {
	mixins: [Formatter],
	data() {
		return {
			userBList: [],
			userInfo: {},

			messages: [
				{
					avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
					title: 'Welcome to UserTraders!',
				},
			],
			department: '',
			gender: '',
			token: '',
		};
	},
	mounted() {
		console.log('profile init .....');

		let jwt = localStorage.getItem('jwt');
		if (!localStorage.getItem('jwt')) {
			jwt = '';
		}
		this.$store.dispatch('auth/userTokenValid2', jwt);
		if (localStorage.getItem('jwt')) {
			this.myBoardList(jwt);
			// this.userInfoList(jwt);
			this.userInfoList(jwt);

			this.token = localStorage.getItem('jwt');
		}
	},

	methods: {
		myBoardList(token) {
			return http
				.process('boards', 'myboard', null, { token: token })
				.then((res) => {
					this.userBList = res.boardResponseDtoList;
					console.log(this.userBList);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		userInfoList(token) {
			return http
				.process('user', 'userInfo', null, { token: token })
				.then((res) => {
					console.log(res);
					this.userInfo = res;
					this.department = res.departmentId.name;
					if (res.gender == 0) {
						this.gender = '남성';
					} else {
						this.gender = '여성';
					}
				})
				.catch((err) => {
					console.log(err);
					if (
						err.message === '로그인 되지 않았습니다. 로그인 해주세요.' ||
						err.message === '유저정보가 없습니다.'
					) {
						alert(err.message);
						this.getUserLogout().then(() => {
							this.isLoading = false;
							localStorage.removeItem('user');

							this.$router.push({ name: 'Home' });
						});
						this.$router.push(this.$route.query.redirect || '/user/login');
					}
				});
		},
		...mapActions({
			getUserLogout: 'auth/getUserLogout',
		}),
	},
};
</script>
