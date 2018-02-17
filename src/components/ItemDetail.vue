<template>

<div>
	<button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" :data-target="getElementId()">
	<i class="fa fa-plus-square fa-lg" aria-hidden="true"></i>
	&nbsp;Chi tiết 
	</button>
	<div class="modal fade" :id="_uid" tabindex="-1" role="dialog" aria-labelledby="myItemDetailModalLabel">
		<div class="modal-dialog" role="document">
		  <div class="modal-content">
		    <div class="modal-header">
		      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		      <h4 class="modal-title" id="myItemDetailModalLabel">Chi tiết</h4>
		    </div>
		    <div class="modal-body" v-if="product !== 'null'">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<table class="table">
							<tbody>
								<tr>
									<td>Tên sản phẩm</td>
									<td>{{product.itemName}}</td>
								</tr>
								<tr>
									<td>Danh mục</td>
									<td class="cat-info"></td>
								</tr>
								<tr>
									<td>Thêm lúc</td>
									<td>{{getFormatedTime(product.addedTime)}}</td>
								</tr>
								<tr>
									<td>Hết hạn</td>
									<td>{{getFormatedTime(product.expiredDate)}}</td>
								</tr>
								<tr>
									<td>Ghi chú</td>
									<td>{{product.note}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<img :src="image" class="img-rounded img-responsive" alt="" v-for="image in imageURLs">
					</div>					
				</div>
		    </div>
		    <div class="modal-footer">
				<!-- <button type="button" class="btn btn-success" v-on:click="submitItemInputedData()"
				style="width: 20%">
					<i class="fa fa-check-circle fa-lg" aria-hidden="true"></i>
					Lưu
				</button>
		    	<button type="button" class="btn btn-danger" data-dismiss="modal" 
		    	style="width: 20%">
		    		<i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
		    		Hủy
		    	</button> -->
		    </div>
		  </div>
		</div>
	</div>
</div>		

</template>

<script>

import firebase from 'firebase';
let user = {};
let storageRef = {};
let databaseRef = {};
let databaseListenerIsAdded = false;
export default {
	name: 'ItemDetail',
	computed: {
	},
	methods: {
		getElementId: function() {
			let self = this;
			return `#${self._uid}`;
		},
		listenToDataChange: function() {
			let self = this;
			databaseRef.child(`${user.uid}/Categories`).once('value', function(snapshot) {
				snapshot.forEach(function(category) {
					let obj = category.val();
					obj.id = category.key;
					self.categories.push(obj);
				});
			});
		},
		getItemCategoryInfo: function() {
			let self = this;
			for(let i = 0; i < self.categories.length; i++) {
				if(self.categories[i].id.localeCompare(self.product.catId) === 0) {
					return self.categories[i];
				}
			}
			return {
				'name': '',
				'color': '',
			};
		},
		getFormatedTime: function(date) {
			let self = this;
			return moment(date).format('DD [tháng] MM [năm] YYYY, hh:mm a');
		},
		getDownloadURL: function(fullPath) {
			let self = this;
			let urlPromise = storageRef.child(fullPath).getDownloadURL()
			.then(function(url) {
				return url;
			});
			return urlPromise;
		},
		addImageToList: function(url) {
			let self = this;
			self.getDownloadURL(url)
			.then(function(res) {
				self.imageURLs.push(res);
			});
		},
		getItemImages: function(item) {
			let self = this;
			if(typeof item.images === 'undefined') {
				return;
			}
			let images = item.images.split(' ');
			if(images.length > 0) {
				for(let i = 0; i < images.length - 1; i++) {
					let fullPath = `${images[i]}`;
					self.addImageToList(fullPath);
				}
				return;
			}
			else {
				self.addImageToList('images/empty.jpg');
				return;
			}
		},
	},
	props: [
		'product'
	],
	data: function() {
		return {
			categories: [],
			imageURLs: [],
		}
	},
	mounted() {
		let self = this;
		let authListener = firebase.auth().onAuthStateChanged(function(signinedUser) {
			if (signinedUser) {
				user = signinedUser;	
				self.listenToDataChange();
				if(databaseListenerIsAdded === false) {
					databaseListenerIsAdded = true;
				}
			} else {
			// No user is signed in.
			}
		});
		storageRef = firebase.storage().ref();	//get reference of images storage
		databaseRef = firebase.database().ref();
		$(self.getElementId()).on('show.bs.modal', function (e) {
			let catInfoDiv = $(`#${self._uid} .cat-info`);
			let catInfo = self.getItemCategoryInfo();
			catInfoDiv.html(catInfo.catName);
			catInfoDiv.css('color', `#${catInfo.color}`);
			self.getItemImages(self.product);
		});
		$(self.getElementId()).on('hide.bs.modal', function (e) {
			self.imageURLs = [];
		});
	}
}

</script>

<style scoped>
	
</style>