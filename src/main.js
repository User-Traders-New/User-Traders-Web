import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/main.scss';
import vuetify from './plugins/vuetify';
import UserComponent from './components/User';

Vue.component('User', UserComponent);

export const eventBus = new Vue({
	methods: {
		userWasEdited(date) {
			this.$emit('userWasEdited', date);
		},
	},
});
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
