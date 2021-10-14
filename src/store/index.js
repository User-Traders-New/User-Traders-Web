import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import auth from './modules/auth';
import socket from './modules/socket';


Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: { users, auth, 
		socket 
	},
	// strict: debug,
  // plugins: debug ? [createLogger()] : []
});
