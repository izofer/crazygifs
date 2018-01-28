<template>
	<img v-bind:src="imGif" width="200" height="200" />
</template>

<script> 
  export default {
    name: 'imGif',
    props:['imGif']
  }
</script>