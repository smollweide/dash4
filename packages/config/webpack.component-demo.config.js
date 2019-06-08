const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = (componentName) => {
	const config = {
		entry: './demo/index.tsx',
		plugins: [
			// File loader configuration for .woff and .woff2 files
			// File loader configuration for .gif .jpg .jpeg .png and .svg files
			// https://github.com/namics/webpack-config-plugins/tree/master/packages/asset-config-webpack-plugin
			new AssetConfigWebpackPlugin(),
			// Cleans the dist folder before the build starts
			new CleanWebpackPlugin(),
			// Generate a base html file and injects all generated css and js files
			new HtmlWebpackPlugin({
				title: componentName,
				template: 'demo/index.html',
				meta: {
					viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
				},
			}),
			// SCSS Configuration for .css .module.css and .scss .module.scss files
			// see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
			new ScssConfigWebpackPlugin(),
			// Multi threading typescript loader configuration with caching for .ts and .tsx files
			// see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
			new TsConfigWebpackPlugin(),
		],
	};

	return config;
};
