<template>
	
<div>
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
			<table class="table">
				<thead>
					<tr>
						<th>
							Tên danh mục
						</th>
						<th>
							Số lượng item
						</th>
						<th>
							Màu sắc
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="category in categories">
						<td>{{category.catName}}</td>
						<td>{{category.totalItems}}</td>
						<td :bgcolor="category.color">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
let user = {};
let storageRef = {};
let databaseRef = {};
let databaseListenerIsAdded = false;
export default {
	name: 'Categories',
	data() {
		return{
			categories: [],
		}
	},
	computed: {

	},
	methods: {
		getFormatedTime: function(date) {
			let self = this;
			return moment(date).format('DD [tháng] MM [năm] YYYY, hh:mm a');
		},
		getBackgroundColor: function(hex) {
			return `bgcolor: ${hex}`;
		},
		listenToDataChange: function() {
			let self = this;
			//database listener
		},
		getTotalItemByCategory: function() {
			let self = this;
			return firebase.auth().currentUser.getIdToken()
			.then(function(token) {
				let requestConfig = {
					url: `/categories/statistic`,
					method: 'get',
					baseURL: 'https://us-central1-better-kitchen.cloudfunctions.net/app',
					headers: {'Authorization': `Bearer ${token}`},
				};
				return axios.request(requestConfig);
			});		
		},
	},
	mounted() {
		let self = this;
		let authListener = firebase.auth().onAuthStateChanged(function(signinedUser) {
			if (signinedUser) {
				user = signinedUser;	
				self.getTotalItemByCategory()
					.then(function(res) {
						self.categories = res.data;
						
					});
			} else {
				// No user is signed in.	
			}
		});
		storageRef = firebase.storage().ref();	//get reference of images storage
		databaseRef = firebase.database().ref();
		
	},
	components: {
		
	}
}
</script>

<style scoped>

.radio-toolbar input[type="radio"] {
  display: none;
}

.radio-toolbar label {
  display: inline-block;
  background-color: #ddd;
  padding: 4px 11px;
  font-family: Arial;
  font-size: 16px;
  cursor: pointer;
}

.radio-toolbar input[type="radio"]:checked+label {
  background-color: #bbb;
}

</style>