<template>
	<v-container>
		<v-card>
			<h1 align="center" class="dark--text mb-2">
				<v-icon size="xx-large" color="#ff7700">mdi-gift</v-icon>
				<span class="font-36"> 나의 찜 현황 </span>
				<v-icon size="xx-large" color="#ff7700">mdi-gift</v-icon>
			</h1>

			<v-card
				style="display:flex; flex-direction:row; justify-content: center; align-items: center;"
				v-for="(cart, index) in cartList"
				:key="cart.id"
			>
				<div @click="detailPush(cart.boardId.id)">
					<v-layout width="">
						<v-flex xs3>
							<v-img
								v-bind:src="cart.boardImageDto.path"
								contain
								height="130px"
								width="130px"
							></v-img>
						</v-flex>
						<v-layout column>
							<v-card-title>
								<h4>{{ cart.boardId.title }}</h4>
							</v-card-title>
							<v-card-text
								>{{ cart.boardId.price | moneyFilter }} 원</v-card-text
							>
						</v-layout>
					</v-layout>
				</div>
				<v-card-actions>
					<v-btn
						right
						color="blue-grey"
						class="ma-2 white--text"
						fab
						@click="likeAddDelete(index, cart.boardId.id)"
					>
						<v-icon dark>
							mdi-delete
						</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>

			<v-card-subtitle>
				<h3 align="center">
					개수 :
					<span style="color: orange">{{ cartList.length }}</span>
					<p></p>
					총 가격 (₩ {{ total | moneyFilter }} 원)
				</h3>
			</v-card-subtitle>
		</v-card>
		<v-spacer />
	</v-container>
</template>

<script>
import http from '@/utils/http';
import Formatter from '@/mixin/Formatter';
import { userTokenValid } from '@/api/userValid';
import { mapActions } from 'vuex';
export default {
	mixins: [Formatter],
	data() {
		return {
			cartList: [],
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			if (!localStorage.getItem('jwt')) {
				this.getUserLogout().then(() => {
					this.isLoading = false;
				});
			} else {
				const jwt = localStorage.getItem('jwt');
				this.getCartList(jwt);
			}
			// } else if (!userTokenValid(token)) {
			// 	alert('토큰이 만료되었습니다. 다시 로그인 해주세요!!');
			// 	this.$router.push({ name: 'UserLogin' });
			// }
		},
		getCartList(jwt) {
			return http
				.process('boards', 'listlike', null, { token: jwt })
				.then((res) => {
					this.cartList = res.boardLikeUserDtoList;
				})
				.catch((err) => {
					console.log(err.message);
					alert(err.message);
					this.getUserLogout().then(() => {
						this.isLoading = false;
					});
				});
		},
		...mapActions({
			getUserLogout: 'auth/getUserLogout',
		}),
		// cartDelete(idx, id) {
		// 	this.cartList.splice(idx, 1);
		// 	return http
		// 		.process('boards', 'like', { id: id })
		// 		.then((res) => {
		// 			console.log(res);
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		// },

		likeAddDelete(idx, id) {
			this.cartList.splice(idx, 1);
			const jwt = localStorage.getItem('jwt');
			return http
				.process('boards', 'like', { boardId: { id: id } }, { token: jwt })
				.then((res) => {
					console.log(res);
					this.init();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		detailPush(id) {
			this.$router.push({ name: 'BoardDetail', params: { id: id } });
		},
	},

	computed: {
		total() {
			let total = 0;
			this.cartList.forEach((cartItem) => {
				total += parseInt(cartItem.boardId.price);
			});
			return total;
		},
	},
};
</script>
