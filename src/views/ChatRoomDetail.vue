<template>
	<div class="container" id="app" v-cloak>
		<br />
		<br />
		<br />
		<v-card
			width="600px"
			height="mx-auto"
			class="mx-auto "
			style="margin-bottom : 80px"
		>
			<v-card-title>
				<div style="display:flex;flex-direction:row;">
					<v-icon color="yellow" class="ml-2">
						mdi-chat-processing
					</v-icon>
					<div class="ml-2">
						<h4>{{ roomName }}</h4>
					</div>
					<!-- <div class="ml-2" style="font-size:9px">
						[↓ 날짜순 ↓]
					</div> -->
					<div v-if="userCount">
						<span class="ml-1" style="	font-size:11px; color:red; float:right">
							{{ userCount == 2 ? '상대방 입장중' : '상대방 퇴장중' }}</span
						>
					</div>
					<div v-else></div>
				</div>
			</v-card-title>

			<!-- <ul class="list-group">
				<li
					class="list-group-item"
					v-for="message in messages"
					v-bind:key="message.id"
				>
					{{ message.sender }} - {{ message.message }}
				</li>
			</ul> -->

			<div class="" v-for="(message, index) in messages" v-bind:key="index">
				<v-list-item
					class=""
					v-if="nickname == message.sender"
					style="display: flex; justify-content: right; align-items: right;"
				>
					<div
						class="pl-2 pr-2 pt-2 pb-2"
						style=" border-radius: 15px; background-color :  #fff333; display: flex;flex-direction:row;"
					>
						<div>
							<v-list-item-title>{{ message.message }}</v-list-item-title>
						</div>
						<div
							class="ml-2"
							style="font-size:8px; display: flex; justify-content: center; align-items: center;"
						>
							{{ message.createAt | timeForToday }}
						</div>
					</div>
				</v-list-item>

				<v-list-item
					v-else-if="basicNickname == message.sender"
					style="
					display: flex; justify-content: center; align-items: center;"
				>
					<div
						class="pl-2 pr-2 pt-2 pb-2"
						style=" border-radius: 15px;background-color :#ffffff; display: flex; flex-direction:row;"
					>
						<div class="mr-2">
							<span>{{ message.sender }}</span>
						</div>
						<div>
							<v-list-item-title>{{ message.message }}</v-list-item-title>
						</div>
					</div>
				</v-list-item>

				<v-list-item
					v-else
					style="
					display: flex; justify-content: left; align-items: left;"
				>
					<div
						class="pl-2 pr-2 pt-2 pb-2"
						style="border-radius: 15px;background-color : #e1faf3 ; display: flex;  flex-direction:row;"
					>
						<div class="mr-2">
							<span>{{ message.sender }}</span>
						</div>
						<div>
							<v-list-item-title>{{ message.message }}</v-list-item-title>
						</div>
						<div
							class="ml-2"
							style="font-size:8px; display: flex; justify-content: center; align-items: center;"
						>
							{{ message.createAt | timeForToday }}
						</div>
					</div>
				</v-list-item>
				<v-divider inset></v-divider>
			</div>
		</v-card>
		<div style="display: flex; justify-content: center; align-items: center;">
			<v-bottom-navigation
				class="mb-16"
				height="80"
				style="display: flex; justify-content: center; align-items: center;"
				color="#ff6d00"
				fixed
			>
				<div
					class="mr-2 ml-2 mt-2 mb-2"
					fixed
					style="display:flex;flex-direction:row; "
				>
					<v-text-field
						v-model="message"
						counter="50"
						autocomplete="off"
						label="채팅"
						prepend-icon="mdi-chat-processing"
						@keyup.enter="sendMessage('TALK')"
						style="display: flex; justify-content: center; align-items: center;"
					></v-text-field>

					<v-card-actions
						@click="sendMessage('TALK')"
						style="display: flex; justify-content: center; align-items: center;"
					>
						<v-btn color="yellow" small style="" class="rounded-pill"
							>보내기</v-btn
						>
					</v-card-actions>
				</div>
			</v-bottom-navigation>
		</div>

		<br />
		<br />
		<br />
	</div>
</template>

<!-- JavaScript -->
<script th:src="@{/webjars/sockjs-client/1.1.2/sockjs.min.js}"></script>
<script th:src="@{/webjars/stomp-websocket/2.3.3-1/stomp.min.js}"></script>
<script>
import axios from 'axios';
import Stomp from 'stomp-websocket';
import SockJS from 'sockjs-client';
import Formatter from '@/mixin/Formatter';
import { mapState, mapActions } from 'vuex';

// var reconnect = 0;
const WAS_URL = process.env.VUE_APP_WAS;
let socket = new SockJS(WAS_URL + '/ws-stomp');
let ws = Stomp.over(socket);

export default {
	// websocket & stomp initialize
	mixins: [Formatter],
	// vue.js
	data() {
		return {
			roomId: '',
			roomName: '',
			userId: '',
			message: '',
			messages: [],
			token: '',
			nickname: '',
			userCount: 0,
			connected: null,
			messageCount: 0,
			basicNickname: '[알림]',
		};
	},
	computed: {
		// ...mapState({
		// 	isLogin: (state) => state.auth.isLogin,
		// 	isLoginError: (state) => state.auth.isLoginError,
		// 	userInfo: (state) => state.auth.userInfo,
		// 	profileImg: (state) => state.auth.profileImg,
		// 	jwt: (state) => state.auth.jwt,
		// 	likeCount: (state) => state.auth.likeCount,
		// }),
	},
	// watch: {
	// 	$route: {
	// 		handler() {
	// 			this.findAllMessage2();
	// 			this.connect();
	// 			this.findAllMessage2();
	// 		},
	// 	},
	// },
	// async updated() {
	// 	await this.findAllMessage2();
	// 	await this.connect();
	// 	await this.findAllMessage2();
	// },

	async mounted() {
		this.roomId = localStorage.getItem('wschat.roomId');
		this.roomName = localStorage.getItem('wschat.roomName');
		this.userId = localStorage.getItem('loginUserId');
		this.token = localStorage.getItem('jwt');
		await this.findAllMessage2();
		await this.connect();
		await this.findAllMessage2();
	},

	async created() {
		this.roomId = localStorage.getItem('wschat.roomId');
		this.roomName = localStorage.getItem('wschat.roomName');
		this.userId = localStorage.getItem('loginUserId');
		this.token = localStorage.getItem('jwt');
		this.nickname = localStorage.getItem('nicname');
		var _this = this;
		await this.findAllMessage2();
		await this.connect();
		await this.findAllMessage2();
		// axios
		// 	.get(WAS_URL + '/chat/user', {
		// 		headers: {
		// 			token: localStorage.getItem('jwt'),
		// 		},
		// 	})
		// 	.then((response) => {
		// 		console.log('ws connect 해보자~');

		// 		ws.connect(
		// 			{ token: localStorage.getItem('jwt') },
		// 			function(frame) {
		// 				console.log('소켓 연결 성공', frame);

		// 				ws.subscribe(
		// 					'/sub/chat/room/' + localStorage.getItem('wschat.roomId'),
		// 					(message) => {
		// 						console.log(message);
		// 						var recv = JSON.parse(message.body);
		// 						_this.recvMessage(recv);
		// 					}
		// 				);
		// 				_this.sendMessage('ENTER');
		// 			},
		// 			function(error) {
		// 				alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');
		// 				// location.href = 'http://localhost:8080/chat/room';
		// 			}
		// 		);
		// 		console.log('ws connect 끝');
		// 	});
	},
	methods: {
		findAllMessage2() {
			let path = localStorage.getItem('wschat.roomId');

			axios.get(WAS_URL + '/chat/room/enter/' + path).then((response) => {
				this.messages = response.data;
			});
		},
		connect() {
			axios
				.get(WAS_URL + '/chat/user', {
					headers: {
						token: localStorage.getItem('jwt'),
					},
				})
				.then((response) => {
					var _this = this;
					ws.connect(
						{ token: localStorage.getItem('jwt') },
						function(frame) {
							console.log('소켓 연결 성공', frame);
							ws.subscribe(
								'/sub/chat/room/' + localStorage.getItem('wschat.roomId'),
								(message) => {
									console.log(message);
									var recv = JSON.parse(message.body);
									console.log('@@@@@@@@@@@@@여기는 리시브 시작지점');
									_this.recvMessage(recv);
								}
							);
							_this.sendMessage('ENTER');
						},
						function(error) {
							alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');

							// location.href = 'http://localhost:8080/chat/room';
						}
					);
					this.findAllMessage2();
				});
		},
		sendMessage: async function(type) {
			ws.send(
				'/pub/chat/message',
				{ token: localStorage.getItem('jwt') },
				JSON.stringify({
					type: type,
					roomId: localStorage.getItem('wschat.roomId'),
					userId: {
						id: localStorage.getItem('loginUserId'),
					},
					message: this.message,
				})
			);
			var recv = {
				type: type,
				sender: localStorage.getItem('nickname'),
				message: this.message,
				userId: {
					id: localStorage.getItem('loginUserId'),
				},
			};
			await this.findAllMessage2();
			await this.recvMessage(recv);
			await this.findAllMessage2();

			this.message = '';
		},

		async recvMessage(recv) {
			// var type2 = '';
			// if (recv.type == 0) {
			// 	type2 = 'ENTER';
			// } else if (recv.type == 1) {
			// 	type2 = 'QUIT';
			// } else {
			// 	type2 = 'TALK';
			// }
			console.log(recv.type);
			console.log('@@리시브 확인');
			this.userCount = recv.userCount;
			// this.messages.unshift({
			// 	type: recv.type,
			// 	sender: recv.sender,
			// 	message: recv.message,
			// 	userId: recv.userId,
			// });
			this.messages.push({
				type: recv.type,
				sender: recv.sender,
				message: recv.message,
				userId: recv.userId,
			});
			this.message = '';
			await this.findAllMessage2();
		},
		// recvMessage: function(recv) {
		// 	console.log('리시브 내놔!!!!!');
		// 	console.log(recv);
		// 	this.userCount = recv.userCount;
		// 	this.messages.unshift({
		// 		type: recv.type,
		// 		sender: recv.sender,
		// 		message: recv.message,
		// 		userId: recv.userId,
		// 	});
		// 	this.findAllMessage2();
		// },
		// init() {
		// 	var _this = this;
		// 	console.log('시작~~~');
		// 	axios
		// 		.get(WAS_URL + '/chat/user', {
		// 			headers: {
		// 				token: localStorage.getItem('jwt'),
		// 			},
		// 		})
		// 		.then((response) => {
		// 			console.log('ws connect 해보자~');

		// 			ws.connect(
		// 				{ token: localStorage.getItem('jwt') },
		// 				function(frame) {
		// 					console.log('소켓 연결 성공', frame);
		// 					ws.subscribe(
		// 						'/sub/chat/room/' + localStorage.getItem('wschat.roomId'),
		// 						(message) => {
		// 							console.log(message);
		// 							var recv = JSON.parse(message.body);
		// 							console.log('되는거야');
		// 							_this.recvMessage(recv);
		// 							console.log('마는거야');
		// 						}
		// 					);
		// 					_this.sendMessage('ENTER');
		// 					_this.findAllMessage2();
		// 				},
		// 				function(error) {
		// 					alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');
		// 					// location.href = 'http://localhost:8080/chat/room';
		// 				}
		// 			);
		// 			console.log('ws connect 끝');
		// 		});
		// },

		// findAllMessage: function() {
		// 	let path = localStorage.getItem('wschat.roomId');
		// 	console.log('나의 채팅메시지 불러오기');
		// 	console.log(localStorage.getItem('wschat.roomId'));
		// 	axios.get(WAS_URL + '/chat/room/enter/' + path).then((response) => {
		// 		this.messages = response.data;
		// 		console.log(response);
		// 		console.log(response.data);
		// 		console.log('채팅방메시지ㅋㅋㅋㅋ');
		// 	});
		// },
	},
};
</script>
