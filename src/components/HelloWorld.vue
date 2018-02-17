<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" class="btn btn-success">
      <i class="fa fa-book" aria-hidden="true"></i>
      Book
    </button>
    <input type="file" accept="image/*;capture=camera">
    <input type="file" accept="video/*;capture=camcorder">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
