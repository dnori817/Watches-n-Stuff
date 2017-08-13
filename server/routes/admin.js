import express from "express";
import BodyParser from "body-parser";

import Product from "../models/product";
import Order from "../models/order";
import renderTemplate from "../util/renderTemplate";
import isAdminMW from "../middleware/isAdmin";
import reportError from "../util/reportError";

function bodyToProduct(body) {
	const vs = body.specValue.constructor === Array ? body.specValue : [body.specValue];
	const ls = body.specLabel.constructor === Array ? body.specLabel : [body.specLabel];

	const product = {
		...body,
		specs: vs.map((value, idx) => {
			return { value, label: ls[idx] };
		}),
	};

	return {
		...product,
		get: (key) => product[key],
	};
}

function renderProductForm(res, args = {}) {
	Product.getCategories().then((categories) => {
		renderTemplate(res, "Admin - Add Product", "product", {
			...args,
			categories,
		});
	});
}

const router = express.Router();
router.use(BodyParser.urlencoded({ extended: true }));

// ------------------------------------------------------------------

router.get("/", isAdminMW, (req, res) => {
	let message = "";
	let messageType = "";

	if (req.query.created) {
		message = "Product succesfully created!";
		messageType = "is-success";
	} else if (req.query.saved) {
		message = "Product succesfully saved!";
		messageType = "is-success";
	} else if (req.query.deleted) {
		message = "Product succesfully deleted!";
		messageType = "is-danger";
	} else if (req.query.notFound) {
		message = "Invalid product ID";
		messageType = "is-info";
	} else if (req.query.imported) {
		message = `Succesfully imported ${req.query.imported} products!`;
		messageType = "is-success";
	}

	Product.findAll({ order: [['updatedAt', 'DESC']] }).then((products) => {
		renderTemplate(res, "Admin - Products", "products", {
			products,
			message,
			messageType,
		});
	}).catch((err) => {
		reportError(err);
		renderTemplate(res, "Admin - Products", "products", {
			products: [],
			message: "Database error, no products will show",
			messageType: "is-danger",
		});
	});
});

// ------------------------------------------------------------------

router.get("/orders", isAdminMW, (req, res) => {
	Order.findAll({ include: [Product] }).then((orders) => {
		renderTemplate(res, "Admin - Orders", "orders", {
			orders,
		});
	}).catch((err) => {
		reportError(err);
		renderTemplate(res, "Admin - Orders", "orders", {
			products: [],
			message: "Database error, no orders will show",
			messageType: "is-danger",
		});
	});
});

// ------------------------------------------------------------------

router.get("/add", isAdminMW, (req, res) => {
	renderProductForm(res, {
		product: { get: () => undefined },
	});
});

router.post("/add", isAdminMW, (req, res) => {
	try {
		Product.create(Product.parseForm(req.body)).then(() => {
			res.redirect("/admin?created=1");
		});
	} catch (err) {
		reportError(err, req);
		renderProductForm(res, {
			product: bodyToProduct(req.body),
			error: err.message,
		});
	}
});

// ------------------------------------------------------------------

router.get("/edit/:productId", isAdminMW, (req, res) => {
	Product.findById(req.params.productId).then((product) => {
		if (!product) {
			return res.redirect("/admin?notFound=1");
		}

		renderProductForm(res,  {
			product,
		});
	});
});

router.post("/edit/:productId", isAdminMW, (req, res) => {
	Product.findById(req.params.productId).then((product) => {
		if (!product) {
			return res.redirect("/admin?notFound=1");
		}

		try {
			if (req.body.delete) {
				product.destroy().then(() => {
					res.redirect("/admin?deleted=1");
				});
			} else {
				product.update(Product.parseForm(req.body)).then(() => {
					res.redirect("/admin?saved=1");
				});
			}
		} catch (err) {
			reportError(err, req);
			renderProductForm(res, {
				product: bodyToProduct(req.body),
				error: err.message,
			});
		}
	});
});

// ------------------------------------------------------------------

router.get("/import", isAdminMW, (req, res) => {
	renderTemplate(res, "Admin - Import", "import", {
		json: "",
	});
});

router.post("/import", isAdminMW, (req, res) => {
	// First make sure the json is all good
	const products = [];

	try {
		const productJson = JSON.parse(req.body.json);

		if (productJson.constructor !== Array) {
			throw new Error("Products must be an array");
		}

		// Add each one, parseForm throws if there's bad data
		productJson.forEach((product) => {
			products.push(Product.parseForm(product));
		});
	} catch (err) {
		reportError(err, req);
		renderTemplate(res, "Admin - Import", "import", {
			json: req.body.json,
			error: `Invalid JSON: ${err.message}`,
		});
	}

	// If all is good, start the party
	let handleDelete = Promise.resolve();

	if (req.body.deleteAll) {
		handleDelete = Product.destroy({ where: {}, truncate: true });
	}

	handleDelete
		.then(() => {
			try {
				return Product.bulkCreate(products, {
					individualHooks: true,
				});
			}
			catch (err) {
				reportError(err, req);
				renderTemplate(res, "Admin - Import", "import", {
					json: req.body.json,
					error: `Database Error: ${err.message}`,
				});
			}
		})
		.then((dbProducts) => {
			res.redirect(`/admin?imported=${dbProducts.length}`);
		})
		.catch((err) => {
			reportError(err, req);
			renderTemplate(res, "Admin - Import", "import", {
				json: req.body.json,
				error: `Database Error: ${err.message}`,
			});
		});
});

// ------------------------------------------------------------------

router.get("/login", (req, res) => {
	renderTemplate(res, "Admin - Login", "login", {
		to: req.query.to,
	});
});

router.post("/login", (req, res) => {
	if (req.body.password === process.env.ADMIN_PASSWORD) {
		req.session.isAdmin = true;
		res.redirect(req.body.to || "/admin");
	} else {
		renderTemplate(res, "Admin - Login", "login", {
			error: "Bad password",
			to: req.body.to,
		});
	}
});

export default router;
