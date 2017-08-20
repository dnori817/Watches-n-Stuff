import PRODUCTS from "json/products.json";

export function getProducts() {
	return {
		type: 'GET_PRODUCTS',
		products: PRODUCTS,
	};
}
