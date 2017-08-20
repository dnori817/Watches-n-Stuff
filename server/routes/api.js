import express from "express";
import BodyParser from "body-parser";

import Product, { SORTS } from "../models/product";
import Order, { FIELD_NAMES } from "../models/order";
import apiRes from "../util/apiRes";
import apiErr from "../util/apiErr";

const router = express.Router();
router.use(BodyParser.json());

// ----------------------------------------------------------------------------

router.get("/products", (req, res) => {
	const order = SORTS[req.query.sort && req.query.sort.toLowerCase()] || [["updatedAt", "DESC"]];
	const where = {};

	// Search name & description
	if (req.query.search) {
		where.$or = [{
			name: { $ilike: `%${req.query.search}%` },
		}, {
			description: { $ilike: `%${req.query.search}%` },
		}];
	}

	// Limit to category
	if (req.query.category) {
		where.category = req.query.category;
	}

	Product.findAll({
		attributes: ["id", "name", "price", "rating", "images"],
		order,
		where,
	}).then((products) => {
		apiRes(req, res, {
			products: products.map((p) => {
				return p.getReducedJSON();
			}),
		});
	}).catch((err) => {
		apiErr(req, res, {
			code: 500,
			type: "DB_ERROR",
			message: "Failed to retrieve products",
			error: err,
		});
	});
});

// ----------------------------------------------------------------------------

router.get("/products/:productId", (req, res) => {
	// Bad ID
	if (!parseInt(req.params.productId, 10)) {
		return apiErr(req, res, {
			code: 400,
			type: "BAD_PARAM",
			message: "Invalid product ID",
		});
	}

	Product.findById(req.params.productId).then((product) => {
		if (!product) {
			return apiErr(req, res, {
				code: 400,
				type: "BAD_PARAM",
				message: "Unable to find that product",
			});
		}

		apiRes(req, res, {
			product: {
				id: product.get("id"),
				name: product.get("name"),
				category: product.get("category"),
				price: product.get("price"),
				rating: product.get("rating"),
				images: product.get("images"),
				description: product.get("description"),
				specs: product.get("specs"),
			},
		});
	}).catch((err) => {
		apiErr(req, res, {
			code: 500,
			type: "DB_ERROR",
			message: "Failed to retrieve product",
			error: err,
		});
	});
});

// ----------------------------------------------------------------------------

router.post("/orders", (req, res) => {
	const errors = Order.getSubmitErrors(req.body);

	if (errors) {
		const fieldNames = Object.keys(errors).map((field) => FIELD_NAMES[field]);

		return apiErr(req, res, {
			code: 400,
			type: "BAD_PARAM",
			message: `Something was wrong with ${fieldNames.join(", ")}`,
			data: errors,
		});
	}

	// First create the order
	Order.create({
		name: req.body.name,
		address: req.body.address,
		address2: req.body.address2,
		city: req.body.city,
		state: req.body.state.toUpperCase(),
		zipcode: req.body.zipcode,
	}).then((order) => {
		// Then associate the products!
		order.setProducts(req.body.products).then(() => {
			apiRes(req, res, {
				orderId: order.id,
			});
		}).catch((err) => {
			apiErr(req, res, {
				code: 400,
				type: "BAD_PARAM",
				message: "Invalid product ID(s)",
				error: err,
			});
		});
	}).catch((err) => {
		apiErr(req, res, {
			code: 500,
			type: "DB_ERROR",
			message: "Unable to submit order",
			error: err,
		});
	});
});

// ----------------------------------------------------------------------------

router.get("/orders/:orderId", (req, res) => {
	// Bad ID
	if (!parseInt(req.params.orderId, 10)) {
		return apiErr(req, res, {
			code: 400,
			type: "BAD_PARAM",
			message: "Invalid order ID",
		});
	}

	Order.findById(req.params.orderId, {
		include: [Product],
	}).then((order) => {
		if (!order) {
			return apiErr(req, res, {
				code: 400,
				type: "BAD_PARAM",
				message: "Unable to find that order",
			});
		}

		return apiRes(req, res, {
			name: order.get("name"),
			address: order.get("address"),
			address2: order.get("address2"),
			city: order.get("city"),
			state: order.get("state"),
			products: order.products.map((product) => product.getReducedJSON()),
			time: order.get("createdAt"),
		});
	}).catch((err) => {
		apiErr(req, res, {
			code: 500,
			type: "DB_ERROR",
			message: "Unable to retrieve order",
			error: err,
		});
	});
});

export default router;
