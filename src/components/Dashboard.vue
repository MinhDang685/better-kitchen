<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 radio-toolbar">
						<input id="#addedTimeDescrease" type="radio" name="view-order" value="addedTimeDescrease" checked="true">
			    		<label for="#addedTimeDescrease" > Ngày thêm gần nhất
		    			</label>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 radio-toolbar">
					<input id="#addedTimeIncrease" type="radio" name="view-order" value="addedTimeIncrease">
		    		<label for="#addedTimeIncrease" > Ngày thêm lâu nhất
	    			</label>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 radio-toolbar">
					<input id="#expiredDateDescrease" type="radio" name="view-order" value="expiredDateDescrease">
		    		<label for="#expiredDateDescrease" > Ngày hết hạn gần nhất
	    			</label>
				</div>
				<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2 radio-toolbar">
					<input id="#expiredDateIncrease" type="radio" name="view-order" value="expiredDateIncrease">
		    		<label for="#expiredDateIncrease" > Ngày hết hạn lâu nhất
	    			</label>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6 col-md-3" v-for="item in items">
			    <div class="thumbnail" style="height: 400px">
			    	<div style="width: 150px; height: 150px">
			    		<img class="item-avatar" :src="item.avatar" :alt="item.itemName">
			    	</div>
			    	<div class="caption">
			        	<h3>{{item.itemName}}</h3>
			        	<p>{{getFormatedTime(item.addedTime)}}</p>
			        	<p>{{getFormatedTime(item.expiredDate)}}</p>
			        	<p>
			        		 <ItemDetail :product="item"/>
			        	</p>
			      	</div>
			    </div>
		    </div>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase';
import ItemDetail from '@/components/ItemDetail.vue';
let user = {};
let storageRef = {};
let databaseRef = {};
let databaseListenerIsAdded = false;
export default {
	name: 'Dashboard',
	data() {
		return{
			items: [],
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
		sortItemsByAddedTimeAscending: function() {
			let self = this;
			self.items.sort(function(a, b) {
				let res = moment(a.addedTime) > moment(b.addedTime);
				return res;
			});
		},
		sortItemsByExpiredTimeAscending: function() {
			let self = this;
			self.items.sort(function(a, b) {
				let res = moment(a.expiredDate) > moment(b.expiredDate);
				return res;
			});
		},
		sortItemsByAddedTimeDescending: function() {
			let self = this;
			self.items.sort(function(a, b) {
				let res = moment(a.addedTime) < moment(b.addedTime);
				return res;
			});
		},
		sortItemsByExpiredTimeDescending: function() {
			let self = this;
			self.items.sort(function(a, b) {
				let res = moment(a.expiredDate) < moment(b.expiredDate);
				return res;
			});
		},
		getDownloadURL: function(fullPath) {
			let self = this;
			let urlPromise = storageRef.child(fullPath).getDownloadURL()
			.then(function(url) {
				return url;
			});
			return urlPromise;
		},
		getItemImage: function(item) {
			let self = this;
			if(typeof item.images === 'undefined') {
				return self.getDownloadURL('images/empty.jpg');
			}
			let images = item.images.split(' ');
			if(images.length > 0) {
				let fullPath = `${images[0]}`;
				return self.getDownloadURL(fullPath);
			}
			else {
				return self.getDownloadURL('images/empty.jpg');
			}
		},
		listenToDataChange: function() {
			let self = this;
			//database listener
			databaseRef.child(`${user.uid}/Categories`).once('value', function(snapshot) {
				self.categories = snapshot;
			});
			databaseRef.child(`${user.uid}/Items`).on('child_added', function(snapshot) {
				let currentItem = snapshot.val();
				currentItem.id = snapshot.key;
				self.getItemImage(currentItem)
				.then(function(image) {
					currentItem.avatar = image;
					self.items.push(currentItem);
					self.sortItemsByAddedTimeDescending();
				});
			});
			databaseRef.child(`${user.uid}/Items`).on('child_removed', function(snapshot) {
				let currentItem = snapshot.val();
				currentItem.id = snapshot.key;
				for(let i = 0; i < self.items.length; i++) {
					if(self.items[i].id.localeCompare(currentItem.id) === 0) {
						self.items.splice(i, 1);
						break;
					}
				}
			});
			databaseRef.child(`${user.uid}/Items`).on('child_changed', function(snapshot) {
				let currentItem = snapshot.val();
				currentItem.id = snapshot.key;
				let terminateLoop = false;
				for(let i = 0; i < self.items.length && terminateLoop === false; i++) {
					if(self.items[i].id.localeCompare(currentItem.id) === 0) {
						if(typeof self.items[i].images === 'undefined' || 
							currentItem.images.localeCompare(self.items[i].images) !== 0) {
							self.getItemImage(currentItem)
								.then(function(image) {
									currentItem.avatar = image;
									self.items[i] = currentItem;
									terminateLoop = true;
								});
						}
						else {
							self.items[i] = currentItem;
							break;
						}

					}
				}
			});
		}
	},
	mounted() {
		let self = this;
		let authListener = firebase.auth().onAuthStateChanged(function(signinedUser) {
			if (signinedUser) {
				user = signinedUser;	
				if(databaseListenerIsAdded === false) {
					databaseListenerIsAdded = true;
					self.listenToDataChange();
				}
			} else {
			// No user is signed in.
			}
		});
		storageRef = firebase.storage().ref();	//get reference of images storage
		databaseRef = firebase.database().ref();
		$('input:radio').click(function() {
			let order = $("input[name=view-order]:checked").val();
			if(order === 'addedTimeDescrease') {
				self.sortItemsByAddedTimeDescending();
			} else if(order === 'addedTimeIncrease') {
				self.sortItemsByAddedTimeAscending();
			} else if(order === 'expiredDateDescrease') {
				self.sortItemsByExpiredTimeDescending();
			}else if(order === 'expiredDateIncrease') {
				self.sortItemsByExpiredTimeAscending();
			}
		});
		$('#myModal').modal('show');
	},
	components: {
		ItemDetail,
	}
}
</script>

<style scoped>

.item-avatar {
	display: block;
	max-width:150px;
	max-height:150px;
	width: auto;
	height: auto;
}

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