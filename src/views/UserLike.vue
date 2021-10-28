<template>
	<v-container>
		<v-card class="mt-16 mb-16">
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
			console.log('userLike init...');

			let jwt = localStorage.getItem('jwt');
			if (!localStorage.getItem('jwt')) {
				jwt = '';
			}
			this.$store.dispatch('auth/userTokenValid2', jwt);
			if (localStorage.getItem('jwt')) {
				this.getCartList(jwt);
				this.token = localStorage.getItem('jwt');
			}
		},
		getCartList(jwt) {
			return http
				.process('boards', 'listlike', null, { token: jwt })
				.then((res) => {
					this.cartList = res.boardLikeUserDtoList;
				})
				.catch((err) => {
					alert(err.message);
					this.getUserLogout().then(() => {
						this.isLoading = false;
					});
				});
		},

		likeAddDelete(idx, id) {
			this.cartList.splice(idx, 1);
			let payload = {
				id: id,
				token: localStorage.getItem('jwt'),
			};

			this.likeAddDelete2(payload)
				.then((res) => {
					console.log(res);

					if (
						res.message !=
						id + '번 게시물을 장바구니에 담기 취소에 성공하였습니다.'
					) {
						if (
							confirm(
								'해당 게시물을 찜 하였습니다. 장바구니로 이동하시겠습니까?'
							)
						) {
							this.$router.push({ name: 'UserLike' });
						}
					}
					this.init();
				})
				.catch((err) => {
					console.log(err);
					this.$router.push({ name: 'UserLogin' });
				});
		},

		detailPush(id) {
			this.$router.push({ name: 'BoardDetail', params: { id: id } });
		},

		...mapActions({
			likeAddDelete2: 'auth/likeAddDelete2',
			getUserLogout: 'auth/getUserLogout',
		}),
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
