const path      = require('path');
const ETPlugin  = require('extract-text-webpack-plugin');
//const cleanWebp = require('clean-webpack-plugin');
const uglify 	= require('uglifyjs-webpack-plugin');

const paths = {
	index: path.resolve(__dirname, 'src/js/index.js'),
	build: path.resolve(__dirname, 'public')
}


module.exports = (env) => {
	let plugins = [];

	if(env.NODE_ENV === 'prod')
	{
		plugins = [
			new ETPlugin('css/[name].css'),
			new uglify()
		]
	}
	else
	{
		plugins = [ 
			new ETPlugin('css/[name].css')
		]
	}

	return {
		entry:{
			app:[
				paths.index
			]
		},
		output:{
			path: paths.build,
			filename: 'js/[name].js',
			publicPath: './public/'
		},
		module:{
			rules:[
				{
					test: /\.js$/,
					use:{
						loader: 'babel-loader',
						options: {
							presets: ['es2015','env']
						}
					}
				},
				{
					test:/\.vue$/,
					use:{
						loader:'vue-loader',
						options:{
							loaders:{/*others loaders here*/}
						}
					}
				},
				{
					test:/\.css$/,
					use: ETPlugin.extract({
						//fallback: 'style-loader',
						use: 'css-loader'
					})
				},
				{
					test:/\.styl$/,
					use: ETPlugin.extract({
						use:['css-loader',
							{
								'loader': 'stylus-loader',
								options:{
									use:[
										require('nib'),
										require('rupture')
									],
									import:[
										'~nib/lib/nib/index.styl',
										'~rupture/rupture/index.styl'
									]
								}
							}
						]
					})
				},
				{
					test: /\.ico$/,
					use:{
						loader: 'url-loader',
						options: {
							name: 'imgs/favicon/[name].[ext]'
						}
					}
				},
			]
		},
		plugins
	}
}