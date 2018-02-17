<template>

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">
        {{user.displayName}}
      </a> 
      <AddItem style="display: inline"/>
    </div>
    <div class="collapse navbar-collapse" id="bs-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><router-link to="statistic">Thống kê</router-link></li>
        <li> <router-link to="categories">Danh mục</router-link></li>
      </ul>
      <form class="navbar-form navbar-left"
      style="">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="tên sản phẩm">
        </div>
        <button id="button-search" class="btn btn-success">
          <i class="fa fa-search" aria-hidden="true"></i>
          Tìm kiếm
        </button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <button class="btn btn-info btn-lg" @click='logOut' 
                style="margin:auto;display:block;">
          Đăng xuất
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </button>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
import firebase from 'firebase';
import AddItem from '@/components/AddItem.vue'
import AddCategory from '@/components/AddCategory.vue'
export default {
  name: 'NavBar',
  data() {
    return {
      user: eval('(' + window.localStorage.getItem("firebaseui::rememberedAccounts") + ')')[0],
    }
  },
  mounted() {
    
  },
  components: {
    AddItem,
    AddCategory,
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    }
  },
}
</script>
<style scoped>
#bs-navbar-collapse-1{
  margin-left: 200px
}
@media only screen and (max-width: 720px) {
  #button-search{
    display: block;    
    margin: auto;
    width: 50%;    
  }
  #bs-navbar-collapse-1{
    margin-left: 0px
  }   
}
</style>
