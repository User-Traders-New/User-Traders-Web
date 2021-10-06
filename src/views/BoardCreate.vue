<template>
	<div class="mt-6 pt-4">
		<v-card max-width="500" max-height="auto" class="mx-auto my-12">
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-card-title>
					<v-text-field
						color="orange"
						:rules="titleRules"
						required
						v-model="title"
						counter="15"
						label="제목"
						clearable
						clear-icon="mdi-close-circle"
						outlined
					></v-text-field>
				</v-card-title>
				<v-card-title>
					<v-textarea
						color="orange"
						:rules="contentRules"
						v-model="content"
						counter="50"
						label="내용"
						clearable
						clear-icon="mdi-close-circle"
						outlined
					></v-textarea>
				</v-card-title>
				<v-card-title class="">
					<v-text-field
						width=""
						class="ml-2"
						color="orange"
						v-model="price"
						label="가격"
						clearable
						clear-icon="mdi-close-circle"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						outlined
					></v-text-field>
					원
				</v-card-title>
				<v-card-title>
					<input class="ml-2" type="radio" id="one" value="0" v-model="grade" />
					<label for="one">새상품</label>
					<v-icon color="#ff0008" title="새상품">
						mdi-new-box
					</v-icon>
					<br />
					<input class="ml-2" type="radio" id="two" value="1" v-model="grade" />
					<label for="two">S급</label>
					<v-icon color="#fc0558" title="S급">
						mdi-alpha-s-box
					</v-icon>
					<br />
					<input
						class="ml-2"
						type="radio"
						id="three"
						value="2"
						v-model="grade"
					/>
					<label for="three">A급</label>
					<v-icon color="#e39a07" title="A급">
						mdi-alpha-a-box
					</v-icon>
					<br />
					<input
						class="ml-2"
						type="radio"
						id="four"
						value="3"
						v-model="grade"
					/>
					<label for="four">B급</label>
					<v-icon color="#a6a5a2" title="B급">
						mdi-alpha-b-box
					</v-icon>
					<br />
				</v-card-title>
				<v-card-title>
					<v-select
						class="ml-2 mr-2"
						color="orange"
						@click="categoryName"
						v-model="category"
						:items="categoryItem"
						:rules="[(v) => !!v || '카테고리를 선택해주세요']"
						required
						:menu-props="{ top: true, offsetY: true }"
						label="대분류 카테고리"
						outlined
					>
					</v-select>

					<v-select
						v-if="isCate == 1"
						class="ml-2 mr-2"
						color="orange"
						@click="subCategoryName(category)"
						v-model="subcategory"
						:items="categorySubItem"
						:rules="[(v) => !!v || '카테고리를 선택해주세요']"
						required
						:menu-props="{ top: true, offsetY: true }"
						label="소분류 카테고리"
						outlined
					></v-select>
				</v-card-title>
				<v-card-subtitle>
					<h4 style="color:red">필수!! 이미지는 1장 이상 올려주세요.</h4>
				</v-card-subtitle>
				<div style="height:50px">
					<div
						style="display: flex; justify-content: center; align-items: center;"
					>
						<input
							type="file"
							ref="imageInput"
							name="images[]"
							id="photo"
							@change="imagesAdd"
							hidden
							multiple
						/>

						<v-btn
							color="#0095ff"
							class="ma-2 white--text"
							@click="onClickImageUpload"
						>
							이미지 등록하기

							<v-icon right dark>
								mdi-cloud-upload
							</v-icon>
						</v-btn>
					</div>
				</div>

				<v-simple-table>
					<template v-slot:default>
						<div style="color:red" v-if="isImage">
							<v-card-subtitle
								>첫번째 이미지가 썸네일이 됩니다.</v-card-subtitle
							>
						</div>
						<thead>
							<tr>
								<th class="text-left">
									이미지
								</th>
								<th class="text-left">
									순서변경
								</th>
								<th class="text-left">
									삭제하기
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(img, i) in image" v-bind:key="i">
								<th>
									<v-img :src="img" width="130" height="130"></v-img>
								</th>
								<th>
									<div style="display:flex; flex-direction:column">
										<v-btn color="white">
											<v-icon @click="upImageIndex(i)" class="">
												mdi-chevron-up
											</v-icon>
										</v-btn>
										<v-btn color="white">
											<v-icon @click="downImageIndex(i)" class="">
												mdi-chevron-down
											</v-icon>
										</v-btn>
									</div>
								</th>
								<th>
									<v-btn
										dark
										color="red"
										v-show="image"
										@click="removeImage(i)"
									>
										{{ i + 1 }}번 삭제
										<!-- <v-icon class="ml-2" dark>
											mdi-block-helper
										</v-icon> -->
									</v-btn>
								</th>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
				<v-card-subtitle>
					<v-checkbox
						v-model="checkbox"
						:rules="[(v) => !!v || '상품 거래에 동의 해주세요']"
						label="상품 거래에 동의 하시겠습니까?"
						required
					></v-checkbox>
				</v-card-subtitle>
			</v-form>
			<v-btn
				color="green"
				block
				class=" white--text"
				:disabled="!valid"
				@click="validate"
			>
				완료<v-icon right color="white">
					mdi-checkbox-marked-circle
				</v-icon>
			</v-btn>
		</v-card>
		<br />
	</div>
</template>
<script>
import http from '@/utils/http';
import { mapState, mapActions } from 'vuex';

export default {
	beforeCreate() {},
	components: {},
	data() {
		return {
			isloading: false,
			valid: true,
			titleRules: [
				(v) => !!v || '제목을 입력해주세요.',
				(v) => (v && v.length <= 15) || '제목은 15자 이하 까지 가능합니다.',
			],
			contentRules: [
				(v) => !!v || '내용을 입력해주세요.',
				(v) => (v && v.length <= 50) || '내용은 50자 이하로 작성 부탁드립니다.',
			],
			checkbox: false,

			categoryItem: [],
			categorySubItem: [],
			images: {},
			image: [],
			photoFile: [],
			title: '',
			price: '',
			grade: 0,
			category: '',
			subcategory: '',
			content: '',
			tokenRefesh: '',
			isCate: 0,
			isImage: 0,
		};
	},
	computed: {
		...mapState({
			categories: (state) => state.users.categories,
			subcategories: (state) => state.users.subcategories,
		}),
	},
	mounted() {
		console.log('create init...');
		let jwt = localStorage.getItem('jwt');
		if (!localStorage.getItem('jwt')) {
			jwt = '';
		}

		this.$store.dispatch('auth/userTokenValid2', jwt);
		// if (userTokenValid(this.token) == false) {
		// 	alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요!!');
		// 	this.getUserLogout();
		// }
	},
	methods: {
		validate() {
			this.$refs.form.validate();
			this.allSubmit();
		},
		categoryName() {
			this.getCategories().then(() => {
				for (var i = 0; i < this.categories.length; i++) {
					this.categoryItem = this.categoryItem.concat(
						this.categories[i].id + ' ' + this.categories[i].name
					);
				}
			});

			this.isCate = 1;
		},
		subCategoryName(id) {
			this.categorySubItem = [];
			let subid = Number(id.split(' ')[0]);
			this.getSubCategories(subid).then(() => {
				for (var i = 0; i < this.subcategories.length; i++) {
					this.categorySubItem = this.categorySubItem.concat(
						this.subcategories[i].id + ' ' + this.subcategories[i].name
					);
				}
			});
		},
		onClickImageUpload() {
			this.$refs.imageInput.click();
		},
		imagesAdd(e) {
			var files = e.target.files || e.dataTransfer.files;
			this.images = [];
			this.image = [];
			Array.prototype.push.apply(this.images, files);

			if (this.images.length > 6) {
				return alert('이미지는 5장 까지 가능합니다.');
			}
			this.createImage(this.images);
			this.isImage = 1;
		},

		upImageIndex(index) {
			if (index == 0) {
				return alert('첫번째는 위로 올릴수 없습니다.');
			}
			console.log('변경전');
			console.log(this.images);
			console.log(this.image);

			let item = this.images.splice(index, 1);
			let item2 = this.image.splice(index, 1);

			this.images.splice(index - 1, 0, item[0]);
			this.image.splice(index - 1, 0, item2[0]);

			console.log(this.images);

			console.log('변경후');
			console.log(this.images);
		},
		downImageIndex(index) {
			if (index == this.images.length - 1) {
				return alert('마지막은 밑으로 내릴수 없습니다.');
			}

			let item = this.images.splice(index, 1);
			let item2 = this.image.splice(index, 1);

			this.images.splice(index + 1, 0, item[0]);
			this.image.splice(index + 1, 0, item2[0]);
		},
		createImage(file) {
			for (var i = 0; i < file.length; i++) {
				var reader = new FileReader();
				var vm = this;
				reader.onload = (e) => {
					vm.image.push(e.target.result);
				};
				reader.readAsDataURL(file[i]);
			}
		},

		removeImage(key) {
			this.image.splice(key, 1);
			this.images.splice(key, 1);
		},

		allSubmit() {
			if (!this.price) {
				return alert('가격을 입력해주세요.');
			}
			if (!this.images.length) {
				return alert('이미지는 1장 이상 올려주세요.');
			}
			let jwt = localStorage.getItem('jwt');
			if (!localStorage.getItem('jwt')) {
				jwt = '';
			}
			this.$store.dispatch('auth/userTokenValid2', jwt);

			//server 전송
			var frm = new FormData();
			this.photoFile = this.images;
			frm.append('title', this.title);
			frm.append('content', this.content);
			frm.append('price', this.price);
			// const tempCategory = this.category.split(' ');
			console.log(this.subcategory);
			const tempSubCategory = this.subcategory.split(' ');
			frm.append('categoryId', tempSubCategory[0]);
			frm.append('status', 0);
			frm.append('grade', 0);
			for (var i = 0; i < this.images.length; i++) {
				frm.append('files', this.images[i]);
			}

			return http
				.process('boards', 'boardCreate', frm, { token: jwt })
				.then((res) => {
					console.log(res);
					this.$router.push({ name: 'Home' });
				})
				.catch((err) => {
					console.log(err);
				});
		},
		...mapActions({
			getCategories: 'users/getCategories',
			getSubCategories: 'users/getSubCategories',
			getUserLogout: 'auth/getUserLogout',
		}),
	},
};
</script>
