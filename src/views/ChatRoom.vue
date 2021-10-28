<template>
	<div class="container" id="app" v-cloak>
		<v-card width="500px" height="mx-auto" class="mx-auto mt-16 mb-16">
			<div class="row mb-6 mt-6">
				<div
					class="row ml-3 mr-3 mt-3"
					style="border-bottom:solid; border-width:0.5px; border-color: lightgray;"
				>
					<v-icon color="yellow" class="ml-2">
						mdi-chat-processing
					</v-icon>
					<h2>
						채팅
					</h2>
				</div>
			</div>
			<!-- <div class="input-group">
			<div class="input-group-prepend">
				<label class="input-group-text">방제목</label>
			</div>
			<input
				type="text"
				class="form-control"
				v-model="room_name"
				v-on:keyup.enter="createRoom1"
			/>
			<div class="input-group-append">
				<button class="btn btn-primary" type="button" @click="createRoom1">
					채팅방 개설
				</button>
			</div>
		</div> -->

			<ul class="list-group pt-2 pb-2">
				<div v-if="chatrooms.length == 0">
					아직 채팅을 시작하지 않으셨습니다.
				</div>
				<div v-else>
					<v-card-text
						class="list-group-item list-group-item-action"
						style="border-bottom:solid; border-width:0.5px; border-color: lightgray;"
						v-for="(item, index) in chatrooms"
						v-bind:key="index"
						v-on:click="enterRoom(item.roomId, item.name)"
					>
						<v-row v-if="item" class="mt-1 mb-1 pb-3 pb-3">
							<!-- {{ index + 1 }} -->
							<div>
								<v-list-item-avatar
									width="30"
									height="40"
									class="ml-3"
									style=""
								>
									<!-- 프로필 사진 적용 -->
									<v-img
										v-if="item.boardId"
										v-bind:src="item.boardId.userId.imagePath"
									></v-img>
								</v-list-item-avatar>
								<div
									style="display: flex; justify-content: center; align-items: center;"
								>
									<!-- 닉네임 적용 -->
									<div style="font-size:13px;">
										{{ item.sellUserId.nickname }}
									</div>
								</div>
							</div>

							<v-col style="text-align:left;">
								<div>
									<h2 style="font-size:13px;">
										{{ item.name }}
									</h2>
								</div>
								<div style="display:flex ;  flex-direction:row;">
									<div style="font-size:17px;" class="mt-3	">
										{{ item.newMessage }}
										<!-- 최근채팅 > -->
									</div>
								</div>
								<!-- <div style="color:gray" class="mt-1">
									판매자: {{ item.sellUserId.nickname }} / 구매자:{{
										item.buyUserId.nickname
									}}
								</div> -->
							</v-col>
							<div
								class="mr-2"
								style="display: flex; 
								justify-content: center; 
								align-items: center;
								display:flex;flex-direction:column"
							>
								<div
									class="mr-2"
									style="
								color:#ff892e;
								font-size:11px"
								>
									<!-- 메시지 도착 시점의 시간,날짜 표시 -->
									{{ item.modifiedAt | timeForToday }}
								</div>

								<span class="" style="	font-size:11px">
									{{
										item.userCount == 1 ? '상대방 입장중' : '상대방 퇴장중'
									}}</span
								>
							</div>
						</v-row>
					</v-card-text>
				</div>
			</ul>
		</v-card>
	</div>
</template>

<!-- JavaScript -->
<script>
import axios from 'axios';
import Formatter from '@/mixin/Formatter';

const WAS_URL = process.env.VUE_APP_WAS;

export default {
	mixins: [Formatter],
	data() {
		return {
			room_name: '',
			chatrooms: [],
			indexToroomId: [],
		};
	},
	created() {
		this.init();
	},

	methods: {
		init() {
			this.findAllRoom();
			// for (let index = 0; index < chatrooms.length; index++) {
			// 	this.indexToroomId[index] = chatrooms[index].roomId;
			// }
		},
		findAllRoom: function() {
			console.log('나의 채팅방 목록 불러오기');
			axios
				.get(WAS_URL + '/chat/rooms', {
					headers: {
						token: localStorage.getItem('jwt'),
					},
				})
				.then((response) => {
					this.chatrooms = response.data;
					console.log('채팅방 목록 대령이요!');
					console.log(response.data);
					console.log(this.chatrooms.length);
				});
		},
		createRoom1: function() {
			if ('' === this.room_name) {
				alert('방 제목을 입력해 주십시요.');
				return;
			} else {
				var params = new URLSearchParams();
				params.append('name', this.room_name);
				params.append('sellUserId', { id: 1 });
				const obj = {
					name: this.room_name,
					sellUserId: {
						id: 1,
					},
				};

				axios
					.post(WAS_URL + '/chat/room', obj, {
						headers: {
							token: localStorage.getItem('jwt'),
						},
					})
					.then((response) => {
						alert(response.data.name + '방 개설에 성공하였습니다.');
						this.room_name = '';
						this.findAllRoom();
					})
					.catch((response) => {
						alert('채팅방 개설에 실패하였습니다.');
					});
			}
		},
		enterRoom: function(roomId, roomName) {
			localStorage.setItem('wschat.roomId', roomId);
			localStorage.setItem('wschat.roomName', roomName);

			// this.$router.push({ name: 'ChatRoomDetail', params: { roomId: roomId } });
			location.href = '/chat/room/enter/' + roomId;
		},
	},
};
</script>
