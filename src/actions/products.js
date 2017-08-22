import PRODUCTS from "json/products.json";

export function getAllProducts() {
	return {
		type: 'GET_ALL_PRODUCTS',
		products: PRODUCTS,
	};
}

export function getProduct(productId) {
	const products = PRODUCTS;
	return (dispatch) => {
		const selectedProduct = products.find((product) => product.id === productId);
		return dispatch({
			type: "GET_PRODUCT",
			product: selectedProduct,
		});
	};
}
