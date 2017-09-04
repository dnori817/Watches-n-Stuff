// import PRODUCTS from "json/products.json";
import API from "util/api";

export function getAllProducts() {
	return (dispatch) => {
		dispatch({ type: "LOADING_PRODUCTS" });
		API.get("/products").then((res) => {
			if (res.data) {
				dispatch({
					type: 'GET_ALL_PRODUCTS',
					products: res.data.products,
				});
			}
			else {
				dispatch({
					type: "PRODUCTS_LOAD_FAILED",
					error: res.error.message,
				});
			}
		}).catch((error) => {
			dispatch({
				type: "PRODUCTS_LOAD_FAILED",
				error: "Something Went Wrong!",
			});
		});
	};
}

export function getProduct(productId) {
	return (dispatch) => {
		dispatch({ type: "GET_PRODUCT" });
		API.get(`/products/${productId}`).then((res) => {
			if (res.data) {
				dispatch({
					type: "SELECTED_PRODUCT_LOADED",
					product: res.data.product,
					productId: res.data.product.id,
				});
			}
			else {
				dispatch({
					type: "SELECTED_PRODUCT_LOAD_FAIL",
					error: "Product not found!",
				});
			}
		})
			.catch((err) => {
				dispatch({
					type: "SELECTED_PRODUCT_LOAD_FAIL",
					error: "Something went wrong. Please refresh",
				});
			});
	};
}
// const products = PRODUCTS;
// {
// 	const selectedProduct = products.find((product) => product.id === productId);
// 	return dispatch({
// 		type: "GET_PRODUCT",
// 		product: selectedProduct,
// 	});
// };
