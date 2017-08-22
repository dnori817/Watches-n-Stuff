const INITIAL_STATE = {
	products: [],
	selectedProduct: null,
};

function productsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case "GET_ALL_PRODUCTS":
		return {
			...state,
			products: action.products,
		};
	case "GET_PRODUCT":
		return {
			...state,
			selectedProduct: action.product,
		};
	default:
		return state;
	}
}

export default productsReducer;
