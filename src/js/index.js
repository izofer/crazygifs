import '../css/styles.css';
import '../css/stylus.styl';
import Vue from 'vue';
import App from './App.vue';
import fav from '../imgs/favicon/crazy.ico';

new Vue({
	el: '#app',
	render: h => h(App)
});
