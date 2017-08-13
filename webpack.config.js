const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const IS_DEV = process.env.NODE_ENV === "development";

// *** File rules *** //
const rules = [];

// Scripts
rules.push({
	test: /\.(js|jsx)?$/,
	use: {
		loader: "babel-loader",
		options: {
			compact: false,
		},
	},
});

// Styles
rules.push({
	test: /\.scss$/,
	use: ExtractTextPlugin.extract({
		fallback: "style-loader",
		use: [
			{ loader: "css-loader" },
			{ loader: "sass-loader", options: {
				sourceMap: true,
			} },
		],
	}),
});

// Images
rules.push({
	test: /\.(gif|png|jpe?g|svg)$/,
	use: [{
		loader: "file-loader",
		options: {
			name: "[name].[ext]?[hash:8]",
			useRelativePath: true,
		},
	}, {
		loader: "image-webpack-loader",
	}],
});

// Other assets (Fonts, icons, etc.)
rules.push({
	test: /\.(ico|eot|otf|ttf|woff|woff2)?$/,
	use: {
		loader: "file-loader",
		options: {
			name: "[name].[ext]?[hash:8]",
			useRelativePath: true,
		},
	},
});


// *** Plugins *** //
const plugins = [];

// Don't output anything on an error
plugins.push(new webpack.NoEmitOnErrorsPlugin());

// Remove moment's locale code to keep it small
plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

// Give us a good ol' index.html
plugins.push(new HtmlWebpackPlugin({
	template: "./src/index.ejs",
}));

// Extract CSS, falls back to style loader in IS_DEV
plugins.push(new ExtractTextPlugin({
	filename: `app.[hash:8].css`,
	allChunks: true,
	disable: IS_DEV,
}));

if (IS_DEV) {
	// Allow HMR
	plugins.push(new webpack.HotModuleReplacementPlugin());
	// Give modules proper names for debugging
	plugins.push(new webpack.NamedModulesPlugin());
}
else {
	// Signal to 3rd party modules that we're in production
	plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production'),
	}));

	// Signal to loaders that we're building for production
	plugins.push(new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false,
	}));

	// Uglify JS code
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		comments: false,
	}));
}



// *** Final Config *** //
module.exports = {
	entry: IS_DEV ? {
		main: [
			"./src/index.js",
			"webpack-hot-middleware/client",
		],
	} : "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.[hash:8].js",
	},
	resolve: {
		modules: ["node_modules", path.resolve(__dirname, "src")],
		extensions: [".js", ".jsx"],
	},
	module: {
		rules,
	},
	plugins,
	devtool: IS_DEV ? "eval-source-map" : "source-map",
	devServer: {
		port: process.env.PORT || 3000,
		hot: true,
		overlay: true,
		historyApiFallback: true,
	},
};
