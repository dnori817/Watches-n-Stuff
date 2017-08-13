import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import chalk from "chalk";

import sequelize from "./util/sequelize";
import apiRoutes from "./routes/api";
import adminRoutes from "./routes/admin";
import reactRoutes from "./routes/react";

// Configure app
dotenv.config();
const app = express();
const secret = process.env.COOKIE_SECRET || "dev";

app.set("views", "./server/views");
app.set("view engine", "ejs");
app.use(cookieParser(secret));
app.use(
	session({
		secret,
		resave: false,
		saveUninitialized: false,
	})
);

// Custom routes
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

if (!process.env.SERVER_ONLY) {
	reactRoutes(app);
}

sequelize
	.sync()
	.then(() => {
		console.log(chalk.green("✅ Database has been synced"));
		const port = process.env.PORT || 7000;
		const server = app.listen(port, () => {
			console.log(chalk.green("✅ Server is online"));
			console.log(`Your server is available at ${chalk.blue(`http://localhost:${port}/`)}`);
		});
	})
	.catch((err) => {
		console.error(err);
		console.error(chalk.red.bold("Sequelize failed to sync! See error above."));
		process.exit(1);
	});
