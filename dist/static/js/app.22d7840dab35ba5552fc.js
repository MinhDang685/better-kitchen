webpackJsonp([1],{"0YOZ":function(t,e){},"1fhA":function(t,e){},"78C0":function(t,e){},"8KdJ":function(t,e){},"8f+o":function(t,e){},CXPn:function(t,e){},DEtk:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_firebase__=__webpack_require__("Sazm"),__WEBPACK_IMPORTED_MODULE_0_firebase___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__),__WEBPACK_IMPORTED_MODULE_1__components_AddItem_vue__=__webpack_require__("IPEC"),__WEBPACK_IMPORTED_MODULE_2__components_AddCategory_vue__=__webpack_require__("vw9D");__webpack_exports__.a={name:"NavBar",data:function data(){return{user:eval("("+window.localStorage.getItem("firebaseui::rememberedAccounts")+")")[0]}},mounted:function(){},components:{AddItem:__WEBPACK_IMPORTED_MODULE_1__components_AddItem_vue__.a,AddCategory:__WEBPACK_IMPORTED_MODULE_2__components_AddCategory_vue__.a},methods:{logOut:function(){__WEBPACK_IMPORTED_MODULE_0_firebase___default.a.auth().signOut()}}}},IPEC:function(t,e,a){"use strict";var s=a("Sazm"),i=a.n(s),n=(a("QmSG"),a("vw9D")),r=a("iW7V")(),o={},l={},c={},d=0,u="",m={},h=new CustomEvent("allImagesUploaded");function v(){var t=document.getElementById("item-name-input"),e=document.getElementById("expired-date-input"),a=(document.getElementById("item-note-input"),document.getElementById("category-select-form")),s=document.getElementById("file-upload");$("#addItemModal").modal("toggle"),t.value="",e.value="",a.value="-1",s.value="",s.previousElementSibling.querySelector("span").innerHTML="Chọn ảnh",m={}}var f={name:"AddItem",data:function(){return{images:[],lock:!1,categories:[],uploadedImages:""}},components:{AddCategory:n.a},methods:{toogleDatetimePicker:function(t){$("#"+t).data("DateTimePicker").toggle()},getImageURL:function(t){return URL.createObjectURL(t)},updateImagesList:function(t){var e=this;e.images=[],Array.prototype.forEach.call(t,function(t){e.images.push(t)})},uploadToStorage:function(t,e){var a=this;o.child(c.uid+"/"+e).put(t).then(function(t){a.uploadedImages+=t.metadata.fullPath+" ",++d===a.images.length&&(d=0,window.dispatchEvent(h))})},uploadAllSelectedFiles:function(t){this.uploadedImages=[],this.processFile(t,this.images[0],0)},updateItemImages:function(t){var e=i.a.database().ref(c.uid+"/Items/"+t);m.images=this.uploadedImages,e.set(m).then(function(){alert("Thêm item thành công"),v()})},processFile:function(t,e,a){var s=this;if(void 0!==e){s.lock=!0;var i=e.name.split("."),n=i[i.length-1],o=new Image;o.onload=function(){var e=o.width,i=o.height;e>i?e>1e3&&(i*=1e3/e,e=1e3):i>1e3&&(e*=1e3/i,i=1e3);var l=document.createElement("canvas");l.width=e,l.height=i,r.resize(o,l).then(function(e){s.processFile(t,s.images[a+1],a+1);var i="png"===n?"image/png":"image/jpeg";return r.toBlob(e,i,90)}).then(function(e){s.lock=!1;var a=new Date;s.uploadToStorage(e,t+"/"+a.getTime()+"."+n)})},o.src=URL.createObjectURL(e)}},submitItemInputedData:function(){var t=document.getElementById("item-name-input"),e=document.getElementById("expired-date-input"),a=document.getElementById("item-note-input"),s=document.getElementById("category-select-form"),n=document.getElementById("file-upload");if(!0!==function(){var t=document.getElementById("item-name-input"),e=document.getElementById("expired-date-input"),a=document.getElementById("category-select-form"),s=a.options[a.selectedIndex].value;return!0===t.checkValidity()&&!1===isNaN(moment(e.value,"DD-MM-YYYY hh:mm"))&&"-1"!==s||(alert("Kiểm tra lại tên và ngày hết hạn"),""===t.value?t.focus():""===e.value&&e.focus(),!1)}())return!1;var r=new Date;m={itemName:t.value,expiredDate:moment(e.value,"DD-MM-YYYY hh:mm").toString(),catId:s.options[s.selectedIndex].value,note:a.value,addedTime:r.toString()};var o=i.a.database().ref(c.uid+"/Items").push();u=o.key,""==n.value?o.set(m).then(function(){alert("Thêm item thành công"),v()}).catch(function(t){}):this.uploadAllSelectedFiles(o.key)}},mounted:function(){var t=this;c=i.a.auth().currentUser,o=i.a.storage().ref(),(l=i.a.database().ref()).child(c.uid+"/Categories").on("child_added",function(e){var a=e.val();a.id=e.key,t.categories.push(a)}),l.child(c.uid+"/Categories").on("child_removed",function(e){var a=e.val();a.id=e.key;for(var s=0;s<t.categories.length;s++)if(0===t.categories[s].id.localeCompare(a.id)){t.categories.splice(s,1);break}}),l.child(c.uid+"/Categories").on("child_changed",function(e){var a=e.val();a.id=e.key;for(var s=0;s<t.categories.length;s++)if(0===t.categories[s].id.localeCompare(a.id)){t.categories[s]=a;break}}),$("#datetimepicker2").datetimepicker({locale:"vi"}),window.addEventListener("allImagesUploaded",function(e){t.updateItemImages(u)});var e=document.querySelectorAll(".file-input");Array.prototype.forEach.call(e,function(e){var a=e.previousElementSibling,s=a.innerHTML;e.addEventListener("change",function(i){t.images=[];for(var n="",r=!1,o=0;o<this.files.length&&!1===r;o++)if("image/jpeg"!=this.files[o].type&&"image/png"!=this.files[o].type){e.value="",r=!0,alert("Chỉ chọn file ảnh png với jpeg thôi -_-");break}!0!==r&&((n=this.files&&this.files.length>1?(this.getAttribute("data-multiple-caption")||"").replace("{count}",this.files.length):i.target.value.split("\\").pop())?(a.querySelector("span").innerHTML=n,t.updateImagesList(this.files)):a.innerHTML=s)})})}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{display:"inline"}},[t._m(0),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"addItemModal",tabindex:"-1",role:"dialog","aria-labelledby":"myItemModalLabel"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),a("div",{staticClass:"modal-body"},[a("form",[t._m(2),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-10 col-xs-10"},[a("select",{staticClass:"form-control",attrs:{id:"category-select-form"}},[a("option",{attrs:{value:"-1",selected:"",disabled:"",hidden:""}},[t._v("loại danh mục")]),t._v(" "),t._l(t.categories,function(e){return a("option",{domProps:{value:e.id}},[t._v(t._s(e.catName))])})],2)]),t._v(" "),a("div",{staticClass:"col-xs-2 col-md-2"},[a("AddCategory")],1)]),t._v(" "),a("div",{staticClass:"row"},[t._m(3),t._v(" "),t._l(t.images,function(e){return a("div",{staticClass:"col-md-3 col-xs-4"},[a("div",{staticClass:"thumbnail",staticStyle:{width:"110px",height:"110px"}},[a("img",{attrs:{src:t.getImageURL(e),alt:e.name}})])])})],2),t._v(" "),t._m(4)])]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-success",staticStyle:{width:"20%"},attrs:{type:"button"},on:{click:function(e){t.submitItemInputedData()}}},[a("i",{staticClass:"fa fa-check-circle fa-lg",attrs:{"aria-hidden":"true"}}),t._v("\r\n    \t\t\tLưu\r\n    \t\t")]),t._v(" "),t._m(5)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-primary navbar-btn",attrs:{type:"button","data-toggle":"modal","data-target":"#addItemModal"}},[e("i",{staticClass:"fa fa-plus-square fa-lg",attrs:{"aria-hidden":"true"}}),this._v("\r\n     Thêm \r\n  ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])]),this._v(" "),e("h4",{staticClass:"modal-title",attrs:{id:"myItemModalLabel"}},[this._v("Thêm mới")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6 col-xs-12"},[e("input",{staticClass:"form-control",attrs:{type:"text",id:"item-name-input",maxlength:"100",placeholder:"Tên sản phẩm",required:""}})]),this._v(" "),e("div",{staticClass:"col-md-6 col-xs-12"},[e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group date",attrs:{id:"datetimepicker2"}},[e("input",{staticClass:"form-control",attrs:{type:"text",id:"expired-date-input",placeholder:"Ngày hết hạn",required:""}}),this._v(" "),e("span",{staticClass:"input-group-addon"},[e("span",{staticClass:"glyphicon glyphicon-calendar"})])])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-md-12 col-xs-12"},[e("label",{staticClass:"file-upload-label",staticStyle:{"font-size":"120%"},attrs:{for:"file-upload"}},[e("i",{staticClass:"fa fa-cloud-upload"}),this._v(" "),e("span",[this._v("Chọn ảnh")])]),this._v(" "),e("input",{staticClass:"file-input",attrs:{type:"file",id:"file-upload",accept:"image/*",capture:"camera","data-multiple-caption":"Đã chọn {count} ảnh",multiple:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-2 col-xs-12"},[this._v("\r\n\t\t\t  \t\tGhi chú\r\n\t\t\t  \t")]),this._v(" "),e("div",{staticClass:"col-md-10 col-xs-12"},[e("textarea",{staticClass:"form-control",staticStyle:{resize:"none"},attrs:{id:"item-note-input",rows:"3",maxlength:"500",placeholder:"Nhập ghi chú cho sản phẩm"}})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-danger",staticStyle:{width:"20%"},attrs:{type:"button","data-dismiss":"modal"}},[e("i",{staticClass:"fa fa-times-circle fa-lg",attrs:{"aria-hidden":"true"}}),this._v("\r\n        \t\tHủy\r\n        \t")])}]};var p=a("VU/8")(f,g,!1,function(t){a("8f+o")},"data-v-7e1f60fc",null);e.a=p.exports},JQwL:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i=a("DEtk"),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar navbar-default"},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"navbar-header"},[t._m(0),t._v(" "),a("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[t._v("\r\n        "+t._s(t.user.displayName)+"\r\n      ")]),t._v(" "),a("AddItem",{staticStyle:{display:"inline"}})],1),t._v(" "),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"bs-navbar-collapse-1"}},[a("ul",{staticClass:"nav navbar-nav"},[a("li",[a("router-link",{attrs:{to:"statistic"}},[t._v("Thống kê")])],1),t._v(" "),a("li",[a("router-link",{attrs:{to:"categories"}},[t._v("Danh mục")])],1)]),t._v(" "),t._m(1),t._v(" "),a("ul",{staticClass:"nav navbar-nav navbar-right"},[a("button",{staticClass:"btn btn-info btn-lg",staticStyle:{margin:"auto",display:"block"},on:{click:t.logOut}},[t._v("\r\n          Đăng xuất\r\n          "),a("i",{staticClass:"fa fa-sign-out",attrs:{"aria-hidden":"true"}})])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"navbar-toggle collapsed",attrs:{type:"button","data-toggle":"collapse","data-target":"#bs-navbar-collapse-1","aria-expanded":"false"}},[e("span",{staticClass:"sr-only"},[this._v("Toggle navigation")]),this._v(" "),e("span",{staticClass:"icon-bar"}),this._v(" "),e("span",{staticClass:"icon-bar"}),this._v(" "),e("span",{staticClass:"icon-bar"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("form",{staticClass:"navbar-form navbar-left"},[e("div",{staticClass:"form-group"},[e("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"tên sản phẩm"}})]),this._v(" "),e("button",{staticClass:"btn btn-success",attrs:{id:"button-search"}},[e("i",{staticClass:"fa fa-search",attrs:{"aria-hidden":"true"}}),this._v("\r\n          Tìm kiếm\r\n        ")])])}]};var r=function(t){a("wf/a")},o=a("VU/8")(i.a,n,!1,r,"data-v-98e2890e",null).exports,l=a("Sazm"),c=a.n(l),d={name:"App",data:function(){return{user:null}},components:{NavBar:o},methods:{},mounted:function(){var t=this;c.a.auth().onAuthStateChanged(function(e){t.user=e||null})}},u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[this.user?e("NavBar"):this._e(),this._v(" "),e("div",{staticClass:"container-fluid"},[this._m(0),this._v(" "),e("div",{staticClass:"row"},[e("router-view")],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{attrs:{id:"page-header"}})])}]};var m=a("VU/8")(d,u,!1,function(t){a("1fhA")},null,null).exports,h=a("/ocq"),v={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hello"},[e("h1",[this._v(this._s(this.msg))]),this._v(" "),this._m(0),this._v(" "),e("input",{attrs:{type:"file",accept:"image/*;capture=camera"}}),this._v(" "),e("input",{attrs:{type:"file",accept:"video/*;capture=camcorder"}})])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-success",attrs:{type:"button"}},[e("i",{staticClass:"fa fa-book",attrs:{"aria-hidden":"true"}}),this._v("\n    Book\n  ")])}]};a("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},v,!1,function(t){a("qoUo")},"data-v-92fc80da",null).exports;var f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid about"},[a("div",{staticClass:"row"},[a("div",{attrs:{id:"app-info"}},[a("i",{staticClass:"fa fa-book",attrs:{"aria-hidden":"true"}},[t._v("Author: ")]),t._v("\n\t\t\t"+t._s(t.author)+"\n\t\t\t-\n\t\t\t"),a("i",{staticClass:"fa fa-file-code-o",attrs:{"aria-hidden":"true"}},[t._v("Version: ")]),t._v("\n\t\t\t"+t._s(t.version)+"\n\t\t")])])])},staticRenderFns:[]};var g=a("VU/8")({name:"About",data:function(){return{author:"Min",version:"1.0"}}},f,!1,function(t){a("gncb")},"data-v-0ae43220",null).exports,p=a("QmSG"),_=a("Sazm"),C=a("2ahc"),b={name:"Login",data:function(){return{}},mounted:function(){new C.auth.AuthUI(_.auth()).start("#firebaseui-auth-container",{signInOptions:[_.auth.GoogleAuthProvider.PROVIDER_ID,_.auth.EmailAuthProvider.PROVIDER_ID],signInSuccessUrl:"/",callbacks:{uiShown:function(){document.getElementById("loader").style.display="none"}}})}},y={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"login"},[e("div",{attrs:{id:"firebaseui-auth-container"}}),this._v(" "),e("div",{attrs:{id:"loader"}},[e("i",{staticClass:"fa fa-spinner",attrs:{"aria-hidden":"true"}},[this._v("Loading...")])])])}]};var I=a("VU/8")(b,y,!1,function(t){a("0YOZ")},"data-v-7b08b76c",null).exports,j={},E={},w={},x=!1,D={name:"ItemDetail",computed:{},methods:{getElementId:function(){return"#"+this._uid},listenToDataChange:function(){var t=this;w.child(j.uid+"/Categories").once("value",function(e){e.forEach(function(e){var a=e.val();a.id=e.key,t.categories.push(a)})})},getItemCategoryInfo:function(){for(var t=0;t<this.categories.length;t++)if(0===this.categories[t].id.localeCompare(this.product.catId))return this.categories[t];return{name:"",color:""}},getFormatedTime:function(t){return moment(t).format("DD [tháng] MM [năm] YYYY, hh:mm a")},getDownloadURL:function(t){return E.child(t).getDownloadURL().then(function(t){return t})},addImageToList:function(t){var e=this;e.getDownloadURL(t).then(function(t){e.imageURLs.push(t)})},getItemImages:function(t){if(void 0!==t.images){var e=t.images.split(" ");if(e.length>0)for(var a=0;a<e.length-1;a++){var s=""+e[a];this.addImageToList(s)}else this.addImageToList("images/empty.jpg")}}},props:["product"],data:function(){return{categories:[],imageURLs:[]}},mounted:function(){var t=this;c.a.auth().onAuthStateChanged(function(e){e&&(j=e,t.listenToDataChange(),!1===x&&(x=!0))});E=c.a.storage().ref(),w=c.a.database().ref(),$(t.getElementId()).on("show.bs.modal",function(e){var a=$("#"+t._uid+" .cat-info"),s=t.getItemCategoryInfo();a.html(s.catName),a.css("color","#"+s.color),t.getItemImages(t.product)}),$(t.getElementId()).on("hide.bs.modal",function(e){t.imageURLs=[]})}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("button",{staticClass:"btn btn-primary navbar-btn",attrs:{type:"button","data-toggle":"modal","data-target":t.getElementId()}},[a("i",{staticClass:"fa fa-plus-square fa-lg",attrs:{"aria-hidden":"true"}}),t._v("\r\n\t Chi tiết \r\n\t")]),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:t._uid,tabindex:"-1",role:"dialog","aria-labelledby":"myItemDetailModalLabel"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(0),t._v(" "),"null"!==t.product?a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},[a("table",{staticClass:"table"},[a("tbody",[a("tr",[a("td",[t._v("Tên sản phẩm")]),t._v(" "),a("td",[t._v(t._s(t.product.itemName))])]),t._v(" "),t._m(1),t._v(" "),a("tr",[a("td",[t._v("Thêm lúc")]),t._v(" "),a("td",[t._v(t._s(t.getFormatedTime(t.product.addedTime)))])]),t._v(" "),a("tr",[a("td",[t._v("Hết hạn")]),t._v(" "),a("td",[t._v(t._s(t.getFormatedTime(t.product.expiredDate)))])]),t._v(" "),a("tr",[a("td",[t._v("Ghi chú")]),t._v(" "),a("td",[t._v(t._s(t.product.note))])])])])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},t._l(t.imageURLs,function(t){return a("img",{staticClass:"img-rounded img-responsive",attrs:{src:t,alt:""}})}))])]):t._e(),t._v(" "),a("div",{staticClass:"modal-footer"})])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])]),this._v(" "),e("h4",{staticClass:"modal-title",attrs:{id:"myItemDetailModalLabel"}},[this._v("Chi tiết")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",[this._v("Danh mục")]),this._v(" "),e("td",{staticClass:"cat-info"})])}]};var T={},B={},L={},A=!1,S={name:"Dashboard",data:function(){return{items:[],categories:[]}},computed:{},methods:{getFormatedTime:function(t){return moment(t).format("DD [tháng] MM [năm] YYYY, hh:mm a")},sortItemsByAddedTimeAscending:function(){this.items.sort(function(t,e){return moment(t.addedTime)>moment(e.addedTime)})},sortItemsByExpiredTimeAscending:function(){this.items.sort(function(t,e){return moment(t.expiredDate)>moment(e.expiredDate)})},sortItemsByAddedTimeDescending:function(){this.items.sort(function(t,e){return moment(t.addedTime)<moment(e.addedTime)})},sortItemsByExpiredTimeDescending:function(){this.items.sort(function(t,e){return moment(t.expiredDate)<moment(e.expiredDate)})},getDownloadURL:function(t){return B.child(t).getDownloadURL().then(function(t){return t})},getItemImage:function(t){if(void 0===t.images)return this.getDownloadURL("images/empty.jpg");var e=t.images.split(" ");if(e.length>0){var a=""+e[0];return this.getDownloadURL(a)}return this.getDownloadURL("images/empty.jpg")},listenToDataChange:function(){var t=this;L.child(T.uid+"/Categories").once("value",function(e){t.categories=e}),L.child(T.uid+"/Items").on("child_added",function(e){var a=e.val();a.id=e.key,t.getItemImage(a).then(function(e){a.avatar=e,t.items.push(a),t.sortItemsByAddedTimeDescending()})}),L.child(T.uid+"/Items").on("child_removed",function(e){var a=e.val();a.id=e.key;for(var s=0;s<t.items.length;s++)if(0===t.items[s].id.localeCompare(a.id)){t.items.splice(s,1);break}}),L.child(T.uid+"/Items").on("child_changed",function(e){var a=e.val();a.id=e.key;for(var s=!1,i=function(e){if(0===t.items[e].id.localeCompare(a.id)){if(void 0!==t.items[e].images&&0===a.images.localeCompare(t.items[e].images))return t.items[e]=a,"break";t.getItemImage(a).then(function(i){a.avatar=i,t.items[e]=a,s=!0})}},n=0;n<t.items.length&&!1===s;n++){if("break"===i(n))break}})}},mounted:function(){var t=this;c.a.auth().onAuthStateChanged(function(e){e&&(T=e,!1===A&&(A=!0,t.listenToDataChange()))});B=c.a.storage().ref(),L=c.a.database().ref(),$("input:radio").click(function(){var e=$("input[name=view-order]:checked").val();"addedTimeDescrease"===e?t.sortItemsByAddedTimeDescending():"addedTimeIncrease"===e?t.sortItemsByAddedTimeAscending():"expiredDateDescrease"===e?t.sortItemsByExpiredTimeDescending():"expiredDateIncrease"===e&&t.sortItemsByExpiredTimeAscending()}),$("#myModal").modal("show")},components:{ItemDetail:a("VU/8")(D,k,!1,function(t){a("8KdJ")},"data-v-6fa1174e",null).exports}},U={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid"},[t._m(0),t._v(" "),a("div",{staticClass:"row"},t._l(t.items,function(e){return a("div",{staticClass:"col-sm-6 col-md-3"},[a("div",{staticClass:"thumbnail",staticStyle:{height:"400px"}},[a("div",{staticStyle:{width:"150px",height:"150px"}},[a("img",{staticClass:"item-avatar",attrs:{src:e.avatar,alt:e.itemName}})]),t._v(" "),a("div",{staticClass:"caption"},[a("h3",[t._v(t._s(e.itemName))]),t._v(" "),a("p",[t._v(t._s(t.getFormatedTime(e.addedTime)))]),t._v(" "),a("p",[t._v(t._s(t.getFormatedTime(e.expiredDate)))]),t._v(" "),a("p",[a("ItemDetail",{attrs:{product:e}})],1)])])])}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},[a("div",{staticClass:"col-xs-6 col-sm-6 col-md-2 col-lg-2 radio-toolbar"},[a("input",{attrs:{id:"#addedTimeDescrease",type:"radio",name:"view-order",value:"addedTimeDescrease",checked:"true"}}),t._v(" "),a("label",{attrs:{for:"#addedTimeDescrease"}},[t._v(" Ngày thêm gần nhất\n\t    \t\t\t")])]),t._v(" "),a("div",{staticClass:"col-xs-6 col-sm-6 col-md-2 col-lg-2 radio-toolbar"},[a("input",{attrs:{id:"#addedTimeIncrease",type:"radio",name:"view-order",value:"addedTimeIncrease"}}),t._v(" "),a("label",{attrs:{for:"#addedTimeIncrease"}},[t._v(" Ngày thêm lâu nhất\n    \t\t\t")])]),t._v(" "),a("div",{staticClass:"col-xs-6 col-sm-6 col-md-2 col-lg-2 radio-toolbar"},[a("input",{attrs:{id:"#expiredDateDescrease",type:"radio",name:"view-order",value:"expiredDateDescrease"}}),t._v(" "),a("label",{attrs:{for:"#expiredDateDescrease"}},[t._v(" Ngày hết hạn gần nhất\n    \t\t\t")])]),t._v(" "),a("div",{staticClass:"col-xs-6 col-sm-6 col-md-2 col-lg-2 radio-toolbar"},[a("input",{attrs:{id:"#expiredDateIncrease",type:"radio",name:"view-order",value:"expiredDateIncrease"}}),t._v(" "),a("label",{attrs:{for:"#expiredDateIncrease"}},[t._v(" Ngày hết hạn lâu nhất\n    \t\t\t")])])])])}]};var M=a("VU/8")(S,U,!1,function(t){a("JQwL")},"data-v-a0a5eb9e",null).exports,R=a("mtWM"),z=a.n(R),P=a("WaEV"),O=a.n(P),F=void 0;var q={name:"Statistic",methods:{getTotalItemByCategory:function(){return c.a.auth().currentUser.getIdToken().then(function(t){var e={url:"/categories/statistic",method:"get",baseURL:"https://us-central1-better-kitchen.cloudfunctions.net/app",headers:{Authorization:"Bearer "+t}};return z.a.request(e)})},getCatsName:function(){var t=[];return this.totalItemByCategory.forEach(function(e){t.push(e.catName)}),t},getCatsData:function(){var t=[];return this.totalItemByCategory.forEach(function(e){t.push(e.totalItems)}),t},drawPieChart:function(){var t=this.getCatsName(),e=function(t){for(var e=[],a=0;a<t;a++)e.push(getRandomColor());return e}(t.length),a={datasets:[{data:this.getCatsData(),backgroundColor:e}],labels:t};new O.a(F,{type:"pie",data:a})}},mounted:function(){var t=this;F=document.getElementById("itemsByCategoryChart"),document.getElementById("itemsAddedByTimeChart");c.a.auth().onAuthStateChanged(function(e){e&&(t.user=e,t.getTotalItemByCategory().then(function(e){return t.totalItemByCategory=e.data,c.a.database().ref(t.user.uid+"/Items").once("value")}).then(function(e){e.forEach(function(e){var a=e.val();a.id=e.key,t.items.push(a)}),t.drawPieChart()}))})},data:function(){return{totalItemByCategory:[],items:[],user:{}}},components:{}},N={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},[a("div",{staticClass:"panel panel-info"},[a("div",{staticClass:"panel-heading"},[a("h3",{staticClass:"panel-title"},[t._v("Số lượng item theo danh mục")])]),t._v(" "),a("div",{staticClass:"panel-body"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-8 col-lg-8"},[a("canvas",{attrs:{id:"itemsByCategoryChart",width:"200",height:"200"}})])])])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12"},[a("div",{staticClass:"panel panel-info"},[a("div",{staticClass:"panel-heading"},[a("h3",{staticClass:"panel-title"},[t._v("Số lượng item đã thêm theo thời gian")])]),t._v(" "),a("div",{staticClass:"panel-body"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-8 col-lg-8"},[a("canvas",{attrs:{id:"itemsAddedByTimeChart",width:"200",height:"200"}})]),t._v(" "),a("div",{staticClass:"col-xs-12 col-sm-12 col-md-4 col-lg-4"},[a("div",{staticClass:"col-xs-6 col-sm-6 col-md-6 col-lg-6 radio-toolbar"},[a("input",{attrs:{id:"#view-by-month",type:"radio",name:"view-type",value:"month",checked:"true"}}),t._v(" "),a("label",{attrs:{for:"#view-by-month"}},[t._v(" Xem theo tháng\r\n\t\t\t    \t\t\t")])]),t._v(" "),a("div",{staticClass:"col-xs-6 col-sm-6 col-md-6 col-lg-6 radio-toolbar"},[a("input",{attrs:{id:"#view-by-day",type:"radio",name:"view-type",value:"day"}}),t._v(" "),a("label",{attrs:{for:"#view-by-day"}},[t._v(" Xem theo ngày\r\n\t\t\t    \t\t\t")])])])])])])])])}]};var V=a("VU/8")(q,N,!1,function(t){a("CXPn")},"data-v-74443a5e",null).exports,Y={name:"Categories",data:function(){return{categories:[]}},computed:{},methods:{getFormatedTime:function(t){return moment(t).format("DD [tháng] MM [năm] YYYY, hh:mm a")},getBackgroundColor:function(t){return"bgcolor: "+t},listenToDataChange:function(){},getTotalItemByCategory:function(){return c.a.auth().currentUser.getIdToken().then(function(t){var e={url:"/categories/statistic",method:"get",baseURL:"https://us-central1-better-kitchen.cloudfunctions.net/app",headers:{Authorization:"Bearer "+t}};return z.a.request(e)})}},mounted:function(){var t=this;c.a.auth().onAuthStateChanged(function(e){e&&(e,t.getTotalItemByCategory().then(function(e){t.categories=e.data}))});c.a.storage().ref(),c.a.database().ref()},components:{}},H={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-xs-12 col-sm-12 col-md-6 col-lg-6"},[a("table",{staticClass:"table"},[t._m(0),t._v(" "),a("tbody",t._l(t.categories,function(e){return a("tr",[a("td",[t._v(t._s(e.catName))]),t._v(" "),a("td",[t._v(t._s(e.totalItems))]),t._v(" "),a("td",{attrs:{bgcolor:e.color}})])}))])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("\r\n\t\t\t\t\t\t\tTên danh mục\r\n\t\t\t\t\t\t")]),this._v(" "),e("th",[this._v("\r\n\t\t\t\t\t\t\tSố lượng item\r\n\t\t\t\t\t\t")]),this._v(" "),e("th",[this._v("\r\n\t\t\t\t\t\t\tMàu sắc\r\n\t\t\t\t\t\t")])])])}]};var K=a("VU/8")(Y,H,!1,function(t){a("78C0")},"data-v-57a9b78d",null).exports;s.a.use(h.a);var W=new h.a({routes:[{path:"/",component:M},{path:"/about",component:g},{path:"/login",component:I},{path:"/statistic",component:V},{path:"/categories",component:K}]}),X=a("Sazm");a("2ahc");s.a.config.productionTip=!1,new s.a({el:"#app",router:W,created:function(){var t=this;X.initializeApp(p.b),X.auth().onAuthStateChanged(function(e){e?t.$router.push("/"):t.$router.push("/login")})},components:{App:m},template:"<App/>"})},QmSG:function(t,e,a){"use strict";a.d(e,"b",function(){return s}),a.d(e,"a",function(){return i});var s={apiKey:"AIzaSyDy7SVdKJpujVTPpgXhwtzw5YsZCMkRRus",authDomain:"better-kitchen.firebaseapp.com",databaseURL:"https://better-kitchen.firebaseio.com",projectId:"better-kitchen",storageBucket:"better-kitchen.appspot.com",messagingSenderId:"38255703807"};var i=["#89bdd3","#6ed3cf","#9068be","#e62739","#fae596","#3fb0ac","#173e43","#b56969","#daad86"]},dhfy:function(t,e){},gncb:function(t,e){},qoUo:function(t,e){},uslO:function(t,e,a){var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(t){return a(n(t))}function n(t){var e=s[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}i.keys=function(){return Object.keys(s)},i.resolve=n,t.exports=i,i.id="uslO"},vw9D:function(t,e,a){"use strict";var s=a("QmSG"),i=a("Sazm"),n=a.n(i),r={};var o={name:"AddCategory",methods:{submitCategoryInputedData:function(){if(!1!==function(){if(!0===document.getElementById("cat-name-input").checkValidity())return!0}()){var t=document.getElementById("cat-name-input"),e=$("input[name=cat-color]:checked").val(),a=n.a.database().ref(r.uid+"/Categories").push(),s={catName:t.value,color:e};a.set(s).then(function(){alert("Thêm danh mục thành công")}).catch(function(t){}),$("#addCategoryModal").modal("toggle")}else alert("Kiểm tra lại tên danh mục")},getColor:function(t){return"background-color: "+t},getColorId:function(t){return t.split("#")[1]}},mounted:function(){r=n.a.auth().currentUser},data:function(){return{backgroudColors:s.a}},components:{}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),t._v(" "),a("div",{staticClass:"modal fade",attrs:{id:"addCategoryModal",tabindex:"-1",role:"dialog","aria-labelledby":"myCategoryModalLabel"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[t._m(1),t._v(" "),a("div",{staticClass:"modal-body"},[a("form",[t._m(2),t._v(" "),t._m(3),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12 col-xs-12"},[t._m(4),t._v(" "),t._l(t.backgroudColors,function(e){return a("div",[a("div",{staticClass:"col-xs-4 col-sm-4 col-md-2 col-lg-2 radio-toolbar"},[a("input",{attrs:{id:t.getColorId(e),type:"radio",name:"cat-color"},domProps:{value:t.getColorId(e)}}),t._v(" "),a("label",{staticStyle:{width:"100%",height:"30px","margin-top":"10px"},style:t.getColor(e),attrs:{for:t.getColorId(e)}})])])})],2)])])]),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-success",staticStyle:{width:"20%"},attrs:{type:"button"},on:{click:function(e){t.submitCategoryInputedData()}}},[a("i",{staticClass:"fa fa-check-circle fa-lg",attrs:{"aria-hidden":"true"}}),t._v("\r\n    \t\t\tLưu\r\n    \t\t")]),t._v(" "),t._m(5)])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-success",attrs:{type:"button","data-toggle":"modal","data-target":"#addCategoryModal"}},[e("i",{staticClass:"fa fa-plus-square fa-lg",attrs:{"aria-hidden":"true"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[this._v("×")])]),this._v(" "),e("h4",{staticClass:"modal-title",attrs:{id:"myCategoryModalLabel"}},[this._v("Thêm danh mục")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6 col-xs-12"},[e("input",{staticClass:"form-control",attrs:{type:"text",id:"cat-name-input",maxlength:"100",placeholder:"Tên danh mục",required:""}}),this._v(" "),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",staticStyle:{margin:"auto"}},[e("h3",[e("span",{staticClass:"label label-info "},[this._v("Màu nền")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-xs-4 col-sm-4 col-md-2 col-lg-2 radio-toolbar"},[e("input",{attrs:{id:"#9ad3de",type:"radio",name:"cat-color",value:"9ad3de",checked:"true"}}),this._v(" "),e("label",{staticStyle:{"background-color":"#9ad3de",width:"100%",height:"30px","margin-top":"10px"},attrs:{for:"#9ad3de"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-danger",staticStyle:{width:"20%"},attrs:{type:"button","data-dismiss":"modal"}},[e("i",{staticClass:"fa fa-times-circle fa-lg",attrs:{"aria-hidden":"true"}}),this._v("\r\n        \t\tHủy\r\n        \t")])}]};var c=a("VU/8")(o,l,!1,function(t){a("dhfy")},"data-v-225265ab",null);e.a=c.exports},"wf/a":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.22d7840dab35ba5552fc.js.map