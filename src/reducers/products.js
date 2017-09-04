const INITIAL_STATE = {
	products: [],
	selectedProduct: null,
	error: null,
	isLoading: false,
};

function productsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case "LOADING_PRODUCTS":
		return {
			...state,
			isLoading: true,
			products: [],
		};
	case "GET_ALL_PRODUCTS":
		return {
			...state,
			isLoading: false,
			products: action.products,
		};
	case "GET_PRODUCT":
		return {
			...state,
			isLoading: true,
			selectedProduct: null,
		};
	case "SELECTED_PRODUCT_LOADED":
		return {
			...state,
			activeProduct: action.product,
			isLoading: false,
		};
	// Error Cases
	case "PRODUCTS_LOAD_FAILED":
		return {
			...state,
			isLOADING: false,
			error: action.error,
		};
	case "SELECTED_PRODUCT_LOAD_FAIL":
		return {
			...state,
			isLOADING: false,
			error: action.error,
		};
	default:
		return state;
	}
}

export default productsReducer;
