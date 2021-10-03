<template>
	<v-app>
		<div>
			<v-app-bar
				flat
				color="orange accent-4"
				height="70"
				class="fixed-bar "
				fixed
			>
				<!-- <v-toolbar-title>
					<v-btn icon @click="$router.go(-1)">
						<v-icon size="xx-large" color="white">mdi-arrow-left</v-icon>
					</v-btn>
				</v-toolbar-title> -->

				<v-toolbar-title class="ma-2">
					<a
						href="/"
						style="text-decoration-line:none ; color:white; font-size : x-large "
					>
						User Traders
					</a>
				</v-toolbar-title>

				<v-spacer></v-spacer>

				<div v-if="jwt">
					<v-btn
						style="background-color:white"
						class="mr-2"
						icon
						:to="{ name: 'UserLike' }"
						align-center
					>
						<v-avatar size="45px">
							<v-icon size="xx-large" color="red">
								mdi-heart
							</v-icon>
						</v-avatar>
					</v-btn>
				</div>

				<div v-if="!jwt">
					<v-menu bottom left>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								dark
								icon
								v-bind="attrs"
								v-on="on"
								align-center
								style="border:solid; border-width:2px; border-color: white;"
							>
								<v-icon size="xx-large" color="white">mdi-account-alert</v-icon>
							</v-btn>
						</template>

						<v-list dense nav>
							<v-list-item
								:to="{ name: 'UserLogin' }"
								active-class="deep-orange--text text--accent-3"
							>
								<v-list-item-content>
									<v-list-item-title
										align-center
										justify-center
										style="font-size : medium; text-align : center"
									>
										로그인
										<v-icon dense align-content-center>mdi-login</v-icon>
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>

							<v-list-item
								:to="{ name: 'SignUp' }"
								active-class="deep-orange--text text--accent-3"
							>
								<v-list-item-content>
									<v-list-item-title
										align-center
										justify-center
										style="font-size : medium; text-align : center"
									>
										회원가입
										<v-icon dense align-content-center>mdi-account-plus</v-icon>
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item
								id="kakao-talk-channel-add-button"
								data-channel-public-id="_paeus"
								data-size="small"
								data-support-multiple-densities="true"
							>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
				<div v-else>
					<v-menu bottom left>
						<template v-slot:activator="{ on, attrs }">
							<v-btn dark icon v-bind="attrs" v-on="on" align-center>
								<v-avatar size="45px">
									<img v-bind:src="profileImg" />
									<v-icon></v-icon>
								</v-avatar>
							</v-btn>
						</template>
						<v-list dense nav>
							<v-list-item
								active-class="deep-gray--text text--accent-3"
								style="cursor : pointer"
								:to="{ name: 'Profile' }"
							>
								<v-list-item-content>
									<v-list-item-title
										align-center
										style="font-size : medium; text-align : center"
										>내 정보<v-icon dense align-content-center class="ml-1"
											>mdi-information</v-icon
										>
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>

							<v-list-item
								active-class="deep-gray--text text--accent-3"
								style="cursor : pointer"
							>
								<v-list-item-content>
									<v-list-item-title
										align-center
										@click="userLogout"
										style="font-size : medium; text-align : center"
										>로그아웃<v-icon dense align-content-center
											>mdi-logout</v-icon
										>
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
			</v-app-bar>
		</div>
		<v-spacer></v-spacer>
		<v-main>
			<router-view></router-view>
		</v-main>
		<v-bottom-navigation height="60" style="" color="#ff6d00" fixed>
			<v-btn :to="{ name: 'Home' }">
				<span style="color : #00000099; font-size : medium">홈</span>
				<v-icon large>mdi-home</v-icon>
			</v-btn>
			<div v-if="jwt">
				<v-btn>
					<span style="color : #00000099;  font-size : medium">채팅</span>
					<v-icon large color="yellow">mdi-chat</v-icon>
				</v-btn>
			</div>

			<div v-if="jwt">
				<v-btn :to="{ name: 'Create' }">
					<span style="color : #00000099; font-size : medium">중고거래</span>
					<v-icon large color="blue">mdi-plus-circle-outline</v-icon>
				</v-btn>
			</div>
			<v-btn :to="{ name: 'Search' }">
				<span style="color : #00000099; font-size : medium">검색</span>
				<v-icon large color="green">mdi-shopping-search</v-icon>
			</v-btn>
			<!-- <div v-if="loginflag">
				<v-btn @click="overlay = !overlay">
					<span style="color : #00000099; font-size : medium">카카오톡</span>
					<v-icon large color="blue">mdi-plus-circle-outline</v-icon></v-btn
				>
				<v-overlay :absolute="absolute" :value="overlay">
					<v-btn color="success" @click="overlay = false">
						Hide Overlay
					</v-btn>
				</v-overlay>
			</div> -->
		</v-bottom-navigation>
	</v-app>
</template>

<script>
// window.kakaoAsyncInit = function() {
// 	Kakao.Channel.createAddChannelButton({
// 		container: '#kakao-talk-channel-add-button',
// 	});
// };

// (function(d, s, id) {
// 	var js,
// 		fjs = d.getElementsByTagName(s)[0];
// 	if (d.getElementById(id)) return;
// 	js = d.createElement(s);
// 	js.id = id;
// 	js.src = 'https://developers.kakao.com/sdk/js/kakao.channel.min.js';
// 	fjs.parentNode.insertBefore(js, fjs);
// })(document, 'script', 'kakao-js-sdk');

import { mapState, mapActions } from 'vuex';

export default {
	data: () => ({
		overlay: false,
		openMenu: false,
	}),

	computed: {
		...mapState({
			isLogin: (state) => state.auth.isLogin,
			isLoginError: (state) => state.auth.isLoginError,
			userInfo: (state) => state.auth.userInfo,
			profileImg: (state) => state.auth.profileImg,
			jwt: (state) => state.auth.jwt,
		}),
	},
	mounted() {},
	methods: {
		...mapActions({
			getUserLogout: 'auth/getUserLogout',
			postUserLogin: 'auth/postUserLogin',
		}),
		userLogout() {
			const jwt = localStorage.getItem('jwt');
			this.getUserLogout(jwt).then(() => {
				localStorage.removeItem('user');
				localStorage.removeItem('jwt');
				this.$router.push({ name: 'UserLogin' });
			});
		},
	},
};
</script>
<style scoped>
.fixed-bar {
	position: sticky;
	position: -webkit-sticky; /* for Safari */
	top: 6em;
	z-index: 2;
}
</style>
