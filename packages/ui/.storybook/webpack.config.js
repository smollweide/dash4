const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
	// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	// Make whatever fine-grained changes you need
	config.plugins.push(
		...[
			// File loader configuration for .woff and .woff2 files
			// File loader configuration for .gif .jpg .jpeg .png and .svg files
			// https://github.com/namics/webpack-config-plugins/tree/master/packages/asset-config-webpack-plugin
			new AssetConfigWebpackPlugin(),
			// Cleans the dist folder before the build starts
			new CleanWebpackPlugin(),
			// SCSS Configuration for .css .module.css and .scss .module.scss files
			// see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
			new ScssConfigWebpackPlugin(),
			// Multi threading typescript loader configuration with caching for .ts and .tsx files
			// see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
			new TsConfigWebpackPlugin(),
		]
	);

	// Return the altered config
	return config;
};
