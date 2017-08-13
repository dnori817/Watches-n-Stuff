import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sql;

if (process.env.DATABASE_URL) {
	sql = new Sequelize(process.env.DATABASE_URL, {
		logging: false,
	});
}
else {
	sql = new Sequelize({
		database: process.env.DATABASE_NAME,
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		host: process.env.DATABASE_HOST || "localhost",
		port: process.env.DATABASE_PORT || 5432,
		dialect: "postgres",
		logging: false,
	});
}

const sequelize = sql;
export default sequelize;
