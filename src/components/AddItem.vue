<template>

<div style="display: inline">
  <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#addItemModal">
	<i class="fa fa-plus-square fa-lg" aria-hidden="true"></i>
    &nbsp;Thêm 
  </button>
  <div class="modal fade" id="addItemModal" tabindex="-1" role="dialog" aria-labelledby="myItemModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myItemModalLabel">Thêm mới</h4>
        </div>
        <div class="modal-body">
	    	<form>
			  <div class="row">
			    <div class="col-md-6 col-xs-12">
			      <input type="text" id="item-name-input" maxlength="100" class="form-control" placeholder="Tên sản phẩm" required>
			    </div>
			    <div class="col-md-6 col-xs-12">
			    	<div class="form-group">
		                <div class='input-group date' id='datetimepicker2'>
		                    <input type='text' id="expired-date-input" class="form-control" placeholder="Ngày hết hạn" required/>
					      	<span class="input-group-addon">
		                        <span class="glyphicon glyphicon-calendar"></span>
		                    </span>
		                </div>
		            </div>
			    </div>
			  </div>
			  <div class="row">
			  	<div class="col-md-10 col-xs-10">
			  		<select class="form-control" id="category-select-form">
						<option value="-1" selected disabled hidden>loại danh mục</option>
						<option v-for="category in categories" :value="category.id">{{category.catName}}</option>
					</select>
			  	</div>
			  	<div class="col-xs-2 col-md-2">
				    <AddCategory/>
			    </div>
			  </div>
			  <div class="row">
				<div class="col-md-12 col-xs-12">
			  		<label for="file-upload" class="file-upload-label" style="font-size: 120%">
					    <i class="fa fa-cloud-upload"></i>
					    <span>Chọn ảnh</span>
					</label>
			  		<input type="file" id="file-upload" class="file-input" accept="image/*" capture="camera" data-multiple-caption="Đã chọn {count} ảnh" multiple/>
			  	</div>
			  	<div class="col-md-3 col-xs-4" v-for="image in images">
			  		<div class="thumbnail" style="width: 110px;height:110px">
			  			<img :src="getImageURL(image)" :alt="image.name">
			  		</div>
			  	</div>			  
			  </div>
			  <div class="row">
			  	<div class="col-md-2 col-xs-12">
			  		Ghi chú
			  	</div>
			  	<div class="col-md-10 col-xs-12">
			      <textarea id="item-note-input" class="form-control" rows="3" maxlength="500" placeholder="Nhập ghi chú cho sản phẩm" style="resize: none"></textarea>
			    </div>
			  </div>
			</form>

        </div>
        <div class="modal-footer">
    		<button type="button" class="btn btn-success" v-on:click="submitItemInputedData()"
    		style="width: 20%">
    			<i class="fa fa-check-circle fa-lg" aria-hidden="true"></i>
    			Lưu
    		</button>
        	<button type="button" class="btn btn-danger" data-dismiss="modal" 
        	style="width: 20%">
        		<i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
        		Hủy
        	</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import firebase from 'firebase';
import {getCurrentUser} from '../config.js';
import AddCategory from '@/components/AddCategory.vue';
const pica = require('pica')();
let storageRef = {};
let databaseRef = {};
let user = {};
let uploadedCount = 0;
let itemId = '';
let itemInfo = {};
let allImagesUploadedEvent = new CustomEvent('allImagesUploaded');
function dataURItoBlob(dataURI) {
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0)
	    byteString = atob(dataURI.split(',')[1]);
	else
	    byteString = unescape(dataURI.split(',')[1]);

	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
	    ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ia], {type:mimeString});
}
function picaResize(file) {
	let img = new Image();
	let to = document.createElement("canvas");
	img.onload = function() {
		pica.resize(img, to) 
			.then(result => pica.toBlob(result, 'image/jpeg', 90)) 
			.then(blob => {
				return blob;
			});

	};
	img.src = URL.createObjectURL(file);
}
function resizeImage(file) {
	var img = document.createElement("img");
	var reader = new FileReader();  
	reader.onload = function(e) {img.src = e.target.result}
	reader.readAsDataURL(file);

	var canvas = document.createElement("canvas");
	var MAX_WIDTH = 800;
	var MAX_HEIGHT = 600;
	var width = img.width;
	var height = img.height;
	
	if (width > height) {
	  if (width > MAX_WIDTH) {
	    height *= MAX_WIDTH / width;
	    width = MAX_WIDTH;
	  }
	} else {
	  if (height > MAX_HEIGHT) {
	    width *= MAX_HEIGHT / height;
	    height = MAX_HEIGHT;
	  }
	}
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height);

	var dataurl = canvas.toDataURL('image/png');
	return dataurl;
}
function checkValidInput() {
	let itemNameInput = document.getElementById('item-name-input');
	let expiredDateInput = document.getElementById('expired-date-input');
	let categorySelectForm = document.getElementById('category-select-form');
	let categoryInput = categorySelectForm.options[categorySelectForm.selectedIndex].value;
	if(itemNameInput.checkValidity() === true && 
		isNaN(moment(expiredDateInput.value, "DD-MM-YYYY hh:mm")) === false && 
		categoryInput !== '-1') {
		return true;
	}
	alert('Kiểm tra lại tên và ngày hết hạn');
	if(itemNameInput.value === '') {
		itemNameInput.focus();
	}
	else if(expiredDateInput.value === '') {
		expiredDateInput.focus();
	}
	return false;
}

function resetModal() {
	let itemNameInput = document.getElementById('item-name-input');
	let expiredDateInput = document.getElementById('expired-date-input');
	let itemNoteInput = document.getElementById('item-note-input');
	let categoryInput = document.getElementById('category-select-form');
	let fileUploadInput = document.getElementById('file-upload');
	$('#addItemModal').modal('toggle');
    itemNameInput.value = '';
    expiredDateInput.value = '';
    categoryInput.value = '-1';
    fileUploadInput.value = '';
    fileUploadInput.previousElementSibling.querySelector('span').innerHTML = 'Chọn ảnh';
    itemInfo = {};
}

export default {
	name: 'AddItem',
	data() {
		return{
			images: [],
			lock: false,
			categories: [],
			uploadedImages: ''
		}
	},
	components: {
		AddCategory,
	},
	methods: {
		toogleDatetimePicker: function(id) {
			$(`#${id}`).data("DateTimePicker").toggle();
		},
		getImageURL: function(image) {
			return URL.createObjectURL(image);
		},
		updateImagesList: function(arr) {
			let self = this;
			self.images = [];
			Array.prototype.forEach.call(arr, function(image){
				self.images.push(image);
			});
		},
		uploadToStorage: function(file, name) {
			let self = this;
			let imageRef = storageRef.child(`${user.uid}/${name}`);
			imageRef.put(file).then(function(snapshot) {
				self.uploadedImages += `${snapshot.metadata.fullPath} `;
				uploadedCount++;
				if(uploadedCount === self.images.length) {
					uploadedCount = 0;
					window.dispatchEvent(allImagesUploadedEvent);
				}
			});
		},
		uploadAllSelectedFiles: function(itemId) {
			let self = this;
			self.uploadedImages = [];
			self.processFile(itemId, self.images[0], 0);
		},
		updateItemImages: function(itemId) {
			let self = this;
			let ref = firebase.database().ref(`${user.uid}/Items/${itemId}`);
			itemInfo.images = self.uploadedImages;
			ref.set(itemInfo)
			.then(function() {
				alert('Thêm item thành công');
				resetModal();
			});
		},
		processFile: function(itemId, image, index) {
			let self = this;
			if(typeof image === 'undefined') {
				return;
			}
			self.lock = true;
			let filenameSplit = image.name.split('.');
			let fileType = filenameSplit[filenameSplit.length - 1];
			let img = new Image();
			img.onload = function() {
				let MAX_WIDTH = 1000;
				let MAX_HEIGHT = 1000;
				let width = img.width;
				let height = img.height;
				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				let to = document.createElement("canvas");
				to.width = width;
				to.height = height;
				pica.resize(img, to) 
					.then(result => {
						self.processFile(itemId, self.images[index+1], index+1);
						let type = (fileType === 'png') ? 'image/png' : 'image/jpeg';
						return pica.toBlob(result, type, 90);
					}) 
					.then(blob => {
						self.lock = false;
						let date = new Date();
						self.uploadToStorage(blob, `${itemId}/${date.getTime()}.${fileType}`);
					});
			};
			img.src = URL.createObjectURL(image);	
		},
		submitItemInputedData: function() {
			let self = this;
			let itemNameInput = document.getElementById('item-name-input');
			let expiredDateInput = document.getElementById('expired-date-input');
			let itemNoteInput = document.getElementById('item-note-input');
			let categoryInput = document.getElementById('category-select-form');
			let fileUploadInput = document.getElementById('file-upload');
			if(checkValidInput() !== true) {
				return false;
			}
			let date = new Date();
			itemInfo = {
				'itemName': itemNameInput.value,
				'expiredDate': moment(expiredDateInput.value, "DD-MM-YYYY hh:mm").toString(),
				'catId': categoryInput.options[categoryInput.selectedIndex].value,
				'note': itemNoteInput.value,
				'addedTime': date.toString(),
			};
			let ref = firebase.database().ref(`${user.uid}/Items`).push();
			itemId = ref.key;
			if(fileUploadInput.value == '') {
				ref.set(itemInfo)
			        .then(function () {
			        	alert('Thêm item thành công');
			        	resetModal();
			        })
			        .catch(function (error) {
			        });
			}
			else {
				self.uploadAllSelectedFiles(ref.key);
			}
		},
	},
	mounted: function() {
		let self = this;
		user = firebase.auth().currentUser;
		storageRef = firebase.storage().ref();	//get reference of images storage
		databaseRef = firebase.database().ref();
		//database listener
		databaseRef.child(`${user.uid}/Categories`).on('child_added', function(snapshot) {
			let currentCategory = snapshot.val();
			currentCategory.id = snapshot.key;
			self.categories.push(currentCategory);
		});
		databaseRef.child(`${user.uid}/Categories`).on('child_removed', function(snapshot) {
			let currentCategory = snapshot.val();
			currentCategory.id = snapshot.key;
			for(let i = 0; i < self.categories.length; i++) {
				if(self.categories[i].id.localeCompare(currentCategory.id) === 0) {
					self.categories.splice(i, 1);
					break;
				}
			}
		});
		databaseRef.child(`${user.uid}/Categories`).on('child_changed', function(snapshot) {
			let currentCategory = snapshot.val();
			currentCategory.id = snapshot.key;
			for(let i = 0; i < self.categories.length; i++) {
				if(self.categories[i].id.localeCompare(currentCategory.id) === 0) {
					self.categories[i] = currentCategory;
					break;
				}
			}
		});
		//enable datetimepicker
		$('#datetimepicker2').datetimepicker({
            locale: 'vi'
        });
        //all images uploaded event
        window.addEventListener('allImagesUploaded', function(e) {
        	self.updateItemImages(itemId);
        });
        //config image upload form
        var inputs = document.querySelectorAll('.file-input');
		Array.prototype.forEach.call( inputs, function(input)
		{
			var label	 = input.previousElementSibling,
				labelVal = label.innerHTML;
			input.addEventListener( 'change', function( e )
			{
				self.images = [];
				let fileName = '';
				let wrongInput = false;
				for(let i = 0; i < this.files.length && wrongInput === false; i++) {
					if(!(this.files[i].type == "image/jpeg" || this.files[i].type == "image/png")) {
						input.value = '';
						wrongInput = true;
						alert('Chỉ chọn file ảnh png với jpeg thôi -_-');
						break;
					}
				}

				if(wrongInput === true) return;
				if( this.files && this.files.length > 1 ) 
					fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
				else
					fileName = e.target.value.split( '\\' ).pop();

				if(fileName) {
						label.querySelector('span').innerHTML = fileName;
						self.updateImagesList(this.files);
					}
				else
					label.innerHTML = labelVal;
			});
		});

	},
}

</script>

<style scoped>

input[type="file"] {
	opacity: 0;
	position: absolute;
	z-index: -1;
}
.file-upload-label {
    /*border: 1px solid #ccc;*/
    color: #f1e5e6;
    background-color: #d3394c;
    max-width: 80%;
    font-size: 1.25rem;
    /* 20px */
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 0.625rem 1.25rem;
    /* 10px 20px */
}
.file-upload-label:hover {
	background-color: #722040;
}
img {
	display: block;
	max-width:100px;
	max-height:100px;
	width: auto;
	height: auto;
}

</style>