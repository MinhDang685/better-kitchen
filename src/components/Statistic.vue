<template>

<div class="container-fluid">
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="panel panel-info">
				<div class="panel-heading">
					<h3 class="panel-title">Số lượng item theo danh mục</h3>
				</div>
				<div class="panel-body">
			    	<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
						<canvas id="itemsByCategoryChart" width="200" height="200"></canvas>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<div class="panel panel-info">
				<div class="panel-heading">
					<h3 class="panel-title">Số lượng item đã thêm theo thời gian</h3>
				</div>
				<div class="panel-body">
			    	<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
						<canvas id="itemsAddedByTimeChart" width="200" height="200"></canvas>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 radio-toolbar">
							<input id="#view-by-month" type="radio" name="view-type" value="month" checked="true">
				    		<label for="#view-by-month" > Xem theo tháng
			    			</label>
						</div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 radio-toolbar">
							<input id="#view-by-day" type="radio" name="view-type" value="day">
				    		<label for="#view-by-day" > Xem theo ngày
			    			</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</template>

<script>
	import firebase from 'firebase';
	import axios from 'axios';
	import Chart from 'chart.js';
	
	let pieChart, columnChart;
	function getRandomColors(count) {
		let res = [];
		for(let i = 0; i < count; i++) {
			res.push(getRandomColor());
		}
		return res;
	}
	export default {
		name: 'Statistic',
		methods: {
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
			getCatsName: function() {
				let self = this;
				let res = [];
				self.totalItemByCategory.forEach(function(cat) {
					res.push(cat.catName);
				});
				return res;
			},
			getCatsData: function() {
				let self = this;
				let res = [];
				self.totalItemByCategory.forEach(function(cat) {
					res.push(cat.totalItems);
				});
				return res;
			},
			drawPieChart: function() {
				let self = this;
				let labels = self.getCatsName();
				let colors = getRandomColors(labels.length);
				let itemData = self.getCatsData();
				let data = {
					datasets: [{
				        data: itemData,
				        backgroundColor: colors,
				    }],
				    labels: labels
				};
				let myPieChart = new Chart(pieChart, 
				{
				    type: 'pie',
				    data: data
				});
			},
		},
		mounted() {
			let self = this;
			pieChart = document.getElementById('itemsByCategoryChart');
			columnChart = document.getElementById('itemsAddedByTimeChart');
			let authListener = firebase.auth().onAuthStateChanged(function(signinedUser) {
				if (signinedUser) {
					self.user = signinedUser;	
					self.getTotalItemByCategory()
						.then(function(res) {
							self.totalItemByCategory = res.data;
							let itemsRef = firebase.database().ref(`${self.user.uid}/Items`);
							return itemsRef.once('value');
						})
						.then(function(snapshot) {
							snapshot.forEach(function(item) {
								let obj = item.val();
								obj.id = item.key;
								self.items.push(obj);
							});
							self.drawPieChart();
						});
						
						
				} else {
				// No user is signed in.
				}
			});
		},
		data() {
			return{
				totalItemByCategory: [],
				items: [],
				user: {},
			}
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