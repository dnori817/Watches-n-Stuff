import Sequelize from "sequelize";
import sequelize from "../util/sequelize";
import Product from "./product";
import OrderProducts from "./orderProducts";

export const FIELD_NAMES = {
	name: "Name",
	address: "Address",
	address2: "Secondary address",
	city: "City",
	state: "State",
	orders: "Products",
	zipcode: "Zipcode",
};

const Order = sequelize.define("order", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING(256),
		notNull: true,
	},
	address: {
		type: Sequelize.STRING(256),
		notNull: true,
	},
	address2: {
		type: Sequelize.STRING(256),
	},
	city: {
		type: Sequelize.STRING(256),
		notNull: true,
	},
	state: {
		type: Sequelize.STRING(2),
		notNull: true,
		get() {
			return this.getDataValue("state").toUpperCase();
		},
	},
	zipcode: {
		type: Sequelize.STRING(5),
		notNull: true,
	},
});

// Associations
Product.belongsToMany(Order, { through: OrderProducts });
Order.belongsToMany(Product, { through: OrderProducts });

// Model extensions
Order.getSubmitErrors = function(order) {
	const required = ["products", "name", "address", "city", "state", "zipcode"];
	const len256 = ["name", "address", "address2", "city"];
	const errors = {};

	// In ascending order of importance...
	if (order.state && order.state.length > 2) {
		errors.state = "State cannot be longer than 2 characters";
	}

	if (order.zipcode && order.zipcode.match(/^[0-9]+$/) === null) {
		errors.zipcode = "Zipcode can only contain numbers";
	}

	if (order.zipcode && order.zipcode.length !== 5) {
		errors.zipcode = "Zipcode must be 5 numbers long";
	}

	len256.forEach((field) => {
		if (order[field] && order[field].length > 256) {
			errors[field] = `${FIELD_NAMES[field]} cannot be longer than 250 characters`;
		}
	});

	if (order.products && order.products.constructor !== Array) {
		errors.products = "Products must be an array of IDs";
	}

	required.forEach((field) => {
		if (!order[field]) {
			errors[field] = `${FIELD_NAMES[field]} is required`;
		}
	});

	return Object.keys(errors).length ? errors : null;
};

export default Order;
