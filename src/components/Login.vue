<template>
	<div class="login">
		<div id="firebaseui-auth-container"></div>
		<div id="loader">
			<i class="fa fa-spinner" aria-hidden="true">Loading...</i>
		</div>
	</div>
</template>

<script>
var firebase = require('firebase');
var firebaseui = require('firebaseui');
import {firebaseConfig} from '../config';
export default{
	name: 'Login',
	data() {
		return{

		}
	},
	mounted() {
		// Initialize the FirebaseUI Widget using Firebase.
		var ui = new firebaseui.auth.AuthUI(firebase.auth());
		ui.start('#firebaseui-auth-container', {
			signInOptions: [
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.EmailAuthProvider.PROVIDER_ID
			],
			signInSuccessUrl: '/',
			callbacks: {
				uiShown: function() {
					document.getElementById('loader').style.display = 'none';
				}
			}
		});
	},
}
</script>

<style scoped>
	#loader{
		margin-top: 100px;
		text-align: center;
	}
</style>