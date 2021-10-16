<template>
	<div class="container" id="app" v-cloak>
		<br />
		<br />
		<br />
		<v-card width="360" height="mx-auto" class="mx-auto ">
			<v-card-title>
				<div style="">
					<div class="">
						<h4>{{ roomName }}</h4>
					</div>
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

			<div v-for="(message, index) in messages" v-bind:key="index">
				<v-list-item>
					<v-list-item-action>
						<span>{{ message.sender }}</span>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ message.message }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider inset></v-divider>
			</div>

			<div fixed class="ml-7" style="display:flex;flex-direction:row">
				<v-form>
					<v-text-field
						v-model="message"
						counter="50"
						autocomplete="off"
						label="채팅"
						prepend-icon="mdi-chat-processing"
					></v-text-field>
				</v-form>
				<v-card-actions @click="sendMessage('TALK')">
					<v-btn color="yellow" small style="" class="rounded-pill"
						>보내기</v-btn
					>
				</v-card-actions>
			</div>
		</v-card>
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

// var reconnect = 0;
const WAS_URL = process.env.VUE_APP_WAS;
let socket = new SockJS(WAS_URL + '/ws-stomp');
let ws = Stomp.over(socket);

export default {
	// websocket & stomp initialize

	// vue.js
	data() {
		return {
			roomId: '',
			roomName: '',
			userId: '',
			message: '',
			messages: [],
			token: '',
			userCount: 0,
			connected: null,
		};
	},

	mounted() {
		this.roomId = localStorage.getItem('wschat.roomId');
		this.roomName = localStorage.getItem('wschat.roomName');

		this.userId = localStorage.getItem('loginUserId');
		this.token = localStorage.getItem('jwt');
		var _this = this;
		this.init2();

		// var _this = this;
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
		// 				_this.sendMessage('ENTER');
		// 				ws.subscribe(
		// 					WAS_URL +
		// 						'/sub/chat/room/' +
		// 						localStorage.getItem('wschat.roomId'),
		// 					(message) => {
		// 						console.log(message);
		// 						var recv = JSON.parse(message.body);
		// 						console.log('되는거야');
		// 						_this.recvMessage(recv);
		// 						console.log('마는거야');
		// 					}
		// 				);
		// 				// _this.sendMessage('ENTER');
		// 			},
		// 			function(error) {
		// 				alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');
		// 				// location.href = 'http://localhost:8080/chat/room';
		// 			}
		// 		);
		// 		console.log('ws connect 끝');
		// 	});
	},

	created() {
		this.roomId = localStorage.getItem('wschat.roomId');
		this.roomName = localStorage.getItem('wschat.roomName');

		this.userId = localStorage.getItem('loginUserId');
		this.token = localStorage.getItem('jwt');
		var _this = this;
	},
	methods: {
		async init2() {
			await this.findAllMessage2();
			await this.connect();
			await this.findAllMessage2();
		},
		init() {
			var _this = this;
			console.log('시작~~~');
			axios
				.get(WAS_URL + '/chat/user', {
					headers: {
						token: localStorage.getItem('jwt'),
					},
				})
				.then((response) => {
					console.log('ws connect 해보자~');

					ws.connect(
						{ token: localStorage.getItem('jwt') },
						function(frame) {
							console.log('소켓 연결 성공', frame);
							ws.subscribe(
								WAS_URL +
									'/sub/chat/room/' +
									localStorage.getItem('wschat.roomId'),
								(message) => {
									console.log(message);
									var recv = JSON.parse(message.body);
									console.log('되는거야');
									_this.recvMessage(recv);
									console.log('마는거야');
								}
							);
							_this.sendMessage('ENTER');
							_this.findAllMessage2();
						},
						function(error) {
							alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');
							// location.href = 'http://localhost:8080/chat/room';
						}
					);
					console.log('ws connect 끝');
				});
		},
		findAllMessage2() {
			let path = localStorage.getItem('wschat.roomId');
			console.log('나의 채팅메시지 불러오기');
			console.log(localStorage.getItem('wschat.roomId'));
			axios.get(WAS_URL + '/chat/room/enter/' + path).then((response) => {
				this.messages = response.data;
				console.log(response);
				console.log(response.data);
				console.log('채팅방메시지ㅋㅋㅋㅋ');
			});
		},
		findAllMessage: function() {
			let path = localStorage.getItem('wschat.roomId');
			console.log('나의 채팅메시지 불러오기');
			console.log(localStorage.getItem('wschat.roomId'));
			axios.get(WAS_URL + '/chat/room/enter/' + path).then((response) => {
				this.messages = response.data;
				console.log(response);
				console.log(response.data);
				console.log('채팅방메시지ㅋㅋㅋㅋ');
			});
		},
		connect() {
			var _this = this;
			ws.connect(
				{ token: localStorage.getItem('jwt') },
				function(frame) {
					console.log('소켓 연결 성공', frame);
					_this.sendMessage('ENTER');
				},
				function(error) {
					alert('서버 연결에 실패 하였습니다. 다시 접속해 주십시요.');
					// location.href = 'http://localhost:8080/chat/room';
				}
			);
		},
		sendMessage: async function(type) {
			console.log('채팅 보내기 시작!!!!!!!!');
			await ws.send(
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
			this.findAllMessage2();
			console.log('채팅 보내기 끝!!!!!!!!');
			this.message = '';
		},

		recvMessage: function(recv) {
			console.log('리시브 내놔!!!!!');
			console.log(recv);
			this.userCount = recv.userCount;
			this.messages.unshift({
				type: recv.type,
				sender: recv.sender,
				message: recv.message,
				userId: recv.userId,
			});
		},
	},
};
</script>
