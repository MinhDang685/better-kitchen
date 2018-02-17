<template>

<div>
  <button type="button" class="btn btn-success" data-toggle="modal" data-target="#addCategoryModal">
	<i class="fa fa-plus-square fa-lg" aria-hidden="true"></i>
  </button>
  <div class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-labelledby="myCategoryModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myCategoryModalLabel">Thêm danh mục</h4>
        </div>
        <div class="modal-body">
	    	<form>
			  <div class="row">
			    <div class="col-md-6 col-xs-12">
			      <input type="text" id="cat-name-input" maxlength="100" class="form-control" placeholder="Tên danh mục" required>
			      <br>
			    </div>
			  </div>
			  <div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin: auto;">
					<h3><span class="label label-info ">Màu nền</span></h3>
				</div>
			  </div>
			  <div class="row">
			  	<div class="col-md-12 col-xs-12">
			  		<div class="col-xs-4 col-sm-4 col-md-2 col-lg-2 radio-toolbar">
			    		<input id="#9ad3de" type="radio" name="cat-color" value="9ad3de" checked="true">
			    		<label for="#9ad3de" style="background-color: #9ad3de; width: 100%; height: 30px;margin-top: 10px">
		    			</label>
			    	</div>
				    <div v-for="myColor in backgroudColors">
				    	<div class="col-xs-4 col-sm-4 col-md-2 col-lg-2 radio-toolbar">
				    		<input :id="getColorId(myColor)" type="radio" name="cat-color" :value="getColorId(myColor)">
				    		<label :for="getColorId(myColor)" :style="getColor(myColor)" style="width: 100%; height: 30px;margin-top: 10px">
			    			</label>
				    	</div>
				    </div>
			    </div>
			  </div>
			</form>
        </div>
        <div class="modal-footer">
    		<button type="button" class="btn btn-success" v-on:click="submitCategoryInputedData()"
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
	import {colors} from '../config';
	import firebase from 'firebase';
	let user = {};
	function checkValidInput() {
		let catNameInput = document.getElementById('cat-name-input');
		if(catNameInput.checkValidity() === true)
			return true;
	}
	export default {
		name: 'AddCategory',
		methods: {
			submitCategoryInputedData: function() {
				if(checkValidInput() === false) {
					alert("Kiểm tra lại tên danh mục");
					return;
				}
				let catNameInput = document.getElementById('cat-name-input');
				let catColor = $("input[name=cat-color]:checked").val();
				let ref = firebase.database().ref(`${user.uid}/Categories`).push();
				let catInfo = {
					catName: catNameInput.value,
					color: catColor,
				}
				ref.set(catInfo)
			        .then(function () {
			        	alert('Thêm danh mục thành công');
			        })
			        .catch(function (error) {
			        });
				$('#addCategoryModal').modal('toggle');
			},
			getColor: function(color) {
				return `background-color: ${color}`;
			},
			getColorId: function(color) {
				let colorId = color.split('#');
				return colorId[1];
			}
		},
		mounted() {
			let self = this;
			user = firebase.auth().currentUser;
		},
		data() {
			return{
				backgroudColors: colors,
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
  cursor: pointer;
}

.radio-toolbar input[type="radio"]:checked+label {
  border-style: outset;
  border-radius: 10px;
}

</style>