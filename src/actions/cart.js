export function addToCart(product) {
	return (dispatch) => {
		if (product) {
			dispatch({
				type: 'ADD_TO_CART',
				product,
				productId: product.id,
			});
		}
		else {
			dispatch({
				type: "ADD_FAILED",
				error: "Cannot add to cart!",
			});
		}
	};
}
