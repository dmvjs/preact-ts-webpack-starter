const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, './src/index.tsx'),
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.css'],
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{test: /\.tsx?$/, loader: 'ts-loader'},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[name]__[local]___[hash:base64]',
							},
						}
					}
				],
				include: /\.module\.css$/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				],
				exclude: /\.module\.css$/
			},
			{
				test: /\.(svg|png|jpe?g|gif|woff2)$/i,
				type: 'asset/resource',
			}
		]
	},
	plugins: [new HtmlWebpackPlugin({
		inject: 'body',
		scriptLoading: 'blocking',
		template: 'src/index.html'
	}),
		// new BundleAnalyzerPlugin()
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
	},
}
