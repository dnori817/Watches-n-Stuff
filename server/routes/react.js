import express from "express";
import webpack from "webpack";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import webpackDevMW from "webpack-dev-middleware";
import webpackHotMW from "webpack-hot-middleware";
import webpackConfig from "../../webpack.config";
const IS_DEV = process.env.NODE_ENV === "development";

export default function(app) {
	const htmlFilePath = path.resolve(__dirname, "../../dist", "index.html");
	let htmlHandler;

	if (IS_DEV) {
		const compiler = webpack(webpackConfig);
		const devMW = webpackDevMW(compiler, {
			publicPath: webpackConfig.output.publicPath,
			contentBase: path.resolve(__dirname, "../../src"),
			hot: true,
			stats: { colors: true },
		});

		app.use(devMW);
		app.use(webpackHotMW(compiler));
		const mfs = devMW.fileSystem;

		console.log(chalk.yellow("Starting webpack, page will hang until complete..."));
		htmlHandler = (req, res) => {
			devMW.waitUntilValid(() => {
		    const html = devMW.fileSystem.readFileSync(htmlFilePath);
		    res.end(html);
		  });
		};
	}
	else {
		htmlHandler = (req, res) => {
			try {
				const html = fs.readFileSync(htmlFilePath);
				res.end(html);
			} catch (err) {
				console.error(err);
				console.error(chalk.red.bold(
					"Could not find dist/index.html. Are you sure `npm run build` ran succesfully?"
				));
				res.end("Site is building...");
			}
		};

		app.use(express.static(path.resolve(htmlFilePath, "..")));
	}

	app.get("*", htmlHandler);
}
