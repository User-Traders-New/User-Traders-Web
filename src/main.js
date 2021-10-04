import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/main.scss';
import Alert from './plugins/alert';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

Vue.use(Vuetify);
export const eventBus = new Vue();
Vue.use(Alert);
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	// 최상위 컴포넌트인 APP.vue에다가 top, bottom navigation 을 넣어서
	// 어쩔수 없이 Vue 컴포넌트 시작 전에 token 유효성 검사
	async beforeCreate() {
		let jwt = localStorage.getItem('jwt');
		if (!localStorage.getItem('jwt')) {
			jwt = '';
		}
		this.$store.dispatch('auth/userTokenValid', jwt);

		if (localStorage.getItem('jwt')) {
			this.$store.dispatch('auth/getUserInfo');
		}
	},
	render: (h) => h(App),
}).$mount('#app');
