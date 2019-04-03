const webpack = require('webpack');
const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (_some, { mode }) => {
	const config = {
		entry: './src/index.tsx',
		output: {
			publicPath: '/',
		},
		// externals: {
		// 	react: 'React',
		// 	'react-dom': 'ReactDOM',
		// },
		optimization: {
			minimize: true,
		},
		plugins: [
			new AssetConfigWebpackPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				title: 'Dash4',
				template: 'src/index.html',
				meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
			}),
			new FaviconsWebpackPlugin('./src/favicon.png'),
			new ScssConfigWebpackPlugin(),
			new TsConfigWebpackPlugin(),
			new webpack.EnvironmentPlugin({
				NODE_ENV: mode,
				MOCK_ENV: process.env.MOCK_ENV,
				DEBUG: false,
			}),
		],
	};

	if (process.env.NODE_ENV === 'development') {
		config.optimization.minimize = false;
	}

	if (process.env.ANALYZE_ENV === 'bundle') {
		config.plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				generateStatsFile: true,
				openAnalyzer: true,
			})
		);
		config.optimization.minimize = true;
	}

	return config;
};
