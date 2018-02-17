// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
var firebase = require('firebase');
var firebaseui = require('firebaseui');
import {firebaseConfig} from './config';
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	created() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.$router.push('/');
			} else {
				this.$router.push('/login');
			}
		});
	},
	components: { App },
	template: '<App/>'
})
