<template>
	<div class="red lighten-3 pa-3">
		<h3>자세한 회원 정보를 확인합니다.</h3>
		<p>상세 사항</p>
		<div>
			<v-list dense>
				<v-list-item-title>
					<v-list-item-subtitle>
						이름 :
					</v-list-item-subtitle>
					<v-list-item-subtitle class="align-end">
						{{ name }}
					</v-list-item-subtitle>
				</v-list-item-title>
				<v-list-item-title>
					<v-list-item-subtitle>
						주소 :
					</v-list-item-subtitle>
					<v-list-item-subtitle class="align-end">
						{{ address }}
					</v-list-item-subtitle>
				</v-list-item-title>
				<v-list-item-title>
					<v-list-item-subtitle>
						전화번호 :
					</v-list-item-subtitle>
					<v-list-item-subtitle class="align-end">
						{{ phone }}
					</v-list-item-subtitle>
				</v-list-item-title>
				<v-list-item-title>
					<v-list-item-subtitle>
						반려견 유무 :
					</v-list-item-subtitle>
					<v-list-item-subtitle class="align-end">
						{{ hasDogKr }}
					</v-list-item-subtitle>
				</v-list-item-title>
				<v-list-item-title>
					<v-list-item-subtitle>
						수정일자 :
					</v-list-item-subtitle>
					<v-list-item-subtitle class="align-end">
						{{ getDateAndTime(editedDate) }}
					</v-list-item-subtitle>
				</v-list-item-title>
			</v-list>
		</div>
	</div>
</template>

<script>
import UserDetail from './UserDetail.vue';
import { eventBus } from '../main';
import { dateFormat } from '../mixin/dateFormat';

export default {
	props: ['name', 'address', 'phone', 'hasDog'],

	components: {
		UserDetail,
	},
	data: () => ({
		editedDate: null,
	}),
	computed: {
		hasDogKr() {
			return this.hasDog === true ? '있음' : '없음';
		},
	},

	created() {
		console.log('유저 디테일 컴포넌트');
		eventBus.$on('userWasEdited', (date) => {
			this.editedDate = date;
		});
	},
	methods: {
		switchName() {
			this.nameOfChild = '컴퓨터';
		},
	},
	mixins: [dateFormat],
};
</script>
