import API from "util/api";


export function getAllProducts() {
	return (dispatch) => {
		dispatch({ type: "PRODUCTS_LOADING" });
		API.get("/products").then((res) => {
			if (res.data) {
				dispatch({
					type: "GET_ALL_PRODUCTS",
					products: res.data.products,
				});
			}
			else {
				dispatch({
					type: "PRODUCTS_LOAD_FAIL",
					error: res.error,
				});
			}
		}).catch((error) => {
			dispatch({
				type: "PRODUCTS_LOAD_FAIL",
				error: "Something went wrong, please try again",
			});
		});
	};
}

export function getProduct(productId) {
	return (dispatch) => {
		dispatch({ type: "LOADING_SELECTED_PRODUCT" });
		API.get(`/products/${productId}`).then((res) => {
			if (res.data) {
				dispatch({
					type: "SELECTED_PRODUCT_LOADED",
				 	product: res.data.product,
				});
			}
			else {
				dispatch({
					type: "SELECTED_PRODUCT_LOAD_FAIL",
					error: "Product Not Found!",
				});
			}
		})

			.catch((err) => {
				dispatch({
					type: "SELECTED_PRODUCT_LOAD_FAIL",
					error: "Something went wrong, please try again",
				});
			});
	};
}


// export function getProduct(productId) {
// 	const products = PRODUCTS;
// 	return (dispatch) => {
// 		const selectedProduct = products.find((product) => product.id === productId);
// 		return dispatch({
// 			type: "GET_PRODUCT",
// 			product: selectedProduct,
// 		});
// 	};
// }
