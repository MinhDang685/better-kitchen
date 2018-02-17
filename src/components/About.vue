<template>
	<div class="container-fluid about">
		<div class="row">
			<div id="app-info">
				<i class="fa fa-book" aria-hidden="true">Author:&nbsp;</i>
				{{author}}
				-
				<i class="fa fa-file-code-o" aria-hidden="true">Version:&nbsp;</i>
				{{version}}
			</div>
		</div>
	</div>
</template>


<script>
export default {
  name: 'About',
  data () {
    return {
      author: 'Min',
      version: '1.0'
    }
  }
}
</script>

<style scoped>
	#app-info {

	}
</style>