import chalk from "chalk";

export default function(req, res, err) {
	if (req.errored) {
		return;
	}

	const error = {
		code: err.code,
		type: err.type,
		message: err.message,
		data: err.data,
	};

	if (!error.code) {
		console.warn(`API Error at path ${req.path} without error code, defaulting to 500`);
		error.code = 500;
	}

	if (!error.type) {
		console.warn(
			`API Error at ${req.method} ${req.path} without error type, using 'MiscError'`
		);
		error.type = "MiscError";
	}

	if (!error.message) {
		console.warn(
			`API Error at ${req.method} ${req.path} without error message, using default message`
		);
		error.message = "Something went wrong!";
	}

	if (err.error) {
		console.error(err.error);
		console.error(chalk.red.bold(`Encountered an error at ${req.method.toUpperCase()} ${req.path}`));
	}

	res.status(err.code).json({
		error,
	});

	req.errored = true;
}
