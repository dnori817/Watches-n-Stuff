import Sequelize from "sequelize";
import sequelize from "../util/sequelize";

const OrderProducts = sequelize.define("orderProduct", {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
	},
});

export default OrderProducts;
