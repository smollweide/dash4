const path = require('path');
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (libraryName) => {
	const config = {
		entry: './src/index.tsx',
		optimization: {
			minimize: true,
		},
		externals: {
			react: 'umd react',
			'react-dom': 'umd react-dom',
			bootstrap: 'umd bootstrap',
			'core-js': 'umd core-js',
			'react-bootstrap': 'umd react-bootstrap',
			'react-container-query': 'umd react-container-query',
			tslib: 'umd tslib',
			'@emotion/core': 'EmotionCore',
		},
		// resolve: {
		// 	alias: {
		// 		// '@dash4/ui': path.resolve(__dirname, 'alias/dash4-ui.js'),
		// 		// '@dash4/log/build/browser': path.resolve(__dirname, 'alias/dash4-log.js'),
		// 		// '@dash4/log': path.resolve(__dirname, 'alias/dash4-log.js'),
		// 		'@emotion/core': path.resolve(__dirname, 'alias/emotion-core.js'),
		// 	},
		// },
		output: {
			path: path.join(process.cwd(), '/lib'),
			filename: `${libraryName}.js`,
			library: libraryName,
			libraryTarget: 'umd',
			umdNamedDefine: true,
			globalObject: "typeof self !== 'undefined' ? self : this",
		},
		plugins: [
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
		],
	};

	if (process.env.ANALYZE_ENV === 'bundle') {
		config.plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				generateStatsFile: true,
				openAnalyzer: true,
			})
		);
	}

	return config;
};
