import chalk from "chalk";

export default function reportError(err, req) {
	const prefix = req ? `Error at ${req.originalUrl}:` : `Error during request:`;
	console.error(err);
	console.error(chalk.red(`${prefix}, see above for more info`));
}
