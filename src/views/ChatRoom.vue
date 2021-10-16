<template>
	<div class="container" id="app" v-cloak>
		<v-card width="360" height="mx-auto" class="mx-auto mt-8 ">
			<div class="row mb-6">
				<div
					class="row ml-3"
					style="border-bottom:solid; border-width:0.5px; border-color: lightgray;"
				>
					<v-icon color="yellow" class="ml-2">
						mdi-chat-processing
					</v-icon>
					<h3>
						채팅
					</h3>
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

			<ul class="list-group">
				<div width="360px">
					<v-card-text
						class="list-group-item list-group-item-action"
						style="border-bottom:solid; border-width:0.5px; border-color: lightgray;"
						v-for="item in chatrooms"
						v-bind:key="item.id"
						v-on:click="enterRoom(item.roomId, item.name)"
					>
						<v-row v-if="item" class="mt-3 mb-3 pb-3 pb-3">
							<v-list-item-avatar class="ml-3" style="">
								<!-- 프로필 사진 적용 -->
								<v-img
									v-if="item.boardId"
									v-bind:src="item.boardId.userId.imagePath"
								></v-img>
							</v-list-item-avatar>
							<v-col width="1000" style="text-align:left;">
								<div>
									<!-- 닉네임 적용 -->
									<h4 style="color:grey">
										{{ item.sellUserId.nickname }}
									</h4>
								</div>
								<div>
									<!-- 최근 채팅 메시지 표시 -->
									<h5>{{ item.name }}</h5>
								</div>
							</v-col>
							<v-col
								align-center
								justify-center
								style="margin-right:4%;  text-align : right;"
							>
								<!-- 메시지 도착 시점의 시간,날짜 표시 -->
								{{ item.createAt | timeForToday }}
							</v-col>
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
		};
	},
	created() {
		this.init();
	},

	methods: {
		init() {
			this.findAllRoom();
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
