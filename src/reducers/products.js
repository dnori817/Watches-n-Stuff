const INITIAL_STATE = {
	products: [],
	activeProduct: null,
	isLoading: false,
	error: null,
};

function productsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
	case "PRODUCTS_LOADING":
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
	case "PRODUCTS_LOADING":
		return {
			...state,
			isLoading: true,
			products: [],
		};

	case "LOADING_SELECTED_PRODUCT":
		return {
			...state,
			isLoading: true,
			activeProduct: null,
		};

	case "SELECTED_PRODUCT_LOADED":
		return {
			...state,
			activeProduct: action.product,
			isLoading: false,
		};
		// Error Cases

	case "PRODUCTS_LOAD_FAIL":
		return {
			...state,
			isLoading: false,
			error: action.error,
		};
	case "SELECTED_PRODUCT_LOAD_FAIL":
		return {
			...state,
			isLoading: false,
			error: action.error,
		};
	default:
		return state;
	}
}

export default productsReducer;
