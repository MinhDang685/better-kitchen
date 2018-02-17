<template>
  <div id="app">
  	<NavBar v-if="user"/>
    <div class="container-fluid">
    	<div class="row">
    		<div id="page-header">
		    	
		    </div>
    	</div>
    	<div class="row">
    		<router-view/>
    	</div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import firebase from 'firebase'
export default {
  name: 'App',
  data() {
  	return {
  		user: null,
  	}
  },
  components: {
  	NavBar
  },
  methods: {
  },
  mounted: function() {
  	var self = this;
  	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
  			self.user = user;
  		}
  		else {
  			self.user = null;
  		}
  	});
  },
}
</script>

<style>
#app {

}
</style>
