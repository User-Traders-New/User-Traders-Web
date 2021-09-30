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
		if (localStorage.getItem('jwt')) {
			this.$store.dispatch('auth/getUserInfo');
		}
	},
	render: (h) => h(App),
}).$mount('#app');
