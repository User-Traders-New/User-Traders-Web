import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/main.scss';
import alert from './plugins/alert';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

Vue.use(Vuetify);
export const eventBus = new Vue();
Vue.use(alert);
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	beforeCreate() {
		// 진짜 모듈화 힘들었따.
		this.$store.dispatch('auth/getUserInfo');
	},
	render: (h) => h(App),
}).$mount('#app');
