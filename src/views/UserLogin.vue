<template>
	<div>
		<v-card width="360" class="mx-auto ">
			<div v-if="!isLoginError">
				<v-card-title>
					<h3
						class="pb-3"
						style="color:#ff6d00; margin-left:21%;font-size:xx-large;font-weight:bold;
            border-bottom:solid; border-width:0.5px; border-color: #cccccc;
          "
					>
						User Traders
					</h3>
				</v-card-title>
			</div>
			<div v-else>
				<v-card-title style="background-color: #FF3232">
					<h3 style="color: white">이메일과 비밀번호를 확인해주세요</h3>
				</v-card-title>
			</div>

			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						autocomplete="off"
						v-model="email"
						:rules="emailRules"
						label="이메일"
						prepend-icon="mdi-account-circle"
						required
					></v-text-field>
					<v-text-field
						autocomplete="off"
						v-model="password"
						label="비밀번호"
						:rules="passwordRules"
						prepend-icon="mdi-lock"
						type="password"
					></v-text-field>
				</v-form>
			</v-card-text>
			<v-divider> </v-divider>
			<v-card-actions>
				<!-- <v-btn color="grey" class="mr-9 white--text" @click="reset">
					Reset
					<v-icon right>mdi-backup-restore</v-icon>
				</v-btn> -->
				<v-btn color="green" class="white--text" @click="reset">
					비밀번호 찾기
					<v-icon right>mdi-backup-restore</v-icon>
				</v-btn>

				<v-btn
					:disabled="!valid"
					color="#ff6d00"
					class="ml-9 mr-2 white--text"
					@click="loginSubmit"
				>
					로그인
					<v-icon right>mdi-arrow-right-thick</v-icon>
				</v-btn>

				<v-btn :to="{ name: 'SignUp' }" color="#ff6d00" class="white--text">
					회원가입
					<v-icon right>mdi-account-plus</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
	//로그인에서 사용해야할 값 초기화(이메일, 비밀번호, 이메일 규칙, 비밀번호 규칙)
	data: () => ({
		valid: true,
		email: '',
		emailRules: [
			(v) => !!v || '이메일을 입력해주세요.',
			(v) => /.+@.+\..+/.test(v) || '이메일 형식에 맞게 입력해주세요.',
		],
		password: '',
		passwordRules: [(v) => !!v || '비밀번호를 입력해주세요.'],
	}),
	//state:여러 컴포넌트 간에 공유할 데이터 : 상태
	//getters ,computed : state 값에 접근하는 속성 미리 연산된 값을 접근하는 속성
	// mutations : state 값을 변경할 수 있는 유일한 방법이자 메서드, commit으로 동작시킨다.
	computed: {
		...mapState({
			isLogin: (state) => state.users.isLogin,
			isLoginError: (state) => state.users.isLoginError,
		}),
	},

	methods: {
		validate() {
			this.$refs.form.validate();
		},
		reset() {
			this.$refs.form.reset();
		},
		loginSubmit() {
			const loginObj = { email: this.email, password: this.password };
			if (
				loginObj.email == '' ||
				loginObj.password == '' ||
				loginObj.email == null ||
				loginObj.password == null ||
				loginObj.email == undefined ||
				loginObj.password == undefined
			) {
				alert('이메일이나 비밀번호를 입력해주세요.');
				return;
			}
			//로그인 api 호출 시작 -> UserLogin.vue(this.postUserLogin) -> ...mapActions(PostUserLogin) -> auth.js/postUserLogin -> action안의 postUserLogin -> http 함수 호출 -> http 함수는 또 @/util\http/index.js 에 있음 -> http post 메소드를 requestBody와 requestheader 그리고 url과 함께 호출 -> return p 안에 response가 담기고 해당 데이터를 가공 -> 여러 유효성 검사 후 함수 콜백 -> 그리고 지금 .then() -> res를 같이 담아줘서 response값중

			this.postUserLogin(loginObj).then((res) => {
				console.log(res.token);
				this.$router.push(this.$route.query.redirect || '/');
			});
		},

		...mapActions({
			getUserLogout: 'auth/getUserLogout',
			postUserLogin: 'auth/postUserLogin',
			getUserInfo: 'auth/getUserInfo',
		}),
	},
};
</script>
