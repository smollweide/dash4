const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');

module.exports = {
	entry: './src/client/index.tsx',
	plugins: [
		new AssetConfigWebpackPlugin(),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin(),
		new ScssConfigWebpackPlugin(),
		new TsConfigWebpackPlugin(),
	],
	optimization: {
		minimize: false,
	},
};
