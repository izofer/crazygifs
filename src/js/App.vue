<template>
	<div id="app">
		<div class="titulo"><h1>{{welcome}}</h1></div>		
		<div class="cajas">
			<input type="text" value="2018" id="text" placeholder="Escribe algo para buscar" v-model="search">
			<select id="selector" v-model="limit">
				<option value="6" selected>6</option>
				<option value="12">12</option>
				<option value="18">18</option>
				<option value="24">24</option>
				<option value="30">30</option>
				<option value="60">todo</option>
			</select>
		</div>
		<waring v-show="waring"></waring>
		<spinner v-show="loading"></spinner>
		<div class="gifs">
			<imGifs v-for="imGif in imGifs" v-bind:imGif="imGif" v-bind:key="imGif|recorte"></imGifs>
		</div>
	</div>
</template>

<script>

	import getGifs from './api';
	import imGifs  from './components/imGifs.vue';
	import spinner from './components/spinner.vue';
	import waring  from './components/waring.vue';

	export default {
	  name: 'app',
	  data(){
	    return {
	      welcome: '- IzoCrazyGifs -',
	      imGifs:[],
	      limit: 6,
	      search: '2018',
	      loading: false,
	      waring: false,
	      isSearching: false
	    }
	  },
	  filters:{
	  	recorte: function(str){
	  		str = str.substring(40,24);
	  		return str;
	  	}
	  },
	  components:{
	  	imGifs,
	  	spinner,
	  	waring
	  },
	  methods:{
	  	refreshGifs(){
		  	const self = this;
		  	this.loading = true
			let limit  = self.limit; 
		  	let search = self.search;
		  	this.imGifs = [];

		  	getGifs(search,limit)
		  	.then(function(gifs){
		  		self.loading = false;
		  		let totalGifsUrl = [];
	  			limit = gifs.length - 1;

	  			if(gifs.length == 0)
	  			{
	  				self.waring = true;	
	  			}
	  			else
	  			{
	  				self.waring = false;

	  				for(let i = 0; i <= limit; i++)
			  		{
			  			setTimeout(() => {
			  				totalGifsUrl.push(gifs[i].images.original.url);
			  			},500);	
			  		}

			  		self.imGifs = totalGifsUrl;
	  			}
	  		}).catch(error => console.error(error))
	  	}
	  },
	  mounted(){
	  	this.refreshGifs()
	  },
	  watch:{
	  	limit(){
	  		this.refreshGifs();
	  	},
	  	search(){
	  		if(!this.search == '')
	  		{
	  			this.refreshGifs();
	  		}
	  	}
	  }
	}

</script>